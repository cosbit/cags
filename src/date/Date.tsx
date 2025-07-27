import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { Icon } from "astal/gtk3/widget";

// const date_full = exec(`date +'%D'`);
// const date_day = exec(`date +'%A'`);
// const date_month = exec(`date +'%B'`);

const date_full = Variable<string>("").poll(
  60000,
  "date +'%D'",
  (out: string, prev: string) => out,
);

const date_day = Variable<string>("").poll(
  60000,
  "date +'%A'",
  (out: string, prev: string) => out,
);

const date_month = Variable<string>("").poll(
  60000,
  "date +'%B'",
  (out: string, prev: string) => out,
);

export default function Date() {
  return (
    <box vertical className={"tile-container light date-container"}>
      <box>
        <label
          truncate
          hexpand
          label={date_full()}
          className={"date-full"}
          halign={Gtk.Align.START}
        />
        <Icon className={"date-fruit"} icon={"squares"} />
      </box>

      <box>
        <label truncate hexpand label={date_day()} className={"date-day"} />
      </box>
      <centerbox className={"date-dec"}>
        <Icon className={"date-deco"} icon={"join"} />
        <Icon className={"date-deco"} icon={"target"} />
        <Icon className={"date-deco"} icon={"teardrops"} />
      </centerbox>
      <box>
        <label truncate hexpand label={date_month()} className={"date-month"} />
      </box>
    </box>
  );
}
