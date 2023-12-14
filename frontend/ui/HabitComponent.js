export class HabitComponent {
  constructor({ title, isDoneToday }) {
    this.title = title;
    this.isDoneToday = isDoneToday;
  }

  init() {
    this.render();
  }

  render() {
    this.element = document.createElement("li");
    this.element.innerText = `${this.title} ${this.isDoneToday ? "✅" : "❌"}`;
  }
}
