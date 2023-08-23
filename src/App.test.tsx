import { describe, test, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { logScreen, renderWithRouter } from './utils/__test__/testUtils'
import path from './constants/path'

expect.extend(matchers)

describe('App', () => {
  test('App render và chuyển trang', async () => {
    const { user } = renderWithRouter()

    //* waitFor sẽ run callback 1 vài lần
    //* cho đến khi hết timeout hoặc expect pass
    //* số lần run phụ thuộc vào timeout và interval
    //* mặc định: timeout = 1000ms và interval = 50ms

    //? verify vào đúng trang chủ

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee clone')
    })

    //? verify chuyển sang trang login
    await user.click(screen.getByText(/Đăng nhập/i)) //* 'Đăng nhập' or /Đăng nhập/i
    await waitFor(() => {
      expect(screen.queryByText(/Bạn chưa có tài khoản?/i)).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee clone')
    })
  })
  test('Về trang not found', async () => {
    const badRoute = '/some/bad/route'

    renderWithRouter({ route: badRoute })
    await waitFor(() => {
      expect(screen.queryByText(/page not found/i)).toBeInTheDocument()
    })
  })
  test('Render trang register', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })

    await logScreen()
  })
})
