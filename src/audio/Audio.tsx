import { Variable } from "astal";
import { exec } from "astal/process";
import { Icon, Overlay, Slider } from "astal/gtk3/widget";

export default function Audio() {
  return (
    <box vertical className={"long-container dark"}>
      <box className={"audio-tile-upper"}>
        <Icon className={"audio-fruit"} icon={"trace"} />
        <box vertical hexpand className={"audio-desc"}>
          <label label={"never meant"} />
          <label label={"firefox"} />
        </box>
      </box>
      <box className={"audio-tile-middle"}></box>
      <box className={"audio-tile-lower"}></box>
    </box>
  );
}
