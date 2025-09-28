import { exec } from "astal/process";
import { Button, Icon } from "astal/gtk3/widget";

export default function System() {
  return (
    <box horizontal className={"tile-container dark system"}>
      <Button
        onClicked={() => exec("shutdown now")}
        className={"round-button"}
      >
        <Icon icon={"x"} />
      </Button>
      <Button onClicked={() => exec("hyprlock")}
        className={"round-button"}
      >
        <Icon icon={"vault"} />
      </Button>
      <Button
        onClicked={() => exec("systemctl suspend")}
        className={"round-button"}
      >
        <Icon icon={"saturn"} />
      </Button>
    </box>
  );
}