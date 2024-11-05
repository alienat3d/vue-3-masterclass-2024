import { fakerEN_US as faker } from "@faker-js/faker"
import { createClient } from '@supabase/supabase-js'

// 1.0 Since we’re running the inside Node environment and not Vite inside environment we need to use "process.env" instead.
// 1.1 We also replace SUPABASE_API_KEY, as we will be using here to bypass Row Level Security to protect our DB. We’ll need here something that called service role key and we can find it under project setting at Supabase.
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 4.0 A little upgrade to catch and display potential errors.
const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`
  )
  process.exit(1)
}

const logStep = (stepMessage) => {
  console.log(stepMessage);
}

// 2.0 Let’s define a function to seed our project’s table
// 2.1 When we use the supabase we also can use it’s method "from" and inside of this method we define which table we’re trying to interact with. Then we use the "insert" method in order to pass an object where the properties of that object represents the table columns and the value are the values of those columns we’re trying to set.
// 2.2 Then we let faker create for us a lorem-sentence with 3 words in it.
// 2.3 Next comes a slug and it has to be the exact the same project name, but instead of spaces it should have dashes. So we better put it into the name variable first to make sure it’s the same one. Next we need to make sure it’s in lowercase and then use a replace method to replace all the spaces inside of the name with dashes.
// 2.4 Then we also need "status" and it must have only two values: either "in-progress" or "completed". For that we use one of faker helpers which is called "arrayElement". It allows us to set inside an array and Faker will randomly select on of the elements in this array each time this code executes.
// 2.5 Next one "collaborators" and it allows and array which contains the user IDs, but we don’t have users yet. So we let Faker helpers but "arrayElements", now instead of picking just one value out of array it will pick a random number of values.

// 3.0 Let’s make seedProjects to receive a parameter "number of entries", so that if we put some number in our function it will create that much rows with the fake data in the table. We’ll use a loop for that. And we could just input everything inside of the loop, but it will be so time & resource consuming, there is a better way - a "Bulk create". So we create an array of objects, where each object represents a column and a value for that project.
// 3.1 We’ll create an empty array projects first. And we’ll push to this array a project creation for each iteration of the loop. And now instead of passing an object we’ll pass an array of the projects.
const seedProjects = async (numEntries) => {
  logStep('Seeding projects...')
  const projects = []

  for (let index = 0; index < numEntries; index++) {
    const name = faker.lorem.words(3)

    projects.push({
      name: name,
      slug: name.toLocaleLowerCase().replace(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3])
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')

  if (error) return logErrorAndExit('Projects', error)

  logStep('Projects seeded successfully.')

  return data
}

const seedDatabase = async (numEntriesPerTable) => {
  await seedProjects(numEntriesPerTable)
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)

// 2.6 Alright now we can clear the DB with command "npm run db:reset" in a command line
