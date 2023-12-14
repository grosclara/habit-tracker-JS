import { ClientError, ServerError } from "../utils/error";

const BASE_URL = "http://[::1]:3000/habits";

export const getTodayHabits = async () => {
  const habits = await fetch(BASE_URL + "/today")
    .then((res) => {
      if (!res.ok) throw new ClientError(res.json());
      return res.json();
    })
    .catch((err) => console.error(err));

  return habits;
};

export const updateHabit = async (habitId) => {
  const habit = await fetch(BASE_URL + `/${habitId}`, {
    method: "PATCH",
  })
    .then((res) => {
      if (!res.ok) throw new ClientError(res.json());
      return res.json();
    })
    .catch((err) => console.error(err));

  return habit;
};
