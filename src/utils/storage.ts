export const saveToLocalStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const loadFromLocalStorage = <T>(key: string): T | null => {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : null
}

export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
}
