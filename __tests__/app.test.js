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

describe("GET /api/tasks/:id", () => {
  test("200: Responds with specified task", () => {
    return request(app)
      .get("/api/tasks/1")
      .expect(200)
      .then(({ body }) => {
        const user = body.task;
        expect(user).toMatchObject({
          id: 1,
          title: "Test creating a task",
          description: "Ensure a task can be created successfully.",
          status: "pending",
          due_date: "2025-04-28T08:00:00.000Z",
        });
      });
  });
  test("404: Responds with error when passed a non-existent task", () => {
    return request(app)
      .get("/api/tasks/99999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("No task found for ID: 99999999");
      });
  });
  test("400: Responds with error when passed an ID that is not a number", () => {
    return request(app)
      .get("/api/tasks/NaN")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad Request");
      });
  });
});
