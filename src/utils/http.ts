import axios, { AxiosError, AxiosInstance, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import config from 'src/constants/config'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import { API_URL } from 'src/constants/api'
import { isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

//! Mô phỏng thứ tự gọi refresh token
//* Purchase: 1 - 3
//* Me: 2 - 5
//* Refresh  Token cho Purchase: 3 - 4
//* Gọi lại Purchase: 4 - 6
//* Refresh Token mới cho Me: 5 - 6
//? Gọi lại Me: 6

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 day
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 days
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Thêm một bộ đón chặn response
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === API_URL.LOGIN || url === API_URL.REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(data.data.user)
        } else if (url === API_URL.LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        //! Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        //! Lỗi unauthorized (401) có rất nhiều trường hợp
        //* Token không đúng
        //* Token hết hạn
        //* Không truyền token

        //? Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          //* Trường hợp token hết hạn và request đó k phải là refresh token
          //* thì mới tiến hành gọi refresh token

          if (isAxiosUnauthorizedError(error) && url !== API_URL.REFRESH_ACCESS_TOKEN) {
            //* Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  //! Giữ refreshTokenRequest trong 10s (bé hơn thời gian của expire-refresh-token) cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              if (config.headers) config.headers.authorization = access_token
              //* Nghĩa là chúng ta tiếp tục gọi request cũ vừa bị lỗi
              return this.instance({ ...config, headers: { ...config.headers, authorization: this.accessToken } })
            })
          }

          //! Những trường hợp:
          //* token không đúng
          //* Không truyền token
          //* token hết hạn nhưng gọi refresh token bị fail
          //* thì tiến hành xoá local storage và toast message

          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data?.data?.message || error.response?.data?.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken = () => {
    return this.instance
      .post<RefreshTokenResponse>(API_URL.REFRESH_ACCESS_TOKEN, { refresh_token: this.refreshToken })
      .then((response) => {
        const { access_token } = response.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
