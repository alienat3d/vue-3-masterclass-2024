<script setup lang="ts">
// 1.1 Let’s draw an image of how the link would look like. We’ll define an interface "linkProp" which describes all the characteristics of the linkProp, so any link should look like that, what we’ll define here.
interface LinkProp {
  title: string
  to: string
  icon: string
}

// 1.0 We want this component to receive an array of the links and the link’s details from the parent to use them in the current component. We’ll do that using props. And since we use Typescript we’ll write a generic type argument. So it will be a component that accepts an array of links.
defineProps<{
  links: LinkProp[]
}>()
</script>

<template>
  <!-- 1.2 Let’s implement the logic for the component that these links going to receive. We’ll create a loop v-for for that and not to forget about ":key", which should be anything unique and for now what is unique about links is the title. -->
  <!-- 1.3 We’ll change to attribute to set it for "link.to" -->
  <!-- 1.4 For icon, as it should be dynamic as well, we’ll bind an icon-prop. -->
  <!-- 1.5 Same goes to the text content, where we input it dynamically in a moustache syntax. -->
  <!-- Go to [Sidebar.vue] -->
  <!-- 2.1 However we could go and set "activeClass" & "exactActiveClass" props straight to the component. Whatever we’ll pass as the value for those props it will be added as a class to the active link. But we’ll add here only the "exactActiveClass" prop tho. -->
  <RouterLink
    exactActiveClass="text-primary bg-muted"
    v-for="link in links"
    :key="link.title"
    :to="link.to"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
  >
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
  </RouterLink>
</template>

<!-- 2.0 Time to make look different the link, which corresponds to the page user is currently at. Luckily Vue Router adds unique class "router-link-active" to the active link making it easy to style. There is also another class "router-link-exact-active" and the difference between those two classes is that "router-link-exact-active" is applied only if the current path exactly matches the link path, while the "router-link-active" is applied whenever link’s path is part of the current path. -->
<!-- <style scoped>
.router-link-active {
  background-color: black;
}
</style> -->
