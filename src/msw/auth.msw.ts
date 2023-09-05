import { rest } from 'msw'
import { HttpStatusCode } from 'axios'
import config from 'src/constants/config'
import { API_URL } from 'src/constants/api'

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTIyVDEwOjM1OjQ5LjEzOFoiLCJpYXQiOjE2OTI3MDA1NDksImV4cCI6MTY5MjcwMDU1MH0.V4PbVwHSW-GcWBiJXh8ya61VOsT-vrhDpcdgUZMK2MQ'

export const refresh_token_1000d =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTIyVDEwOjM5OjM2LjM4OFoiLCJpYXQiOjE2OTI3MDA3NzYsImV4cCI6MTc3NzMwMDc3Nn0.fagWwh7Npc91l2WUlUB4Vcvya_raoyOABaZNS1CAbb0'

export const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTI1VDAxOjUxOjU2Ljk0OFoiLCJpYXQiOjE2OTI5MjgzMTYsImV4cCI6MTc5MjkyODMxNX0.Hp06m40XurKJ0OV5xh0oBT3MJR4ECw5BpmwU8-EuvnY'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTI0VDA2OjI2OjQ0LjU5NVoiLCJpYXQiOjE2OTI4NTg0MDQsImV4cCI6MTcwMjg1ODQwM30.WdfJ4dU85JwfCleVi7hu8IeuzUGOgZyDH9_9z27UsEA',
    expires: 9999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTI0VDA2OjI2OjQ0LjU5NVoiLCJpYXQiOjE2OTI4NTg0MDQsImV4cCI6MTc3NzQ1ODQwNH0._JBzyOOyKUF8T1YaMcvCzy2BY3g33qLHj_I2YaLllYk',
    expires_refresh_token: 84600000,
    user: {
      _id: '64ae267d1afc2e1a1f96b4c9',
      roles: ['User'],
      email: 'AAuser2@gmail.com',
      createdAt: '2023-07-12T04:05:17.147Z',
      updatedAt: '2023-08-18T07:15:57.244Z',
      __v: 0,
      address: 'Việt Nam',
      avatar: '5fa862ca-e973-499c-a231-08f3bf706237.jpg',
      date_of_birth: '1986-02-14T17:00:00.000Z',
      name: 'Hiệp',
      phone: '0123333444'
    }
  }
}

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTI0VDA4OjE2OjI1Ljc0OFoiLCJpYXQiOjE2OTI4NjQ5ODUsImV4cCI6MTc3NzQ2NDk4NX0.PJX6sPCbqurTYoL8nVzgPflu2eP2Caoii_AsJOE04jg'
  }
}

const loginRequest = rest.post(`${config.baseUrl}${API_URL.LOGIN}`, (_, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

const refreshToken = rest.post(`${config.baseUrl}${API_URL.REFRESH_ACCESS_TOKEN}`, (_, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenRes))
})

const authRequests = [loginRequest, refreshToken]

export default authRequests
