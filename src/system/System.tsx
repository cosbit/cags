import { exec } from "astal/process";
import { Button, Icon } from "astal/gtk3/widget";

export default function System() {
  return (
    <box horizontal className={"tile-container dark system"}>
      <Button
        onClicked={() => exec("shutdown now")}
        className={"round-button"}
      >
        <Icon icon={"src/icons/x.svg"} />
      </Button>
      <Button onClicked={() => exec("hyprlock")}
        className={"round-button"}
      >
        <Icon icon={"src/icons/vault.svg"} />
      </Button>
      <Button
        onClicked={() => exec("systemctl suspend")}
        className={"round-button"}
      >
        <Icon icon={"src/icons/saturn.svg"} />
      </Button>
    </box>
  );
}