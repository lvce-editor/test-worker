import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SecretsView from '../src/parts/TestFrameWorkComponentSecretsView/TestFrameWorkComponentSecretsView.ts'

const getSelector = (locator: any): string => locator._selector

test('show and setData', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {},
    'SecretsView.setData'() {},
  })
  const data = [{ extensionId: 'sample.extension', key: 'token', value: 'secret' }]
  await SecretsView.show()
  await SecretsView.setData(data)
  expect(mockRpc.invocations).toEqual([
    ['Main.openUri', 'secrets://'],
    ['SecretsView.setData', data],
  ])
})

test('locators', () => {
  expect(getSelector(SecretsView.root())).toBe('.SecretsView')
  expect(getSelector(SecretsView.rows())).toBe('.SecretsViewRow')
  expect(getSelector(SecretsView.extensionId(2))).toBe('.SecretsViewRow .SecretsViewExtensionId')
  expect(getSelector(SecretsView.key(2))).toBe('.SecretsViewRow .SecretsViewKey')
  expect(getSelector(SecretsView.value(2))).toBe('.SecretsViewRow .SecretsViewValue')
})

test('actions click their row buttons', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {},
  })

  await SecretsView.edit(1)
  await SecretsView.save(2)
  await SecretsView.cancel(3)

  expect(mockRpc.invocations).toHaveLength(3)
  expect(mockRpc.invocations.map((invocation) => invocation[0])).toEqual([
    'TestFrameWork.performAction',
    'TestFrameWork.performAction',
    'TestFrameWork.performAction',
  ])
})
