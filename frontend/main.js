import "./style.css";
import { TodayHabitsComponent } from "./ui/TodayHabitsComponent";

class App {
  constructor() {
    this.todayHabits = new TodayHabitsComponent();
  }

  init() {
    this.todayHabits.init();
  }
}

const app = new App();
app.init();
