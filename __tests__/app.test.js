const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/tasks");
const connection = require("../db/connection");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  connection.end();
});

describe("GET /api/tasks", () => {
  test("200: Responds with all tasks", () => {
    return request(app)
      .get("/api/tasks")
      .expect(200)
      .then(({ body }) => {
        expect(body.tasks.length).toBe(5);
        body.tasks.forEach((task) => {
          expect(task).toMatchObject({
            id: expect.any(Number),
            title: expect.any(String),
            due_date: expect.any(String),
          });
          expect(
            typeof task.description === "string" || task.description === null
          ).toBe(true);
        });
      });
  });
});
