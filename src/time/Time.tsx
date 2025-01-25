import { Variable } from "astal";
import { Icon } from "astal/gtk3/widget";

const hour = Variable<string>("").poll(
  1000,
  "date +'%I'",
  (out: string, prev: string) => out,
);

const minute = Variable<string>("").poll(
  1000,
  "date +'%M'",
  (out: string, prev: string) => out,
);

export default function Time() {
  return (
    <box vertical className={"tile-container dark"}>
      <box className={"time-tile-upper"}>
        <label className={"time-var"} label={hour()} />
      </box>
      <box className={"time-tile-middle"}>
        <Icon className={"time-dec"} icon={"asterisk"} />
        <Icon className={"time-dec"} icon={"sphere"} />
        <Icon className={"time-dec"} icon={"vault"} />
      </box>
      <box className={"time-tile-lower"}>
        <label className={"time-var"} label={minute()} />
      </box>
    </box>
  );
}
