import { Variable } from "astal";
import { exec } from "astal/process";
import { Gtk } from "astal/gtk3";
import { Icon, Overlay, Slider } from "astal/gtk3/widget";
import { bind, Subscribable } from "astal/binding";

/**
 * Initialize Volume
 * 
 * Get from pactl sink
 * It returns left and right, we have to get either of them.
 * Then convert to int -> this is the current volume as int
 * We initialize volume to be set to that int.
 * 
*/
const execstr = exec(`pactl get-sink-volume @DEFAULT_SINK@`);
const match = execstr.match(/(\d+)%/);
const volumeint = match ? parseInt(match[1], 10) : 0;

const volume = Variable(volumeint);

volume.subscribe((value: number) => {
  let rounded = Math.round(value);
  exec(`pactl set-sink-volume @DEFAULT_SINK@ ${value}%`);
});

export default function Audio() {
  return (
    <box vertical className={"wide-container dark"}>
      <box className={"audio-tile-upper"}>
        <Icon className={"audio-fruit"} icon={"trace"} />
        <box vertical hexpand className={"audio-desc"}>
          <label label={"fuck you"} />
          <label label={"dolby digital"} />
        </box>
      </box>
      <box className={"audio-tile-middle"}>
        <Overlay
          className={"audio-overlay"}
          child={
            <Slider
              hexpand
              draw_value={false}
              min={0}
              max={100}
              value={volumeint}
              onDragged={(self) => volume.set(self.value)}
            />
          }
          overlay={
            <Icon
              className={"audio-icon"}
              halign={Gtk.Align.START}
              icon="saturn"
            />
          }
        />
      </box>
      <box className={"audio-tile-lower"}></box>
    </box>
  );
}
