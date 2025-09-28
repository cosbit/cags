import App from "resource:///com/github/Aylur/ags/app.js";
import Sidebar from "./Sidebar";

App.config({
  style: App.configDir + "/src/style.scss",
  windows: [Sidebar({ monitor: 0 })],
});

export {};