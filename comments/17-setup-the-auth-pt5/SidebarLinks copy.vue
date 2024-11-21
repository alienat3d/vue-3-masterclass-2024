<!-- [src\components\Layout\SidebarLinks.vue] -->
<script setup lang="ts">
// 1.2 Here we defined how every link should look like. So we can make any of it an optional prop. Let’s do that with the "to" prop. That will mean that some of the links that we receive might not have "to" prop.
interface LinkProp {
  title: string
  to?: string
  icon: string
}
const props = defineProps<{
  links: LinkProp[]
}>()
// 2.5.0 To prevent this confusion we can define the emit inside of script setup in the comp. where we emit the event. And just pass an array into 'defineEmits' and write the custom comp. event name in it. This will be enough for Vue, but for developer experience we can do that in a better way.
// defineEmits(['actionClicked'])

// 2.5.1 We’ll use alternative syntax in order to provide type support for emitted event, we can tell typescript what is the type of emitted event payload. Now typescript will know that payload is expecting a string. And in the child comp. if we try to emit any different type for payload we’ll have an error.
// Go to [src\components\Layout\Sidebar.vue]
// 3.4 We’ll assign defineEmits to a constant 'emits'.
const emits = defineEmits<{
  actionClicked: [string]
}>()

// 3.3 And we can do same for emits too. Inside of script setup of the child comp. where we emit the event we’ll create a new func 'emitActionClicked' and it will receive 'linkTitle' as a string as well. And inside of it we’re going to emit the event. But this time no '$emit' as it’s only available inside of the template.
// 3.5 Then we’ll use it here and emit the event, as we did it in the template before. The first argument is the name of the event and the second is the payload. ↓
const emitActionClicked = (linkTitle: string) => {
  emits('actionClicked', linkTitle)
}

// 1.6.0 Next option, which we won’t use but let’s look at it anyway. We create a constant for filteredLinks. We’ll reach out to links prop and filter the array of things we’re receiving so it returns only the links with "to" props on them. We also need to give a hand to typescript and specify that every link type is a LinkProp, because above we wrote that "to" prop is optional. And this LinkProp has "to" property as a string.
// 1.6.2 Yet we have still error here with "link.to" filter rule. And it’s because we told typescript that "to" property is a string and filter method expecting a boolean. The solution is easy we just have to cast it to boolean by adding the double-bang operator "!!" in front. Is basically a double-not, so it becomes true.
// const filteredLinks = props.links.filter((link): link is LinkProp & { to: string } => !!link.to)

// 1.6.3 Then we’d create another filtered array in order to get the links which don’t have the "to" prop and that’s the idea.
</script>

<!-- * 1.0 Let’s implement a log out action. And we have already a "Sign Out" button in our UI, but it’s being rendered as a link. It’s because our comp. here renders all the links that come to it’s prop as the RouterLink. So even though the "Sign Out" from [src\components\Layout\Sidebar.vue] shouldn’t be passed as a link it will render it as a RouterLink by default. And therefor we need to make a bit of refactoring. And also learn how to refactoring components while doing this. -->
<!-- Go to [src\components\Layout\Sidebar.vue] -->
<template>
  <!-- 1.3 We can work with that and assume that any link with the "to" prop should render as RouterLink and those who don’t have it — should render as a 'div'. Let’s do if-condition to render a RouterLink or a div according on which link has been passed. -->
  <!-- 1.5 So let’s get back to the options we have to render RouterLink or div according to if it has "to" prop or not. The first idea which might come to mind is using "v-if" & "v-else" directives, but it won’t work in this case, as we’re using "v-for" already and "v-for" has the higher priority, so we’ll get an error. -->
  <!-- 1.6.1 So we can use that new filtered massive filteredLinks to look for all links with "to" props tp render RouterLinks out of them. -->

  <!-- 1.7 But there is a better and more straight-forward option. And for that we need to create inside of template another template. (https://vuejs.org/api/built-in-special-elements.html#template) -->
  <!-- 1.7.1 So as docs say the <template> tag is used as a placeholder when we want to use a built-in directive without rendering an element in the DOM. This special handling for this tag is only triggered when is used with one of these directives: v-if, v-else-if, v-else, v-for, v-slot. So it will only trigger our directive and execute the logic. We can also pass the key attribute. And here what we do: we’ll move v-for="link in links" & :key="link.title" to template -->
  <!-- 1.7.2 And now, after we moved RouterLink into this new template it will be totally okay to add v-if directive to it. -->
  <!-- 1.7.3 So we also move the div inside of this template and add v-else to it. -->
  <!-- 1.8 So now they both are in the v-for loop of the template and both have access to the link object which we get from each link in the links array. So the inner content also will work for the div as well now. -->
  <!-- Go to [src\components\Layout\Sidebar.vue] -->
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      exactActiveClass="text-primary bg-muted"
      :to="link.to"
      class="nav-link"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>
    <!-- 2.0 But how do we attach a "click" event listener to the div and handle the signing out action outside of this comp.? Because I want to keep the signout logic separate to maintain the comp. reusability. So let’s make to list "click" events on this div element and whenever users click on it, it’ll perform a logout action. -->
    <!-- Go to [src\components\Layout\Sidebar.vue] -->
    <!-- 2.2 If we add here a 'click' event listener only this comp. that 'click' event listener is in will be able to catch the 'click' event. But what we can do is to send a custom component event from the child to the parent. This will let the parent know that something has happened in the child comp. and it will react accordingly. This process of sending a custom comp. event to the parent is called "emitting an event". "$emit()" will allow us to let the comp. know that this div has been clicked. First argument is a string id or the name of the event (can name it whatever we want) and it will be 'actionClicked'. As the second argument it accepts a payload — something or data that we can send to the parent. We need the parent to identify which action has been clicked. We’ll pass 'link.title' in there. -->
    <!-- Go to [src\components\Layout\Sidebar.vue] -->
    <!-- 3.6 And inside of the template we can use the name of that func. But we should explicitly pass to that func what is the payload, because we mentioned above that it expects 'linkTitle'. -->
    <!-- <div v-else class="nav-link cursor-pointer" @click="$emit('actionClicked', link.title)"> -->
    <div v-else class="nav-link cursor-pointer" @click="emitActionClicked(link.title)">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </template>

  <!-- v-for="link in filteredLinks" -->
</template>

<!-- 1.4 But in the first place this div should be looking same as a RouterLink, as we don’t want to ruin the UI. But instead of copying all the classes we can create a scoped one style down there and say that the class should be "nav-link". Use @apply and move those Tailwind classes here. Then we’ll give to both RouterLink and div this "nav-link" class, so that they look alike. The inner content will be the same too. -->
<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
