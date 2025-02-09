import { App } from "astal/gtk3";
import style from "./style.scss";
import Sidebar from "./Sidebar";

App.start({
  icons: "./icons",
  css: style,
  main() {
    const monitors = App.get_monitors()
    Sidebar(monitors[0], App)
  }
});
