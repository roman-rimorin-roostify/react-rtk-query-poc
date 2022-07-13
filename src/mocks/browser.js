// src/mocks/browser.js
import { setupWorker, rest } from "msw";
import { db } from "./db";

export const worker = setupWorker(
  // Mock a user creation operation.
  rest.post("/api/users", (req, res, ctx) => {
    const { firstName, lastName } = req.body;

    const user = db.user.create({
      firstName,
      lastName
    });

    return res(ctx.json(user));
  }),

  // Retrieve a single user from the database by ID.
  rest.get("/api/users", (req, res, ctx) => {
    const users = db.user;
    // console.log(users.getAll())
    return res(ctx.json(users.getAll()));
  }),

  // Retrieve a single user from the database by ID.
  rest.get("/api/users/:userId", (req, res, ctx) => {
    const user = db.user.findFirst({
      where: {
        id: {
          equals: req.params.userId
        }
      }
    });

    if (!user) {
      return res(ctx.status(404));
    }

    return res(ctx.json(user));
  })
);
