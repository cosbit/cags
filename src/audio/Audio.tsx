import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Gtk from "gi://Gtk?version=3.0";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";

const AudioComp = () =>
  Widget.Box({
    vertical: true,
    className: "wide-container dark",
    children: [
      Widget.Box({
        className: "audio-tile-upper",
        children: [
          Widget.Icon({ className: "audio-fruit", icon: "trace" }),
          Widget.Box({
            vertical: true,
            hexpand: true,
            className: "audio-desc",
            children: [
              Widget.Label({ label: "fuck you" }),
              Widget.Label({ label: "dolby digital" }),
            ],
          }),
        ],
      }),
      Widget.Box({
        className: "audio-tile-middle",
        children: [
          Widget.Overlay({
            className: "audio-overlay",
            child: Widget.Slider({
              hexpand: true,
              draw_value: false,
              on_change: ({ value }) => (Audio.speaker.volume = value),
              setup: (self) =>
                self.hook(
                  Audio.speaker,
                  () => {
                    self.value = Audio.speaker.volume || 0;
                  },
                  "speaker-changed",
                ),
            }),
            overlays: [
              Widget.Icon({
                className: "audio-icon",
                hpack: "start",
                icon: "saturn",
              }),
            ],
          }),
        ],
      }),
      Widget.Box({
        className: "audio-tile-lower",
      }),
    ],
  });

export default AudioComp;