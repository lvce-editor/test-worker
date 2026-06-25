import { tryAutoFixWith } from '../TryAutoFixWith/TryAutoFixWith.ts'

export const tryAutoFix = async (): Promise<void> => {
  await tryAutoFixWith()
}
