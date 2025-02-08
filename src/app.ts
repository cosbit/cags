import { App } from "astal/gtk3";
import style from "./style.scss";
import Sidebar from "./widgets/Sidebar";

App.start({
  icons: "./icons",
  css: style,
  main() {},
  requestHandler(request: string, res: (response: any) => void) {
    if (request == "sidebar") {
      const monitors = App.get_monitors()
      Sidebar(monitors[0], App);
    }
    res("unknown command")
},
});
