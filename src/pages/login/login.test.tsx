import matchers from '@testing-library/jest-dom/matchers'
import { screen, waitFor } from '@testing-library/react'
import { logScreen, renderWithRouter } from 'src/utils/__test__/testUtils'
import { describe, expect, it } from 'vitest'
expect.extend(matchers)

describe('login', () => {
  it('Hiện thị lỗi require khi k nhập gì', async () => {
    const { user } = renderWithRouter({ route: '/login' })
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee clone')
      expect(screen.queryByPlaceholderText(/Email/i)).toBeInTheDocument()
    })
    const submitBtn = document.querySelector('button[type="submit"]') as Element
    user.click(submitBtn)
    expect(await screen.findByText(/Email là bắt buộc/i)).toBeTruthy()
    expect(await screen.findByText(/Password là bắt buộc/i)).toBeTruthy()
    await logScreen()
  })
})
