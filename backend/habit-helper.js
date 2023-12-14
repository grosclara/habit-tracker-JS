import * as path from "path";
import { promises as fs } from "fs";
import { DatabaseAccessError } from "./utils/error.js";
import { getCurrentDate } from "./utils/date.js";

const DATABASE_PATH = path.join(process.cwd(), "database.json");

export const readDatabase = async () => {
  try {
    const data = JSON.parse(await fs.readFile(DATABASE_PATH, "utf-8"));
    return data.habits;
  } catch (err) {
    throw new DatabaseAccessError("Could not access database");
  }
};

export const addHabit = async (habitTitle) => {
  try {
    const habits = await readDatabase();
    const newHabit = {
      id: Number(habits.slice(-1)[0].id) + 1,
      title: habitTitle,
      daysDone: {},
    };
    newHabit.daysDone[getCurrentDate()] = false;
    const updatedHabits = [...habits, newHabit];
    fs.writeFile(
      DATABASE_PATH,
      JSON.stringify({ habits: updatedHabits }, null, 2),
      "utf-8"
    );
    return updatedHabits;
  } catch (err) {
    throw new DatabaseAccessError("Could not access database");
  }
};

export const updateHabit = async (habitId) => {
  let habits = [];
  try {
    habits = await readDatabase();

    const habit = habits.find((h) => h.id === Number(habitId));
    if (!habit) return null;

    const today = getCurrentDate();
    habit.daysDone[today] = !habit.daysDone[today];

    fs.writeFile(
      DATABASE_PATH,
      JSON.stringify({ habits: habits }, null, 2),
      "utf-8"
    );

    return habit;
  } catch (err) {
    throw new DatabaseAccessError("Could not access database");
  }
};
