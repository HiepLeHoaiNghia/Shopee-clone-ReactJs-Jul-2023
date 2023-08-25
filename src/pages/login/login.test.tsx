import { fireEvent, screen, waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { beforeAll, describe, expect, test } from 'vitest'

describe('login', () => {
  let submitBtn: HTMLButtonElement
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee clone')
      expect(screen.queryByPlaceholderText(/Email/i)).toBeInTheDocument()
    })
    submitBtn = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
  })
  test('Hiện thị lỗi require khi k nhập gì', async () => {
    fireEvent.submit(submitBtn)
    await waitFor(() => {
      expect(screen.queryByText(/Email là bắt buộc/i)).toBeTruthy()
      expect(screen.queryByText(/Password là bắt buộc/i)).toBeTruthy()
    })
    // await logScreen()
  })
  test('Hiện thị lỗi khi nhập value input sai', async () => {
    //! Email phải k đúng định dạng theo regex ở rules thì mới xuất hiện lỗi
    //! nếu email là có thêm ký tự sau @ sẽ k có lỗi xảy ra (do regex của rules)
    fireEvent.change(emailInput, {
      target: { value: 'test@' }
    })
    fireEvent.change(passwordInput, {
      target: { value: '123' }
    })
    fireEvent.submit(submitBtn)
    await logScreen()
    await waitFor(() => {
      expect(screen.queryByText(/Email không đúng định dạng/i)).toBeTruthy()
      expect(screen.queryByText(/Độ dài từ 6 - 160 ký tự/i)).toBeTruthy()
    })
  })
  test('Không nên hiển thị lỗi khi nhập lại value đúng', async () => {
    fireEvent.change(emailInput, {
      target: { value: 'test@gmail.com' }
    })
    fireEvent.change(passwordInput, {
      target: { value: '123456' }
    })
    await logScreen()
    //* Những trường hợp chứng minh rằng tìm k ra text hay là element
    //* Thì nên dùng query hơn là find hay get
    //? query sẽ trả về null nếu k tìm thấy
    //? find sẽ trả về error nếu k tìm thấy
    await waitFor(() => {
      expect(screen.queryByText(/Email không đúng định dạng/i)).toBeNull()
      expect(screen.queryByText(/Độ dài từ 6 - 160 ký tự/i)).toBeFalsy()
    })
    fireEvent.submit(submitBtn)
    await logScreen()
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee clone')
    })
  })
})
