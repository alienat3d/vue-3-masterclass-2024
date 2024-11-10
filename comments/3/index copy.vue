<!-- [ src\pages\projects\index.vue ] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
// 2.2 We also need to import the type from that new file we just generated and it’s called Tables.
import type { Tables } from '../../database/types'

// 1.0 Now we need to store the data somewhere to be able to reference it inside the template and display it in the browser. Let’s create a variable "projects" for this and define it with type of any.
// let projects: any
// 1.2 But we also need to make this variable reactive (means that it will watch the updates and also update DOM accordingly). Now we add set ref() for the value of our variable making it by this reactive.
// ? 1.3 refs aren’t the only way to make the reactive variables, but it’s the most commonly used and the recommended way according to the docs. We’ll be using refs for reactive variables throughout the course. Now Vue JS will be always watching if the value changes inside of this variable.
// 1.6 Let’s give to the variable ref a proper type definition. Since ref() is empty it’s set to "any" by default. And if we input '' into it, then it will be set to a string and if we put into it a number then it will be set to a number type. Which means as long as we're not planning to update the ref with a different type than it started with or the type of default value we don’t have to explicitly define a type for it. But if we need this we could use a generic arguments "ref<number>()".
// 1.7 So what exactly is the type we’re expecting the data to be (the date that will update this variable with)? We could hover over returned data from supabase client and see that it will be setting to "data: any[] | null" and we can pass this to ref as types. We’ll set "null" as a value, which will update later.
// const projects = ref<any[] | null>(null)

// 2.3 Now we can replace old types with Tables and specify the table we want — 'projects'. Now ref has all the information of the properties of this object. And since we want it to be an array we also add [] to the type. So now it’s an array of objects of the properties for our projects.
const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)

  // 1.1 And then after error handling logic we’re going to say once our projects returned from the DB we’ll update the value of projects variable with data that we return
  // 1.4 With refs we have to add ".value" to update the value of our reactive variable with received from server data.
  projects.value = data

  // 1.5 And the same goes for referencing the value of the variable.
  console.log('Projects : ', projects.value)
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Go to home</RouterLink>
    <!-- 1.6 But inside of the template we don’t need to add ".value" while referencing variables refs — Vue will add this fur us by default. -->
    <!-- 1.8 Now if we try to access the first element in the projects array it will warn us, that this value could be null in some occasions, which could break our code if we keep it like this. So we have to modify it a little. We’ll use a ternary expression to make sure project isn’t false (or null) and only then we access the first element of an array, but if it false, then don’t do anything. Now our code won’t break anymore. -->
    <!-- {{ projects ? projects[0] : '' }} -->
    <!-- 1.9 We can go even better way and create an unordered list. And at the <li> element create a directive "v-for", so for each project in projects array Vue will render a list item. And for "v-for" it’s recommended to add :key and it should be something unique, so we will set in it the project.id. -->
    <!-- 2.0 Having Typescript types defined for each table makes it super-easy to interact with DB and in our case we’re interacting with "projects" table. And it would be cool to know what are the properties for each project, so we can interact with. With Typescript support we have visibility on all that information without having to leave the code editor or even memorize what was the columns names. So let’s see how we can set this up. Let’s get to supabase.com/dashboard/ and find there API Docs -> Tables and views -> Introduction. Then click on "Generate and download types". Then we copy it to our project. Although it works it has its downsides, as we have to generate and download a new one each time we make changes in the DB schema, but fortunately there is another way: Supabase CLI. It provides a more streamlined approach to generate types. Let’s click on "Docs" button on this page and read how to setup it. -->
    <!-- 2.1 Now after we generated a types.ts file we have to import it in supabaseClient.ts -->
    <!-- Go to [/lib/supabaseClient.ts] -->
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>
