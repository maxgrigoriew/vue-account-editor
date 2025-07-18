import { type IAccount } from 'TYPES/account'
import { v4 as uuidv4 } from 'uuid'

export const createEmptyAccount = (): IAccount => ({
  id: uuidv4(),
  labels: [],
  typeId: 'ldap',
  login: '',
  password: null,
})
