<!-- [src\components\AppError\AppErrorDevSection.vue] -->
<!-- 4.3 We’ll also need the access to the error details we’re referencing inside the template, so we’ll need to pass those details as a prop. So inside of setup we can tell the component that we’re expecting props with 'defineProps' and let’s put inside a 'message' prop. -->
<!-- Go to [src\components\AppError\AppErrorPage.vue] -->
<!-- 4.6 But currently this comp. doesn’t know what is the type this 'message'. To specify type of prop we can use the generic types arguments '<>'. And we’ll write there that our props expecting that 'message' will be a string. And we’ll pass all the rest things that we need the same way. -->
<!-- Go to [src\components\AppError\AppErrorPage.vue] -->
<script setup lang="ts">
// defineProps(['message'])
defineProps<{
  customCode: number
  statusCode: number
  code: string
  message: string
  hint: string | null
  details: string
}>()
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ customCode || code }}</h1>
    <p v-if="statusCode" class="error__code">Status Code: {{ statusCode }}</p>
    <p class="error__msg">{{ message }}</p>
    <p v-if="hint">{{ hint }}</p>
    <p v-if="details">{{ details }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
