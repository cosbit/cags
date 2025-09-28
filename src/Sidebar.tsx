import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Gtk from "gi://Gtk?version=3.0";

import BatteryTile from "./battery/Battery";
import Time from "./time/Time";
import Audio from "./audio/Audio";
import Art from "./art/Art";
import Date from "./date/Date";
import System from "./system/System";
import Bright from "./bright/Bright";

/*

Using the following as a reference:
https://github.com/N3RDIUM/dotfiles/blob/main/shell/widget/SideBar.tsx

*/

const Sidebar = ({ monitor }: { monitor: number }) =>
  Widget.Window({
    name: "Sidebar",
    className: "Sidebar",
    monitor,
    exclusivity: "exclusive",
    anchor: ["top", "right", "bottom"],
    child: Widget.Box({
      className: "sidebar-container",
      spacing: 5,
      baseline_position: Gtk.BaselinePosition.TOP,
      vertical: true,
      hexpand: true,
      children: [
        Widget.Box({
          spacing: 5,
          children: [BatteryTile(), Time()],
        }),
        Widget.Box({
          children: [Audio()],
        }),
        Widget.Box({
          spacing: 5,
          children: [
            Art(),
            Widget.Box({
              vertical: true,
              className: "long-container",
              spacing: 5,
              children: [Date(), System()],
            }),
          ],
        }),
        Widget.Box({
          children: [Bright()],
        }),
      ],
    }),
  });

export default Sidebar;