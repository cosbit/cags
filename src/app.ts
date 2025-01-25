import { App } from "astal/gtk3";
import style from "./style.scss";
import Sidebar from "./widgets/Sidebar";

App.start({
  icons: "./icons",
  css: style,
  main() {
    App.get_monitors().map(Sidebar);
  },
});
