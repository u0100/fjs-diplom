export const getToken = (): string => {
  const data = localStorage.getItem('token')
  const result = data ? JSON.parse(data) : ''
  return result
}

export const setToken = (token: string): void => {
  localStorage.setItem('token', JSON.stringify(token))
}

export const removeToken = (): void => {
  localStorage.removeItem('token')
}