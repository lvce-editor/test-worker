# Test Worker

> A Web Worker for the e2e functionality in Lvce Editor.

## Devcontainer page object

Tests with the Dev Containers extension can use `Devcontainer.start()` and `Devcontainer.stop()` to select the current workspace commands through Quick Pick and wait for their lifecycle state. Both accept an optional `{ timeout }` in milliseconds (default: 120000). Startup also verifies that a container id was returned; error states include the CLI diagnostics.

```ts
export const test: Test = async ({ Devcontainer }) => {
  try {
    await Devcontainer.start()
    await Devcontainer.shouldHaveExecOutput('node', ['--version'], /^v24\./)
    const contents = await Devcontainer.exec('cat', ['README.md'])
    await Devcontainer.stop()
    await Devcontainer.shouldFailToExec('cat', ['README.md'], 'DEVCONTAINER_NOT_RUNNING')
  } finally {
    await Devcontainer.remove()
  }
}
```

`exec` returns stdout and throws on unsuccessful execution. `shouldHaveExecOutput` accepts exact text or a regular expression. `getState` returns the current state, and `remove` cleans up a tracked container, including a stopped container, while tolerating an absent container.

## Contributing

```sh
git clone git@github.com:lvce-editor/test-worker.git &&
cd test-worker &&
npm ci &&
npm test
```
