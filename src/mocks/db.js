// src/mocks/db.js
import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  // Create a "user" model,
  user: {
    // ...with these properties and value getters.
    id: primaryKey(faker.datatype.uuid),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jerseyNumber: faker.datatype.number(100),
    isActive: faker.datatype.boolean()
  }
});

// The default tasks created each time you refresh the page.
db.user.create({
  firstName: "Steph",
  lastName: "Curry",
  jerseyNumber: 30,
  isActive: true
});
db.user.create({
  firstName: "LeBron",
  lastName: "James",
  jerseyNumber: 23,
  isActive: true
});
db.user.create({
  firstName: "Michael",
  lastName: "Jordan",
  jerseyNumber: 23,
  isActive: false
});
db.user.create({
  firstName: "Magic",
  lastName: "Johnson",
  jerseyNumber: 32,
  isActive: false
});
