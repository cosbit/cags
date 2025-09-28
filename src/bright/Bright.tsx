import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";
import Utils from "resource:///com/github/Aylur/ags/utils.js";

const brightness = Variable(0, {
  // poll every 2s
  poll: [
    2000,
    "brightnessctl g",
    (out) => {
      const max = Number(Utils.exec("brightnessctl m"));
      return Number(out) / max;
    },
  ],
});

const Bright = () =>
  Widget.Box({
    vertical: true,
    className: "wide-container light",
    children: [
      Widget.Box({
        className: "bright-sec-upper",
        children: [
          Widget.Label({
            className: "message",
            label: "be careful *~*",
          }),
          Widget.Icon({
            className: "bright-dec-a",
            icon: "ray",
          }),
        ],
      }),
      Widget.Box({
        className: "bright-sec-middle",
      }),
      Widget.Box({
        className: "bright-sec-lower",
        children: [
          Widget.Overlay({
            className: "bright-overlay",
            child: Widget.Slider({
              hexpand: true,
              draw_value: false,
              min: 0.05,
              max: 1,
              value: brightness.bind(),
              on_change: ({ value }) => {
                Utils.execAsync(`brightnessctl s ${value * 100}% -q`).catch(
                  print,
                );
              },
            }),
            overlays: [
              Widget.Icon({
                className: "bright-icon",
                hpack: "start",
                icon: "eye",
              }),
            ],
          }),
        ],
      }),
    ],
  });

export default Bright;