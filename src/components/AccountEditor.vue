<script setup lang="ts">
import { type IAccount } from 'TYPES/account'
import { useAccountStore } from 'STORES/account'
import AccountEditorItem from './AccountEditorItem.vue'
import { createEmptyAccount } from 'UTILS/account'

const accountStore = useAccountStore()

const addAccount = () => {
  accountStore.addAccount(createEmptyAccount())
}

const updateAccount = (id: string, updated: IAccount) => {
  accountStore.updateAccount(id, updated)
}

const removeAccount = (id: string) => {
  accountStore.removeAccount(id)
}
</script>

<template>
  <div class="account-editor">
    <div class="account-editor__topline">
      <h2>Учётные записи</h2>
      <ui-button icon="pi pi-plus" @click="addAccount" />
    </div>
    <div class="account-editor__hint">
      <i class="pi pi-question-circle"></i>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>
    <div class="account-editor__list">
      <account-editor-item
        v-for="account in accountStore.accountsList"
        :key="account.id"
        :account="account"
        @update="updateAccount(account.id, $event)"
        @remove="removeAccount(account.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.account-editor {
  max-width: 48rem;
}

.account-editor__topline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account-editor__hint {
  margin: 0.625rem 0;
  padding: 0.625rem;
  background: #f4f4f4;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  color: #555;
}

.account-editor__list {
  margin-top: 1.25rem;
}
</style>
