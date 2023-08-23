import { render, screen, waitFor, type waitForOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { expect } from 'vitest'

const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(true), time))

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      ...options,
      timeout
    }
  )
  screen.debug(body, 999999999)
}

export const renderWithRouter = ({ route = '/' } = {}) => {
  //* đặt { route = '/' } = {} để ngay cả khi gọi hàm mà không truyền tham số thì route mặc định là '/', k bị undefined
  const user = userEvent.setup()
  window.history.pushState({}, 'Test page', route)
  return {
    user,
    ...render(<App />, { wrapper: BrowserRouter })
  }
}
