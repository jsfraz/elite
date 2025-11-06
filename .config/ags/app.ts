import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./components/bar/Bar"
import PowerMenu from "./components/powerMenu/PowerMenu"
import MainMenu from "./components/mainMenu/MainMenu"

app.start({
  css: style,
  main() {
    // TODO validate monitors

    app.get_monitors().map(Bar);
    app.get_monitors().map(PowerMenu);
    app.get_monitors().map(MainMenu);
  },
})
