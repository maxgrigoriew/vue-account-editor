<script setup lang="ts">
import { ref, computed } from 'vue'
import { type IAccount, ACCOUNT_TYPES } from 'TYPES/account'
import { parseLabelsString, stringifyLabels } from 'UTILS/labels'
import { validateAccount } from 'UTILS/validation'

const props = defineProps<{
  account: IAccount
}>()

const emit = defineEmits<{
  (e: 'update', updated: IAccount): void
  (e: 'remove'): void
}>()

const localAccount = ref({ ...props.account })
const errorState = ref<Record<string, boolean>>({})

const runValidation = () => {
  console.log('localAccount.value', localAccount.value)
  errorState.value = validateAccount(localAccount.value)
}

const labelsString = computed({
  get: () => stringifyLabels(localAccount.value.labels),
  set: (val: string) => {
    localAccount.value.labels = parseLabelsString(val)
  },
})

const trySave = () => {
  runValidation()
  if (Object.keys(errorState.value).length === 0) {
    emit('update', localAccount.value)
  } else {
    console.warn('Validation failed, not saving')
  }
}
</script>

<template>
  <div class="account-editor-item">
    <ui-textarea
      class="account-editor-item__marks"
      :class="{ 'has-error': errorState.labels }"
      v-model="labelsString"
      autoResize
      maxlength="50"
      placeholder="Метки"
      @blur="trySave"
    />
    <ui-select
      class="type-field"
      v-model="localAccount.typeId"
      :options="ACCOUNT_TYPES"
      optionLabel="label"
      optionValue="id"
    />
    <ui-input-text
      class="account-editor-item__login"
      :class="{ 'has-error': errorState.login }"
      v-model="localAccount.login"
      maxlength="100"
      placeholder="Логин"
      @blur="trySave"
    />
    <ui-password
      class="account-editor-item__password"
      :class="{ 'has-error': errorState.password }"
      v-if="localAccount.typeId === 'local'"
      v-model="localAccount.password"
      toggleMask
      :feedback="false"
      maxlength="100"
      placeholder="Пароль"
      @blur="trySave"
    />
    <ui-button icon="pi pi-trash" severity="danger" @click="$emit('remove')" />
  </div>
</template>

<style scoped>
.account-editor-item {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.625rem;
}

.account-editor-item__login {
  flex: 1 1 auto;
  min-width: 9.375rem;
}

.account-editor-item__password {
  border-radius: 0.5rem;
}

.has-error {
  border: 1px solid red;
}

@media (max-width: 768px) {
  .account-editor-item {
    flex-direction: column;
    align-items: stretch;
  }

  .account-editor-item__login {
    flex: 1 1 100%;
    min-width: auto;
  }

  button {
    margin-left: auto;
  }
}
</style>
