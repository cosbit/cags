import { Variable } from "astal";
import { exec } from "astal/process";
import { Gtk } from "astal/gtk3";
import { Icon, Overlay, Slider } from "astal/gtk3/widget";
import { bind, Subscribable } from "astal/binding";

/**
 * Initialize brightness
 * 
 * using brightnessctl
 * 
 */

const execstr = exec(`brightnessctl get -d amdgpu_bl1`);
const brightint = parseInt(execstr);
const asdiv = (brightint/255) * 100;
const asperc = Math.round(asdiv);

const brightness = Variable(asperc);

brightness.subscribe((value: number) => {
    let rounded = Math.round(value);
    exec(`brightnessctl set -d amdgpu_bl1 ${value}%`);

})

export default function Bright(){
    return (
        <box vertical className={"wide-container light"}>
            <box className={"bright-sec-upper"}>
                <label className={"message"} label={"be careful *~*"}/>
                <Icon className={"bright-dec-a"} icon={"ray"}/>
            </box>
            <box className={"bright-sec-middle"}>
                
            </box>
            <box className={"bright-sec-lower"}>
                <Overlay
                    className={"bright-overlay"}
                    child={
                    <Slider
                        hexpand
                        draw_value={false}
                        min={5}
                        max={100}
                        value={asperc}
                        onDragged={(self) => brightness.set(self.value)}
                    />
                    }
                    overlay={
                    <Icon
                        className={"bright-icon"}
                        halign={Gtk.Align.START}
                        icon="eye"
                    />
                    }
                />
            </box>

        </box>
    )
}