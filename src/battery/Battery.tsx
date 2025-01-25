import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { Icon } from "astal/gtk3/widget";

export default function BatteryTile() {
  const { START, END } = Gtk.Align;

  const capacity = Variable<number>(0).poll(
    60000,
    "cat /sys/class/power_supply/BAT1/capacity",
    (out: string, prev: number) => parseInt(out),
  );

  const poll_to_str = (v: number) => v.toString() + "%";

  return (
    <box vertical className={"tile-container light"}>
      <box className={"bat-tile-upper"}>
        <Icon className={"battery-img"} icon={"nuclear"} />
        <label
          truncate
          hexpand
          halign={END}
          label={capacity(poll_to_str)}
          className={"battery-perc"}
        />
      </box>
      <box
        spacing={2}
        className={"bat-tile-middle"}
        baselinePosition={Gtk.BaselinePosition.CENTER}
      >
        <box className={"battery-cell"} />

        <box
          setup={(self) => {
            self.hook(capacity, () =>
              self.toggleClassName(
                capacity.get() >= 30 ? "battery-cell" : "battery-cell-empty",
                true,
              ),
            );
          }}
        />

        <box
          setup={(self) => {
            self.hook(capacity, () =>
              self.toggleClassName(
                capacity.get() >= 50 ? "battery-cell" : "battery-cell-empty",
                true,
              ),
            );
          }}
        />

        <box
          setup={(self) => {
            self.hook(capacity, () =>
              self.toggleClassName(
                capacity.get() >= 70 ? "battery-cell" : "battery-cell-empty",
                true,
              ),
            );
          }}
        />
        <box
          setup={(self) => {
            self.hook(capacity, () =>
              self.toggleClassName(
                capacity.get() >= 90 ? "battery-cell" : "battery-cell-empty",
                true,
              ),
            );
          }}
        />
      </box>
      <box className={"bat-tile-lower"}>
        <box spacing={10} className={"battery-decs"}>
          <Icon className={"battery-dec"} icon={"stars"} />
          <Icon className={"battery-dec"} icon={"wormhole"} />
          <Icon className={"battery-dec"} icon={"world"} />
        </box>
      </box>
    </box>
  );
}
