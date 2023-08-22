import { describe, expect, it, beforeEach } from 'vitest'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTIxVDA3OjUzOjMzLjc5NloiLCJpYXQiOjE2OTI2MDQ0MTMsImV4cCI6MTY5MjY5MDgxM30.a-uwn_XNfPBQTPvN-8fHRTbI9V8HxMcNxnEfj9BY-Oo'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWUyNjdkMWFmYzJlMWExZjk2YjRjOSIsImVtYWlsIjoiQUF1c2VyMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTIxVDA3OjUzOjMzLjc5NloiLCJpYXQiOjE2OTI2MDQ0MTMsImV4cCI6MTcwNjQyODQxM30.QN5lG7fw17JXSrSSqirU5cxrZRgkzGEYYoYrV-bsVxY'
const profile =
  '{"_id":"64ae267d1afc2e1a1f96b4c9","roles":["User"],"email":"AAuser2@gmail.com","createdAt":"2023-07-12T04:05:17.147Z","updatedAt":"2023-08-18T07:15:57.244Z","__v":0,"address":"Việt Nam","avatar":"5fa862ca-e973-499c-a231-08f3bf706237.jpg","date_of_birth":"1986-02-14T17:00:00.000Z","name":"Hiệp","phone":"0123333444"}'

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token should be get from localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token should be get from localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toBe(refresh_token)
  })
})

describe('clearLS', () => {
  it('should be clear localStorage', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLS(JSON.parse(profile))
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
    expect(getProfileFromLS()).toBeNull()
  })
})
