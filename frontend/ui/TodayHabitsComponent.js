// @ts-nocheck
import { getTodayHabits } from "../api/habit.js";
import { getCurrentDate } from "../utils/date.js";
import { HabitComponent } from "./HabitComponent.js";

export class TodayHabitsComponent {
  constructor() {
    this.habits = [];
    this.today = getCurrentDate();
  }

  init() {
    this.element = document.getElementById("habit-list");
    this.refresh();
  }

  async refresh() {
    while (this.element.hasChildNodes())
      this.element.removeChild(this.element.firstChild);
    await this.fetchTodayHabits();
    this.render();
  }

  async fetchTodayHabits() {
    this.habits = await getTodayHabits();
  }

  render() {
    for (const habit of this.habits) {
      const habitComponent = new HabitComponent({
        title: habit.title,
        isDoneToday: habit.daysDone[this.today],
      });
      habitComponent.init();
      this.element.appendChild(habitComponent.element);
    }
  }
}
