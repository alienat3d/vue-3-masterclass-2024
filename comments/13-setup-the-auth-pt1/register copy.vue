<!-- [src\pages\register.vue] -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- 1.0 So let’s work in this chapter on authentication. Signing-in, logging-in and logging-out. As we have the DB ready, let’s get our pages ready too. We need the essential pages for auth. One for registering a new user and another for logging-in. -->
<!-- 1.1 Also these two new templates have some shadcn-components that are being in use and need to be add, so input to console: 'npx shadcn-vue@latest add card', 'npx shadcn-vue@latest add separator' & 'npx shadcn-vue@latest add label' -->
<!-- 1.3 So what we do first is collecting the values that the user will insert in these input fields. We’ll create a variable ref formData and it will have an object in it. This object should have a property for each field. So again the goal here is to store all inputs value in its corresponding property. And how we can do that is by using a 'v-model'. So let’s see it in action. ↓ -->
<script setup lang="ts">
const formData = ref({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
</script>

<template>
  <div
    class="mx-auto w-full flex justify-center items-center p-10 text-center -mt-10 min-h-[90vh] h-full"
  >
    <Card class="max-w-sm w-full mx-auto h-full">
      <CardHeader>
        <CardTitle class="text-2xl"> Register </CardTitle>
        <CardDescription> Create a new account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>
        <!-- 1.2 Let’s start with the register form. It has labels and inputs from shad-cn. So it’s just a basic register form. (In the future I’m planning to use a FormKit (https://formkit.com/)) ↑ -->
        <form class="grid gap-4">
          <div class="grid gap-2">
            <!-- 1.4 Start with the username field. So we bind it to formData’s username property. And only with that we creating a two-way binding with this property. In simple terms: if the user changes the input value, Vue will be updating the reactive property linked to it, which is 'formData.username'. And it also works the other way around too - if we change the reactive property, the input field value will update instantly. -->
            <!-- ? 1.5 Although we need to keep in mind something. When we use the v-model on a regular HTML-input field it automatically sets a two ways binding we don’t need to do anything — it will just work. But when we’re dealing with a comp. and we add a v-model on the comp. it works in a diff. way and requires an additional step. We don’t go there right now, as shad-cn is handling that for us that’s why it works without extra step. -->
            <Label id="username" class="text-left">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe19"
              required
              v-model="formData.username"
            />
          </div>
          <div class="flex flex-col sm:flex-row justify-between gap-4">
            <div class="grid gap-2">
              <Label id="first_name" class="text-left">First Name</Label>
              <Input
                id="first_name"
                type="text"
                placeholder="John"
                required
                v-model="formData.firstName"
              />
            </div>
            <div class="grid gap-2">
              <Label id="last_name" class="text-left">Last Name</Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Doe"
                required
                v-model="formData.lastName"
              />
            </div>
          </div>
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
            />
          </div>

          <div class="grid gap-2">
            <Label id="password" class="text-left">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="*****"
              autocomplete
              required
              v-model="formData.password"
            />
          </div>

          <div class="grid gap-2">
            <Label id="confirm_password" class="text-left">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder="*****"
              autocomplete
              required
              v-model="formData.confirmPassword"
            />
          </div>
          <Button type="submit" class="w-full"> Register </Button>
          <!-- <Button variant="outline" class="w-full"> Login with Google </Button> -->
        </form>
        <div class="mt-4 text-sm text-center">
          Already have an account?
          <RouterLink to="/login" class="underline"> Login </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
