export interface IAccountType {
  id: 'ldap' | 'local'
  label: string
}

export const ACCOUNT_TYPES: IAccountType[] = [
  { id: 'ldap', label: 'LDAP' },
  { id: 'local', label: 'Локальная' },
]

export interface IAccountLabel {
  text: string
}

export interface IAccount {
  id: string
  labels: IAccountLabel[]
  typeId: IAccountType['id']
  login: string
  password: string | null
}
