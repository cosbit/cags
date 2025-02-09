import { exec } from "astal/process";
import { Gtk } from "astal/gtk3";

const date_full = exec(`date +'%D'`);
const date_day  = exec(`date +'%A'`);
const date_month= exec(`date +'%B'`);


export default function Date() {
    return (
        <box vertical className={"tile-container light date-container"}>
           <box>
            <label
                truncate
                hexpand
                label={date_full}
                className={"date-full"}
                halign={Gtk.Align.START}
            />
           </box>
            
           <box>
            <label
                truncate
                hexpand
                label={date_day}
                className={"date-day"}
            />
           </box>
           <box>
            <label
                truncate
                hexpand
                label={date_month}
                className={"date-month"}
            />
           </box>
        </box>
    )
}