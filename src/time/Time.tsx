import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";
import Utils from "resource:///com/github/Aylur/ags/utils.js";

const time = Variable("", {
  // poll every second
  poll: [1000, "date"],
});

const Time = () =>
  Widget.Box({
    vertical: true,
    className: "tile-container dark",
    children: [
      Widget.Box({
        className: "time-tile-upper",
        children: [
          Widget.Label({
            className: "time-var",
            label: time.bind().transform((t) => {
              return Utils.exec(`date -d "${t}" +'%I'`);
            }),
          }),
        ],
      }),
      Widget.Box({
        className: "time-tile-middle",
        children: [
          Widget.Icon({ className: "time-dec", icon: "asterisk" }),
          Widget.Icon({ className: "time-dec", icon: "sphere" }),
          Widget.Icon({ className: "time-dec", icon: "vault" }),
        ],
      }),
      Widget.Box({
        className: "time-tile-lower",
        children: [
          Widget.Label({
            className: "time-var",
            label: time.bind().transform((t) => {
              return Utils.exec(`date -d "${t}" +'%M'`);
            }),
          }),
        ],
      }),
    ],
  });

export default Time;