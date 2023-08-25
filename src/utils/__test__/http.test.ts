import { beforeEach, describe, expect, it } from 'vitest'
import { Http } from '../http'
import { AxiosInstance, HttpStatusCode } from 'axios'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'
import { access_token_1s, refresh_token_1000d } from 'src/msw/auth.msw'

describe('http axios', () => {
  //? Tạo một instance mới cho mỗi test
  let http = new Http().instance as AxiosInstance
  beforeEach(() => {
    //? Trước mỗi lần test phải xoá local storage rồi mới tạo một instance mới theo thứ tự
    localStorage.clear()
    http = new Http().instance as AxiosInstance
  })

  it('call API', async () => {
    //* Không nên đụng đến thư mục apis
    //* test riêng http thì chỉ nên dùng http
    //* tránh trường hợp thư mục apis bị thay đổi
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok as number)
  })
  it('auth request', async () => {
    //* Nên cón account test với dự án thực tế và sever test
    await http.post('login', { email: 'AAuser2@gmail.com', password: '123456' })
    const res = await http.get('me', {})
    expect(res.status).toBe(HttpStatusCode.Ok as number)
  })
  it('Refresh token', async () => {
    setAccessTokenToLS(access_token_1s)
    setRefreshTokenToLS(refresh_token_1000d)
    const httpNew = new Http().instance as AxiosInstance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok as number)
  })
})
