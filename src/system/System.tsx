import { exec } from "astal/process";
import { Button, Icon } from "astal/gtk3/widget";

export default function System() {
  return (
    <box vertical className={"tile-container dark system-container"}>
      <Button
        onClicked={() => exec("shutdown now")}
        className={"round-button btn-1"}
      >
        <Icon class="system-icon " icon={"x"} />
      </Button>
      <Button onClicked={() => exec("hyprlock")}
        className={"round-button btn-2"}
      >
        <Icon class="system-icon icon-2" icon={"vault"} />
      </Button>
      <Button
        onClicked={() => exec("systemctl suspend")}
        className={"round-button btn-3"}
      >
        <Icon class="system-icon icon-3" icon={"saturn"} />
      </Button>
    </box>
  );
}