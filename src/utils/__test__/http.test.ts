import { beforeEach, describe, expect, it } from 'vitest'
import http, { Http } from '../http'
import { AxiosInstance, HttpStatusCode } from 'axios'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

describe('http axios', () => {
  //? Tạo một instance mới cho mỗi test
  let http = new Http().instance as AxiosInstance
  beforeEach(() => {
    //? Trước mỗi lần test phải xoá local storage rồi mới tạo một instance mới theo thứ tự
    localStorage.clear()
    http = new Http().instance as AxiosInstance
  })

  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTIyVDEwOjM1OjQ5LjEzOFoiLCJpYXQiOjE2OTI3MDA1NDksImV4cCI6MTY5MjcwMDU1MH0.V4PbVwHSW-GcWBiJXh8ya61VOsT-vrhDpcdgUZMK2MQ'

  const refresh_token_1000d =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTIyVDEwOjM5OjM2LjM4OFoiLCJpYXQiOjE2OTI3MDA3NzYsImV4cCI6MTc3NzMwMDc3Nn0.fagWwh7Npc91l2WUlUB4Vcvya_raoyOABaZNS1CAbb0'

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
