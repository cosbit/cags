import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable, bind, execAsync } from "astal";

import BatteryTile from "../battery/Battery";
import Time from "../time/Time";
import Audio from "../audio/Audio";
/*

Using the following as a reference:
https://github.com/N3RDIUM/dotfiles/blob/main/shell/widget/SideBar.tsx

*/

export default function Sidebar(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      className={"Sidebar"}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | RIGHT | BOTTOM}
      application={App}
    >
      <box
        className={"sidebar-container"}
        spacing={5}
        baselinePosition={Gtk.BaselinePosition.TOP}
        vertical
        hexpand
      >
        <box className={"sidebar-top"} spacing={5}>
          <BatteryTile />
          <Time />
        </box>
        <box>
          <Audio />
        </box>
      </box>
    </window>
  );
}
