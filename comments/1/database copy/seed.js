// Now we can use any Object with dot notation from [Faker JS API reference](https://fakerjs.dev/api/)
// import { faker } from "@faker-js/faker"
// Or we can do faker even in different language:
import { fakerRU as faker } from "@faker-js/faker"

// Let’s say we want to generate a person name:
const personName = faker.person.fullName()

// And also for his bio:
const personBIo = faker.person.bio()

console.log('Hi! My name is', personName, '. I am a ', personBIo, '.');
