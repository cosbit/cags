import Widget from "resource:///com/github/Aylur/ags/widget.js";

const Art = () =>
  Widget.Box({
    className: "art-container long-container",
    child: Widget.Icon({
      className: "art-icon",
      icon: "jwav",
    }),
  });

export default Art;