import { API_URL } from 'src/constants/api'
import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(API_URL.REGISTER, body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(API_URL.LOGIN, body)
  },
  logoutAccount() {
    return http.post(API_URL.LOGOUT)
  }
}
export default authApi
