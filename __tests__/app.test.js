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

describe("POST /api/tasks", () => {
  test("201: Adds a task and responds with the posted task", () => {
    const newTask = {
      title: "Review project",
      description: "Check all endpoints and error handling works correctly.",
      status: "pending",
      due_date: "2025-04-28T11:00:00Z",
    };
    return request(app)
      .post("/api/tasks")
      .send(newTask)
      .expect(201)
      .then(({ body }) => {
        expect(body.task).toMatchObject({
          id: expect.any(Number),
          title: "Review project",
          description:
            "Check all endpoints and error handling works correctly.",
          status: "pending",
          due_date: "2025-04-28T10:00:00.000Z",
        });
      });
  });
  test("400: Responds with error when a bad object is posted e.g. a malformed body / missing required fields", () => {
    const newTask = {
      title: null,
      description: "Check all endpoints and error handling works correctly.",
      status: "pending",
      due_date: "2025-04-28T11:00:00Z",
    };
    return request(app)
      .post("/api/tasks")
      .send(newTask)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad Request");
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

describe("PATCH /api/tasks/:id", () => {
  test("PATCH 201: Responds with updated status added for correct task", () => {
    const newStatus = { new_status: "completed" };
    return request(app)
      .patch("/api/tasks/3")
      .send(newStatus)
      .expect(200)
      .then(({ body }) => {
        expect(body.updatedTask).toEqual({
          id: 3,
          title: "Test updating a task status",
          description: "Check if the task status can be updated to completed.",
          status: "completed",
          due_date: "2025-04-28T10:00:00.000Z",
        });
      });
  });
  test("PATCH 400: Responds with error when a bad object is posted e.g. a malformed body / missing required fields", () => {
    const newStatus = { new_status: null };
    return request(app)
      .patch("/api/tasks/3")
      .send(newStatus)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad Request");
      });
  });
  test("PATCH 400: Responds with error when an empty object is posted", () => {
    const newStatus = {};
    return request(app)
      .patch("/api/tasks/3")
      .send(newStatus)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad Request");
      });
  });
  test("PATCH 404: Responds with error when passed a non-existent ID", () => {
    const newStatus = { new_status: "completed" };
    return request(app)
      .patch("/api/tasks/99999999")
      .send(newStatus)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("No task found for id: 99999999");
      });
  });
  test("PATCH 400: Responds with error when passed an ID that is not a number", () => {
    const newStatus = { new_status: "completed" };
    return request(app)
      .patch("/api/tasks/NaN")
      .send(newStatus)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad Request");
      });
  });
});

describe("DELETE /api/tasks/:id", () => {
  test("204: Deletes a task specified by ID", () => {
    return request(app).delete("/api/tasks/1").expect(204);
  });
  test("404: Responds with error when passed a non-existent ID", () => {
    return request(app)
      .delete("/api/tasks/99999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("No task found for ID: 99999999");
      });
  });
  test("400: Responds with error when passed an ID that is not a number", () => {
    return request(app)
      .delete("/api/tasks/NaN")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad Request");
      });
  });
});
