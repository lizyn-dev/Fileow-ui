export const setAuth = (value: boolean) => {
  localStorage.setItem('auth', String(value))
}

export const getAuth = (): boolean => {
  const res = localStorage.getItem('auth')
  if (res !== null) {
    return Boolean(res)
  } else {
    return false
  }
}
