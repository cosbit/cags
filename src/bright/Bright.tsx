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

function getBrightnessDevice(): string {
    try {
        const devicesOutput = exec('brightnessctl --list');
        if (devicesOutput.includes('amdgpu_bl1')) {
            return 'amdgpu_bl1';
        }
    } catch (e) {
        // If brightnessctl is not found or fails, it will throw.
        // We'll just fall through and use the fallback.
        console.log("Could not find amdgpu_bl1, falling back to input22::kana.");
    }
    return 'input22::kana';
}

const device = getBrightnessDevice();

const execstr = exec(`brightnessctl get -d ${device}`);
const brightint = parseInt(execstr);

const maxBrightStr = exec(`brightnessctl get-max -d ${device}`);
const maxBrightInt = parseInt(maxBrightStr);

const asdiv = maxBrightInt > 0 ? (brightint / maxBrightInt) * 100 : 0;
const asperc = Math.round(asdiv);

const brightness = Variable(asperc);

brightness.subscribe((value: number) => {
    let rounded = Math.round(value);
    exec(`brightnessctl set -d ${device} ${value}%`);
});

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