import { formatDuration } from '../FormatDuration/FormatDuration.ts'
import { printTestError } from '../PrintTestError/PrintTestError.ts'
import * as Rpc from '../RendererWorker/RendererWorker.ts'
import { stringifyError } from '../StringifyError/StringifyError.ts'
import * as TestType from '../TestType/TestType.ts'
import * as Timestamp from '../Timestamp/Timestamp.ts'
import { VError } from '../VError/VError.ts'

export const executeTest = async (name: string, fn: any, globals = {}): Promise<void> => {
  let _error
  let _start
  let _end
  let _duration
  let _formattedDuration
  try {
    _start = Timestamp.now()
    await fn(globals)
    _end = Timestamp.now()
    _duration = _end - _start
    _formattedDuration = formatDuration(_duration)
    console.info(`PASS ${name} in ${_formattedDuration}`)
  } catch (error) {
    if (
      error &&
      // @ts-ignore
      error.message.startsWith('Failed to load command TestFrameWork.')
    ) {
      console.error(error)
      return
    }
    _error = stringifyError(error)
    if (!(error instanceof VError)) {
      error = new VError(error, `Test failed: ${name}`)
    }
    await printTestError(error)
  }
  let state
  let background
  let text
  if (_error) {
    state = TestType.Fail
    background = 'red'
    text = `test failed: ${_error}`
  } else {
    background = 'green'
    text = `test passed in ${_formattedDuration}`
    state = TestType.Pass
  }
  await Rpc.invoke('TestFrameWork.showOverlay', state, background, text)
}
