import { addHabit, readDatabase, updateHabit } from "../habit-helper.js";
import { getCurrentDate } from "../utils/date.js";
import { BadRequestError, ResourceNotFoundError } from "../utils/error.js";

export async function habitsRoute(fastify) {
  fastify.get("/", (req, res) => getAllHabits(req, res));
  fastify.get("/today", (req, res) => getTodayHabits(req, res));
  fastify.post("/", (req, res) => createHabit(req, res));
  fastify.patch("/:id", (req, res) => toggleHabit(req, res));
}

const getAllHabits = async (req, res) => {
  await readDatabase()
    .then((habits) => {
      res.type("application/json").send(habits);
    })
    .catch((err) => res.status(err.status).send(err));
};

const getTodayHabits = async (req, res) => {
  const today = getCurrentDate();
  await readDatabase()
    .then((habits) =>
      habits.filter((h) => Object.keys(h.daysDone).includes(today))
    )
    .then((todayHabits) => {
      res.type("application/json").send(todayHabits);
    })
    .catch((err) => res.status(err.status).send(err));
};

const createHabit = async (req, res) => {
  const habitTitle = req.body.habitTitle;
  if (!habitTitle) {
    res
      .status(400)
      .type("application/json")
      .send(new BadRequestError("Title is required"));
    return;
  }
  addHabit(habitTitle)
    .then((habits) => res.type("application/json").send(habits))
    .catch((err) => res.status(err.status).send(err));
};

const toggleHabit = async (req, res) => {
  const habitId = req.params.id;
  if (!habitId) {
    res
      .status(400)
      .type("application/json")
      .send(new BadRequestError("Habit ID is required"));
    return;
  }
  await updateHabit(habitId)
    .then((habit) => {
      console.log(!habit);
      if (!habit) throw new ResourceNotFoundError(`Habit ${habitId} not found`);
      res.type("application/json").send(habit);
    })
    .catch((err) => res.status(err.status).send(err));
};
