import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Ports from '../src/parts/TestFrameWorkComponentPorts/TestFrameWorkComponentPorts.ts'

test('addPort opens the editor, enters the value, and submits in order', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.showPanel'() {},
    'Ports.handleAddPortInput'() {},
    'Ports.setPorts'() {},
    'Ports.startAddPort'() {},
    'Ports.submitAddPort'() {},
  })

  await Ports.open()
  await Ports.setPorts([])
  await Ports.addPort('5173')

  expect(mockRpc.invocations).toEqual([
    ['Layout.showPanel', 'Ports'],
    ['Ports.setPorts', []],
    ['Ports.startAddPort'],
    ['Ports.handleAddPortInput', '5173'],
    ['Ports.submitAddPort'],
  ])
})

test('port actions preserve their arguments', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Ports.cancelAddPort'() {},
    'Ports.focusNext'() {},
    'Ports.focusPrevious'() {},
    'Ports.removePort'() {},
    'Ports.setDeltaY'() {},
    'Ports.setPorts'() {},
    'Ports.togglePortActive'() {},
  })
  const ports = [{ active: true, forwardedAddress: 'localhost:5173', origin: 'User', port: 5173, runningProcess: 'vite' }]

  await Ports.setPorts(ports)
  await Ports.cancelAddPort()
  await Ports.focusNext()
  await Ports.focusPrevious()
  await Ports.togglePortActive(5173)
  await Ports.removePort(5173)
  await Ports.setDeltaY(12_000)

  expect(mockRpc.invocations).toEqual([
    ['Ports.setPorts', ports],
    ['Ports.cancelAddPort'],
    ['Ports.focusNext'],
    ['Ports.focusPrevious'],
    ['Ports.togglePortActive', 5173],
    ['Ports.removePort', 5173],
    ['Ports.setDeltaY', 12_000],
  ])
})

test('port cells are indexed within body rows, excluding the header', () => {
  expect(Ports.portCell(2)).toMatchObject({
    _parsed: [
      { selector: '.Ports', type: 'css' },
      { selector: '.PortsTableBody .PortsTableRow', type: 'css' },
      { index: 2, type: 'nth' },
      { selector: '.PortsPortColumn', type: 'css' },
    ],
  })
  for (const locator of [
    Ports.addressLink(2),
    Ports.processCell(2),
    Ports.originCell(2),
    Ports.statusButton(2),
    Ports.activeIcon(2),
    Ports.inactiveIcon(2),
  ]) {
    expect(locator).toMatchObject({
      _parsed: expect.arrayContaining([
        { selector: '.PortsTableBody .PortsTableRow', type: 'css' },
        { index: 2, type: 'nth' },
      ]),
    })
  }
})

test('view and add editor locators stay scoped to Ports', () => {
  for (const locator of [Ports.headers(), Ports.focusedPort(), Ports.emptyMessage(), Ports.addInput(), Ports.addButton(), Ports.addError()]) {
    expect(locator).toMatchObject({
      _parsed: expect.arrayContaining([{ selector: '.Ports', type: 'css' }]),
    })
  }
})
