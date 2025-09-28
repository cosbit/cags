import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";
import Utils from "resource:///com/github/Aylur/ags/utils.js";
import Gtk from "gi://Gtk?version=3.0";

const date = Variable("", {
  // poll every minute
  poll: [60000, "date"],
});

const DateComp = () =>
  Widget.Box({
    vertical: true,
    className: "tile-container light date-container",
    children: [
      Widget.Box({
        children: [
          Widget.Label({
            truncate: "end",
            hexpand: true,
            className: "date-full",
            hpack: "start",
            label: date.bind().transform((d) => {
              return Utils.exec(`date -d "${d}" +'%D'`);
            }),
          }),
          Widget.Icon({ className: "date-fruit", icon: "squares" }),
        ],
      }),
      Widget.Box({
        children: [
          Widget.Label({
            truncate: "end",
            hexpand: true,
            className: "date-day",
            label: date.bind().transform((d) => {
              return Utils.exec(`date -d "${d}" +'%A'`);
            }),
          }),
        ],
      }),
      Widget.CenterBox({
        className: "date-dec",
        start_widget: Widget.Icon({
          className: "date-deco",
          icon: "join",
        }),
        center_widget: Widget.Icon({
          className: "date-deco",
          icon: "target",
        }),
        end_widget: Widget.Icon({
          className: "date-deco",
          icon: "teardrops",
        }),
      }),
      Widget.Box({
        children: [
          Widget.Label({
            truncate: "end",
            hexpand: true,
            className: "date-month",
            label: date.bind().transform((d) => {
              return Utils.exec(`date -d "${d}" +'%B'`);
            }),
          }),
        ],
      }),
    ],
  });

export default DateComp;