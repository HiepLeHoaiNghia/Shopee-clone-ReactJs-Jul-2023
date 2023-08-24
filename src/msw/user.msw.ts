import { rest } from 'msw'
import { HttpStatusCode } from 'axios'
import config from 'src/constants/config'
import { access_token_1s } from './auth.msw'

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '64ae267d1afc2e1a1f96b4c9',
    roles: ['User'],
    email: 'AAuser2@gmail.com',
    createdAt: '2023-07-12T04:05:17.147Z',
    updatedAt: '2023-08-18T07:15:57.244Z',
    address: 'Việt Nam',
    avatar: '5fa862ca-e973-499c-a231-08f3bf706237.jpg',
    date_of_birth: '1986-02-14T17:00:00.000Z',
    name: 'Hiệp',
    phone: '0123333444'
  }
}

const meRequest = rest.get(`${config.baseUrl}me`, (req, res, ctx) => {
  const access_token = req.headers.get('authorization')
  if (access_token === access_token_1s) {
    return res(
      ctx.status(HttpStatusCode.Unauthorized),
      ctx.json({
        message: 'Lỗi',
        data: {
          message: 'Token hết hạn',
          name: 'EXPIRED_TOKEN'
        }
      })
    )
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes))
})

const userRequests = [meRequest]

export default userRequests
