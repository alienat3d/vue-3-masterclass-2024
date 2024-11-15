<!-- [src\components\AppError\AppErrorProdSection.vue] -->
<!-- 6.1 And first we’ll copy here everything from the [src\components\AppError\AppErrorDevSection.vue]. -->
<!-- 6.9 And here we’ll accept isCustomError as a prop. -->
<!-- 6.10.1 But to reach out the 'isCustomError' from the props inside of the script setup we’ll have to assign defineProps func to a variables (usually its name 'props'). -->
<script setup lang="ts">
const props = defineProps<{
  customCode: number
  statusCode: number
  // code: string
  message: string
  // hint: string | null
  // details: string
  isCustomError: boolean
}>()
// 6.3 Then let’s work on creating a new value for the error. Something that will always show to the user if the error not custom made by us. Think of it as the base error. And it will be a ref with an object.
// 6.4 Up till now the error details will be ignored. It will always show the error we defined here. But we created our global handler for a reason. We have the ability to pass a string to the error property in the setError method to show the user a custom error with a custom message. But so far outside of the store we don’t have a way to know if the error is a custom error that we’re intentionally wanted to display or to render to the user or it’s a thrown error or it’s a postgrest error.
// Go to [src\stores\error.ts]
const error = ref({
  code: 500,
  msg: 'Oops, something went wrong... ¯\\_(ツ)_/¯'
})

// 6.10.0 Then we’ll write an if-statement for it. If it’s a custom error then display the data you got from an error, otherwise just display the default error with the text 'Oops, something went wrong...'. ↑
// 6.10.2 And now we can use that props variable to reach out props value.
if (props.isCustomError) {
  error.value.code = props.customCode
  error.value.msg = props.message
}

// 7.0 Cool, but what about the errors we get from the DB when Supabase fails to get the record or user tries to access the task or an ID that doesn’t exist in our DB? Well we can use the Postgrest error status code to get this information. First we get the code by commenting our our AppErrorProdSection comp. at [src\components\AppError\AppErrorPage.vue] and find out that the status code is 406. Let’s write a conditional for that.
// Go to [src\components\AppError\AppErrorPage.vue]
if (props.statusCode === 406) {
  error.value.code = 404
  error.value.msg = 'Sorry, we couldn’t find this page! 🥺'
}
</script>

<!-- 6.2 And we’ll filter out what we don’t need here. We only want to show a customCode. No need of statusCode. The same goes for the hint and for details. -->
<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ error.code }}</h1>
    <!-- <p v-if="statusCode" class="error__code">Status Code: {{ statusCode }}</p> -->
    <p class="error__msg">{{ error.msg }}</p>
    <!-- <p v-if="hint">{{ hint }}</p> -->
    <!-- <p v-if="details">{{ details }}</p> -->
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
