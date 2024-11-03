import process from 'node:process'

import { describe, expect, it, vi } from 'vitest'

import { onCancel } from '../src/prompt'

describe('cancel', () => {
  it('should log a message and exit', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockReturnValue(undefined as never)
    const logSpy = vi.spyOn(console, 'log')

    onCancel()

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Operation cancelled'))
    expect(exitSpy).toHaveBeenCalledWith(1)
  })
})
