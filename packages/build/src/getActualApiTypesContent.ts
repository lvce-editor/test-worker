import { formatApiTypes } from './formatApiTypes.ts'
import { removeInternalApiTypes } from './removeInternalApiTypes.ts'

// we want slightly different types,
// specifically instead of exporting every interface
// we only export a test api interface for tests
export const getActualApiTypesContent = (contentApi: string, contentExpect: string, contentLocator: string): string => {
  const getBraceDelta = (value: string): number => {
    let delta = 0
    for (const character of value) {
      if (character === '{') {
        delta++
      } else if (character === '}') {
        delta--
      }
    }
    return delta
  }

  const newLines: string[] = []
  let state: 'default' | 'export' | 'after-export' | 'internal' | 'skip' = 'default'

  // Process expect content to remove @internal properties
  const processedExpectContent = removeInternalApiTypes(contentExpect)
  const expectLines = processedExpectContent.split('\n')

  for (const line of expectLines) {
    if (line.startsWith('// Generated')) {
      continue
    }
    if (line.startsWith('export {}')) {
      continue
    }
    newLines.push(line)
  }

  const locatorLines = contentLocator.split('\n')
  state = 'skip'
  const publicLocatorInterfaces = new Set(['LocatorClickOptions', 'ILocatorExternal'])
  for (const line of locatorLines) {
    if (line.startsWith('// Generated')) {
      continue
    }
    if (line.startsWith('export {}')) {
      continue
    }
    const interfaceMatch = line.match(/^export interface (\w+)/)
    if (interfaceMatch) {
      state = publicLocatorInterfaces.has(interfaceMatch[1]) ? 'default' : 'skip'
    }
    if (state === 'default' && line.startsWith('export interface')) {
      newLines.push(line.replace('export interface', 'interface'))
      continue
    }
    if (state === 'default') {
      newLines.push(line)
      if (line === '}') {
        state = 'skip'
      }
      continue
    }
  }

  // Parse the API content to extract namespace information and convert to interfaces
  const contentLines = contentApi.split('\n')
  const namespaces: Record<string, string[]> = {}
  let currentNamespace: string | null = null
  let inNamespace = false
  let inExport = false
  const functionSignatures: Record<string, string> = {}

  // First pass: collect function signatures, namespace information, and exported interfaces
  let currentFunction: string | null = null
  let currentSignature: string[] = []
  const exportedInterfaces: string[] = []
  const exportedTypeAliases: string[] = []
  let inExportedInterface = false
  let currentInterface: string[] = []
  let interfaceBraceDepth = 0
  let inExportedTypeAlias = false
  let currentTypeAlias: string[] = []
  let typeAliasBraceDepth = 0

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i]
    if (line.startsWith('// Generated')) {
      continue
    }

    if (inExportedInterface) {
      currentInterface.push(line)
      interfaceBraceDepth += getBraceDelta(line)
      if (interfaceBraceDepth === 0) {
        exportedInterfaces.push(currentInterface.join('\n'))
        currentInterface = []
        inExportedInterface = false
      }
      continue
    }

    if (inExportedTypeAlias) {
      currentTypeAlias.push(line)
      typeAliasBraceDepth += getBraceDelta(line)
      if (typeAliasBraceDepth === 0 && line.trim().endsWith(';')) {
        exportedTypeAliases.push(currentTypeAlias.join('\n'))
        currentTypeAlias = []
        inExportedTypeAlias = false
      }
      continue
    }

    // Collect exported interfaces
    if (line.startsWith('export interface ')) {
      inExportedInterface = true
      currentInterface.push(line)
      interfaceBraceDepth = getBraceDelta(line)
      if (interfaceBraceDepth === 0) {
        exportedInterfaces.push(currentInterface.join('\n'))
        currentInterface = []
        inExportedInterface = false
      }
      continue
    }

    // Collect exported type aliases
    if (line.startsWith('export type ')) {
      typeAliasBraceDepth = getBraceDelta(line)
      if (typeAliasBraceDepth === 0 && line.trim().endsWith(';')) {
        exportedTypeAliases.push(line)
      } else {
        inExportedTypeAlias = true
        currentTypeAlias = [line]
        typeAliasBraceDepth = getBraceDelta(line)
      }
      continue
    }

    // Collect function signatures (handle multi-line)
    if (line.startsWith('declare const ')) {
      // Finish previous function if any
      if (currentFunction && currentSignature.length > 0) {
        functionSignatures[currentFunction] = currentSignature.join(' ').trim()
        currentFunction = null
        currentSignature = []
      }

      const match = line.match(/declare const ([\w$]+):\s*(.+)/)
      if (match) {
        const [, funcName, signature] = match
        currentFunction = funcName
        currentSignature = [signature]
      }
    } else if (currentFunction && (line.startsWith('\t') || line.startsWith('  ')) && !line.startsWith('declare ') && !inExportedInterface) {
      // Continue collecting multi-line signature (but not if it's a new declaration or in interface)
      currentSignature.push(line.trim())
    } else if (currentFunction && line.includes(';') && !inExportedInterface) {
      // End of function signature
      if (currentSignature.length > 0) {
        functionSignatures[currentFunction] = currentSignature.join(' ').trim()
        currentFunction = null
        currentSignature = []
      }
    } else if (currentFunction && line.startsWith('declare ') && !inExportedInterface) {
      // New declaration while collecting signature - finish current one
      if (currentSignature.length > 0) {
        functionSignatures[currentFunction] = currentSignature.join(' ').trim()
        currentFunction = null
        currentSignature = []
      }
    }

    // Track namespace declarations
    if (line.startsWith('declare namespace ')) {
      const match = line.match(/declare namespace (\w+)/)
      if (match) {
        currentNamespace = match[1]
        namespaces[currentNamespace] = []
        inNamespace = true
        continue
      }
    }

    if (inNamespace && (line.startsWith('\texport {') || line.startsWith('	export {'))) {
      inExport = true
      // Parse the export line immediately
      const exportLine = line.replace(/^\s*export\s*\{\s*/, '').replace(/\s*\};\s*$/, '')
      if (exportLine) {
        const exports = exportLine.split(',').map((exp) => exp.trim())
        if (currentNamespace) {
          namespaces[currentNamespace].push(...exports)
        }
      }
      continue
    }

    if (inNamespace && inExport && line.startsWith('}')) {
      inNamespace = false
      inExport = false
      currentNamespace = null
      continue
    }

    // Skip other lines when in namespace
    if (inNamespace) {
      continue
    }
  }

  // Add exported interfaces
  for (const exportedInterface of exportedInterfaces) {
    newLines.push(exportedInterface)
    newLines.push('')
  }

  // Add exported type aliases
  for (const exportedTypeAlias of exportedTypeAliases) {
    newLines.push(exportedTypeAlias)
    newLines.push('')
  }

  // Generate interfaces for each namespace
  for (const [namespaceName, exports] of Object.entries(namespaces)) {
    newLines.push(`interface ${namespaceName} {`)
    for (const exportName of exports) {
      // Handle aliased exports (e.g., "close$1 as close")
      const [actualName, alias] = exportName.includes(' as ') ? exportName.split(' as ').map((s) => s.trim()) : [exportName, exportName]

      // Try to find the signature, first with the exact name, then with the base name
      let signature = functionSignatures[actualName]
      if (!signature) {
        // Try to find a function with the same base name
        const baseName = actualName.replace(/\$.*$/, '')
        const matchingKey = Object.keys(functionSignatures).find((key) => key === baseName)
        if (matchingKey) {
          signature = functionSignatures[matchingKey]
        }
      }

      if (signature) {
        // Special handling for FileSystem.loadFixture to remove platform parameter
        if (namespaceName === 'FileSystem' && alias === 'loadFixture') {
          // Transform the signature to remove the first parameter (platform: number)
          const modifiedSignature = signature.replace(/\(platform:\s*number,\s*/, '(')
          newLines.push(`  readonly ${alias}: ${modifiedSignature}`)
        } else {
          newLines.push(`  readonly ${alias}: ${signature}`)
        }
      }
    }
    newLines.push('}')
    newLines.push('')
  }

  newLines.push('interface LocatorOptions {')
  newLines.push('  readonly hasText?: string')
  newLines.push('  readonly nth?: number')
  newLines.push('}')
  newLines.push('')

  // Generate TestApi interface
  newLines.push('export interface TestApi {')
  for (const namespaceName of Object.keys(namespaces)) {
    newLines.push(`  readonly ${namespaceName}: ${namespaceName}`)
  }
  newLines.push('  readonly expect: (locator: ILocatorExternal) => LocatorExpect')
  newLines.push('  readonly Locator: (selector: string, options?: LocatorOptions) => ILocatorExternal')
  newLines.push('}')
  newLines.push('')
  newLines.push('export interface Test {')
  newLines.push('  (api: TestApi): Promise<void>')
  newLines.push('}')
  newLines.push('')
  newLines.push("export type BrowserName = 'chromium' | 'firefox' | 'unknown' | 'webkit'")
  newLines.push('export type Skip = boolean | number | readonly BrowserName[]')
  newLines.push('')

  const formatted = formatApiTypes(newLines)

  return formatted.join('\n')
}
