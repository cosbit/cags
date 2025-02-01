import { Variable } from "astal";
import { exec } from "astal/process";
import { CenterBox, Icon, Slider, Switch } from "astal/gtk3/widget";

export default function Network() {
  return (
    <box vertical className={"long-container dark"}>
      <box>
        <label label={"wlan0"}></label>
      </box>
      <box>
        <label label={""}></label>
      </box>
      <box>
        <label label={"poopnet"}></label>
        <label label={"strong"}></label>
        <label label={"192.168.0.1"}></label>
      </box>
    </box>
  );
}
