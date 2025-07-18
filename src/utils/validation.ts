import { type IAccount } from 'TYPES/account'
import { stringifyLabels } from 'UTILS/labels'

const FIELD_LIMITS: Record<string, number> = {
  login: 100,
  password: 100,
  labels: 50,
}

export const validateAccount = (account: IAccount): Record<string, boolean> => {
  const errors: Record<string, boolean> = {}

  if (!account.login.trim() || account.login.length > FIELD_LIMITS.login) {
    errors.login = true
  }

  if (
    account.typeId === 'local' &&
    (typeof account.password !== 'string' ||
      !account.password.trim() ||
      account.password.length > FIELD_LIMITS.password)
  ) {
    errors.password = true
  }

  const labelsString = stringifyLabels(account.labels)
  if (labelsString.length > FIELD_LIMITS.labels) {
    errors.labels = true
  }

  return errors
}
