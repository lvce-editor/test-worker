import { execa } from 'execa'
import { root } from './root.ts'

const main = async (): Promise<void> => {
  execa(`npm`, ['run', 'build:watch'], {
    cwd: root,
    stdio: 'inherit',
  })

  execa('node', ['packages/server/node_modules/@lvce-editor/server/bin/server.js', '--test-path=packages/e2e'], {
    cwd: root,
    stdio: 'inherit',
  })
}

await main()
