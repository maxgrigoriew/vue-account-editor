import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { type IAccount } from 'TYPES/account'
import { loadFromLocalStorage, saveToLocalStorage } from 'UTILS/storage'
import { validateAccount } from 'UTILS/validation'

const LS_KEY = 'accounts'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<IAccount[]>(loadFromLocalStorage<IAccount[]>(LS_KEY) || [])

  const addAccount = (account: IAccount) => {
    accounts.value.push(account)
  }

  const updateAccount = (id: string, updated: IAccount) => {
    const index = accounts.value.findIndex((a) => a.id === id)
    if (index !== -1) {
      accounts.value[index] = updated
    }
  }

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter((a) => a.id !== id)
  }

  const accountsList = computed(() => accounts.value)

  watch(
    accounts,
    () => {
      const validAccounts = accounts.value.filter(
        (acc) => Object.keys(validateAccount(acc)).length === 0,
      )
      saveToLocalStorage(LS_KEY, validAccounts)
    },
    { deep: true },
  )

  return { accounts, accountsList, addAccount, updateAccount, removeAccount }
})
