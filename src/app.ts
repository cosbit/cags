import { App } from "astal/gtk3";
import style from "./style.scss";
import Sidebar from "./widgets/Sidebar";

App.start({
  icons: "./icons",
  css: style,
  main() {
    const monitors = App.get_monitors();
    /* Start Automatically */
    if (monitors[0] != null){
      console.log("monitor found");
      Sidebar(monitors[0], App);
    } else {
      console.log("monitor not found");
    }
  }
});
