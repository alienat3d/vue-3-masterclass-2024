<script setup lang="ts">
// 1.5 Let’s focus on how works Suspense. Let’s craft a Vue component. We’ll create a variable MocComponent and set it’s value to helper func "defineComponent" and it’s a func from Vue to help us define a component. We wouldn’t need to reach out like this in real world. It’s just for demo. It gets a callback and then returns another callback that resolves to whatever this component template should render. Let’s say this component should render a greeting. We’ll set a ref with default value "Hello!". And for returning we’ll use h-func with greeting.value.
// 1.7 But if this component had a top level awaited promise. Maybe we’re updating the greeting value from the DB. Add async in front of callback func. And await for a new promise. What we just did we transformed our MocComponent into an async dependency. With that in the browser we have the same error as before. And it’s because a top level awaited async functions will not work in Vue.
/* const MocComponent = defineComponent(async () => {
  const greeting = ref('Hello!')

  await new Promise(resolve => {
    greeting.value = 'Hello from the DB!'
    // 1.9.2 But as our promise will be instantly resolved we won’t see the "loading span". So let’s  intentionally delay it.
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })

  return () => h('p', greeting.value)
}) */
</script>
<template>
  <AuthLayout>
    <!-- 1.4 To make this bring to work and be able to trigger async functions on the top level of the script setup we must use a component called <Suspense />. -->
    <!-- 1.6 And now if we use our new MocComponent and check the browser... It works fine and render our <p>Hello!</p> -->
    <!-- 1.8 And the solution to this is that we use Suspense component. And if we move our MocComponent inside of Suspense component, voila, it works again. -->
    <!-- 1.9.0 In addition Suspense has a slot we can use and it’s called "template #fallback" and... -->
    <!-- <Suspense> -->
    <!-- <MocComponent /> -->

    <!-- <template #fallback> -->
    <!-- 1.9.1 ...whatever be here will be passed to the fallback-slot inside of the Suspense component and it will be rendered when the asynchronous func is still loading. Let’s load a span ↑ -->
    <!-- <span>Loading...</span> -->
    <!-- </template> -->
    <!-- </Suspense> -->
    <!-- 2.0 But how to use Suspense with the RouterView? As we need it of course to render that page, which corresponds with a current path. -->
    <!-- 2.1 First we need to move the Suspense component inside of it. -->
    <!-- 2.2 But there is a problem — once we’ll pass anything to the RouterView it will no longer does the task of rendering component that corresponds to the current path instead it will render what we passed to it. RouterView no longer renders the corresponding page. Luckily we have the dynamic component from Vue which name is "Component". And it needs to have "is" prop bind to it, where we write what is this Component exactly. Let’s make it a div for example. -->
    <!-- 2.3 Now, how to tell this dynamic component which component to render when the specific path is visited? We can get that info by adding to RouterView "v-slot" and destruct something called "Component" and "route" (where the first is the exact component which it should render in the current path and the second contains the info about current path). -->
    <!-- 2.4 Now we can pass to "is" prop of Component "Component" from RouterView. Not for get to provide a key as well, which will be the "route.name" a unique ID, as we can’t have two routes with the same exact name. Also this key is beneficial if we use a transition component. -->
    <!-- 2.5 And also add a "v-if" check to Suspense that RouterView provides any "Component" and it exists at all, so it can be rendered. -->
    <!-- 2.6 The Suspense component makes sure that page component doesn’t render unless the Promises are resolved. This way you don’t get this feeling that the date is not ready for you when you navigate. -->
    <!-- 2.7 Also by default the fallback-template will be shown only after some seconds, but we can change this behavior and show it right after the async function will be triggered by adding "timeout" to Suspense and set it to "0". -->
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <!-- <Component :is="'div'">Hi world!</Component> -->
        <Component :is="Component" :key="route.name"></Component>

        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
