import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Gtk from "gi://Gtk?version=3.0";
import Battery from "resource:///com/github/Aylur/ags/service/battery.js";

const BatteryTile = () =>
  Widget.Box({
    vertical: true,
    className: "tile-container light",
    children: [
      Widget.Box({
        className: "bat-tile-upper",
        children: [
          Widget.Icon({
            className: "battery-img",
            icon: "nuclear",
          }),
          Widget.Label({
            truncate: "end",
            hexpand: true,
            hpack: "end",
            className: "battery-perc",
            label: Battery.bind("percent").transform((p) => `${p}%`),
          }),
        ],
      }),
      Widget.Box({
        spacing: 2,
        className: "bat-tile-middle",
        baseline_position: Gtk.BaselinePosition.CENTER,
        children: [
          Widget.Box({ className: "battery-cell" }),
          Widget.Box({
            className: "battery-cell-empty",
            setup: (self) =>
              self.hook(
                Battery,
                () => {
                  self.toggleClassName("battery-cell", Battery.percent >= 30);
                  self.toggleClassName(
                    "battery-cell-empty",
                    Battery.percent < 30,
                  );
                },
                "notify::percent",
              ),
          }),
          Widget.Box({
            className: "battery-cell-empty",
            setup: (self) =>
              self.hook(
                Battery,
                () => {
                  self.toggleClassName("battery-cell", Battery.percent >= 50);
                  self.toggleClassName(
                    "battery-cell-empty",
                    Battery.percent < 50,
                  );
                },
                "notify::percent",
              ),
          }),
          Widget.Box({
            className: "battery-cell-empty",
            setup: (self) =>
              self.hook(
                Battery,
                () => {
                  self.toggleClassName("battery-cell", Battery.percent >= 70);
                  self.toggleClassName(
                    "battery-cell-empty",
                    Battery.percent < 70,
                  );
                },
                "notify::percent",
              ),
          }),
          Widget.Box({
            className: "battery-cell-empty",
            setup: (self) =>
              self.hook(
                Battery,
                () => {
                  self.toggleClassName("battery-cell", Battery.percent >= 90);
                  self.toggleClassName(
                    "battery-cell-empty",
                    Battery.percent < 90,
                  );
                },
                "notify::percent",
              ),
          }),
        ],
      }),
      Widget.Box({
        className: "bat-tile-lower",
        children: [
          Widget.Box({
            spacing: 10,
            className: "battery-decs",
            children: [
              Widget.Icon({ className: "battery-dec", icon: "stars" }),
              Widget.Icon({ className: "battery-dec", icon: "wormhole" }),
              Widget.Icon({ className: "battery-dec", icon: "world" }),
            ],
          }),
        ],
      }),
    ],
  });

export default BatteryTile;