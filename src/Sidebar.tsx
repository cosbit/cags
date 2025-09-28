import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable, bind, execAsync } from "astal";

import PowerTile from "./battery/Power";
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

export default function Sidebar(gdkmonitor: Gdk.Monitor, app: Astal.Application) {
  const { TOP, RIGHT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      name="Sidebar"
      // visible={false}
      className={"Sidebar"}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | RIGHT | BOTTOM}
      application={app}
      setup={self => app.add_window(self)}
    >
      <box
        className={"sidebar-container"}
        spacing={5}
        baselinePosition={Gtk.BaselinePosition.TOP}
        vertical
        hexpand
      >
        <box spacing={5}>
          <PowerTile />
          <Time />
        </box>

        <box>
          <Audio />
        </box>

        <box spacing={5}>
          <Art />

          <box 
            vertical
            className={"long-container"}
            spacing={5}
          >
            <Date/>
            <System/>
          </box>
          
        </box>

        <box>
          <Bright/>
        </box>

        
      </box>
    </window>
  );
}
