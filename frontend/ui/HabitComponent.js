import { updateHabit } from "../api/habit.js";

export class HabitComponent {
  constructor({ id, title, isDoneToday }) {
    this.id = id;
    this.title = title;
    this.isDoneToday = isDoneToday;
  }

  init() {
    this.render();
  }

  async toggleIsDone() {
    const habit = await updateHabit(this.id);
    if (!habit) return;
    this.isDoneToday = !this.isDoneToday;
  }

  render() {
    this.element = document.createElement("li");
    this.element.innerText = `${this.title} ${this.isDoneToday ? "✅" : "❌"}`;
  }
}
