export const saveAcessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenfromLS = () => {
  localStorage.remove('access_token')
}

export const getAcessTokenFromLS = () =>
  localStorage.getItem('access_token') || ''
