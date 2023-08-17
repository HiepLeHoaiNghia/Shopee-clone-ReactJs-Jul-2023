import axios, { AxiosError, HttpStatusCode } from 'axios'
import config from 'src/constants/config'
import userDefaultAvatar from 'src/assets/svg/userDefaultAvatar.svg'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE', {}).format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}

export function removeSpecialCharacter(str: string) {
  return str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\\=|\\<|\\>|\?|\/|,|\.|\\:|\\;|\\'|\\"|\\&|\\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  )
}

export function generateNameId({ name, id }: { name: string; id: string }) {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) =>
  !avatarName || (!avatarName.endsWith('.png') && !avatarName.endsWith('.jpg'))
    ? userDefaultAvatar
    : `${config.baseUrl}images/${avatarName}`
