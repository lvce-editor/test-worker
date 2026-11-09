# Test Worker

> A Web Worker for the e2e functionality in Lvce Editor.

## Contributing

```sh
git clone git@github.com:lvce-editor/test-worker.git &&
cd test-worker &&
npm ci &&
npm test
```

The development server uses `--link=.tmp/dist` to load the locally built test worker without modifying installed packages. `npm run dev` builds the package before starting watch mode.
