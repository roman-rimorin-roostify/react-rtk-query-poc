// src/mocks/db.js
import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  // Create a "user" model,
  user: {
    // ...with these properties and value getters.
    id: primaryKey(faker.datatype.number),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jerseyNumber: faker.datatype.number(100),
    team: faker.random.alpha()
  }
});

// The default tasks created each time you refresh the page.
db.user.create({
  firstName: "Steph",
  lastName: "Curry",
  jerseyNumber: 30,
  team: "Golden State Warriors"
});
db.user.create({
  firstName: "LeBron",
  lastName: "James",
  jerseyNumber: 23,
  team: "Los Angeles Lakers"
});
db.user.create({
  firstName: "Michael",
  lastName: "Jordan",
  jerseyNumber: 23,
  team: "Chicago Bulls"
});
db.user.create({
  firstName: "Magic",
  lastName: "Johnson",
  jerseyNumber: 32,
  team: "Los Angeles Lakers"
});
