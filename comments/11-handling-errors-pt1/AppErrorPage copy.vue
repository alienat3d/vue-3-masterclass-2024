<!-- [src\components\AppError\AppErrorPage.vue] -->
<script setup lang="ts">
// // 1.10.0 But now we also need to change the activeError state to false again, whenever user navigates away, otherwise he will see only the 404 error page. And for that we can use the Vue Router Navigation Guards. Let’s see what’s in docs [ https://router.vuejs.org/guide/advanced/navigation-guards.html#Global-After-Hooks ]. So we can see a global hook which allow us execute a specific code whenever the navigation occurs. And it gives us also a useful info about the navigation like where the user navigating to and where he is navigating from and third argument if the navigation fails we’ll get the failure reason. So let’s use this here.
// 1.10.1 We’ll pass the callback to 'afterEach' hook. And inside we can set the activeError stat to false. So now whenever user navigates away from this component this will execute and activeError will be set to false, so that the AppErrorPage component disappear until the next error occurs.
// 2.0 The details we get for AppErrorPage component are not dynamic. But it would be nice if we can get the error details from the store and use them in this template.
// Go to [ src\stores\error.ts ]
const router = useRouter()

// 3.0 Let’s get the details of the error now and create a new variable errorStore and assign to it our error store instance.
const errorStore = useErrorStore()

// 3.1 Details from the store goes in the 'error' variable ref and give it an initial value of errorStore.activeError.
const error = ref(errorStore.activeError)

// 3.2 Next we’ll need a message and a customCode variable refs.
const message = ref('')
// 3.3 Here we put as initial 0 as it’s falsy, so we can check if we have a customError or not.
const customCode = ref(0)
// 4.12 Now we’ll define variable refs for the new props we introduced for the Supabase/Postgrest error. (We could combine all these refs inside of single ref object and just use that object, but I see no point in this, so let’s just keep it like that.)
const details = ref('')
const code = ref('')
const hint = ref('')
const statusCode = ref(0)

// 3.4 Now we want to update this message is the error not known. Like if we have error we should update the message with the message that exists inside of error. And do the same for customCode.
// 3.5 And we get an error "Type 'undefined' is not assignable to type 'number'." and this is because we defined customCode as optional and it’s either a number or undefined. We can solve this like that by adding a nullish coalescing operator to say if "error.value.customCode" evaluates to undefined or null then we want the value 0 to take over.
// 4.11 Before we setup the template with the data we get from Supabase error object we should fix this error. And it happens because the customCode exists in the CustomError interface but it doesn’t exists in the ExtendedPostgrestError. So we want an extra check over here, so this chuck of code executes only if error is not a Supabase error. And we already know that customError doesn’t have the code properties so we can use this. That solves this.
// if (error.value) {
if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

// 4.13 And here we need another if-condition to make sure that the error passed is a Supabase error. We’ll check that error is truthy and that 'code' exists in the error.value. And in that case we’ll update the variable refs.
if (error.value && 'code' in error.value) {
  message.value = error.value.message
  details.value = error.value.details
  hint.value = error.value.hint
  code.value = error.value.code
  statusCode.value = error.value.statusCode ?? 0
}

// 2.10 As we updated types for activeError to be either null or CustomError type we must change false to null now.
// router.afterEach(() => (useErrorStore().activeError = false))
router.afterEach(() => (errorStore.activeError = null))
</script>

<!-- 3.6 Now we can go and replace the static data in our error template for dynamic one we’re getting from our error store. -->
<!-- 4.14 Finally we can start working on the template. -->
<template>
  <section class="error">
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
      <!-- 4.15 For customCode if it doesn’t exist we want to display the code variable ref, which is the code we’re getting from Supabase error. -->
      <h1 class="error__code">{{ customCode || code }}</h1>
      <!-- 4.16 We can add a paragraph tag for a status code. But it should showing up only if statusCode exists. -->
      <p v-if="statusCode" class="error__code">Status Code: {{ statusCode }}</p>
      <!-- 4.17 The message variable ref will hold either it’s a custom error or a postgrest error both will store the value in the message variable ref. So just keep it like that. -->
      <p class="error__msg">{{ message }}</p>
      <!-- 4.18 We’ll need another paragraph tag for the hint. -->
      <p v-if="hint">{{ hint }}</p>
      <!-- 4.19 The same goes for details. -->
      <!-- Go to [ src\pages\tasks\[id].vue ] -->
      <p v-if="details">{{ details }}</p>
      <div class="error-footer">
        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

.error__icon {
  @apply text-7xl text-destructive;
}

.error__code {
  @apply font-extrabold text-7xl text-secondary;
}

.error__msg {
  @apply text-3xl font-extrabold text-primary;
}

.error-footer {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

.error-footer__text {
  @apply text-lg text-muted-foreground;
}

p {
  @apply my-2;
}
</style>
