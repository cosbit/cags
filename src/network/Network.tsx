import { Variable, execAsync, bind } from "astal";
import { Icon, Switch } from "astal/gtk3/widget";

// Helper function to execute and parse command outputs
async function getNetworkInfo(command: string): Promise<string> {
  try {
    const output = await execAsync(command);
    return output.trim();
  } catch (error) {
    // Don't log error for commands that are expected to fail when disconnected
    if (!command.startsWith("iw dev wlan0 link") && !command.startsWith("iwgetid -r")) {
        console.error(`Error executing command: ${command}`, error);
    }
    return "N/A";
  }
}

export default function Network() {
  // --- DYNAMIC DATA ---
  const ipAddress = new Variable("Loading...");
  const ssid = new Variable("Loading...");
  const band = new Variable("Loading...");
  const bandwidth = new Variable("Loading...");
  const signal = new Variable("Loading...");
  const security = new Variable("Loading...");
  const wifiState = new Variable(true); // Assuming wifi is on by default

  const updateNetworkInfo = async () => {
    // Check if wifi is enabled first
    const state = await getNetworkInfo("nmcli radio wifi");
    if (state === 'disabled') {
        wifiState.setValue(false);
        ipAddress.setValue("Disabled");
        ssid.setValue("Disabled");
        band.setValue("Disabled");
        bandwidth.setValue("Disabled");
        signal.setValue("Disabled");
        security.setValue("Disabled");
        return;
    }
    wifiState.setValue(true);

    const ipInfo = await getNetworkInfo("ip -4 addr show wlan0 | grep -oP 'inet \\K[\\d.]+\\/\\d+'");
    ipAddress.setValue(ipInfo || "N/A");

    const ssidInfo = await getNetworkInfo("iwgetid -r");
    ssid.setValue(ssidInfo || "Not Connected");

    if (ssidInfo && ssidInfo !== "Not Connected" && ssidInfo !== "N/A") {
      const linkInfo = await getNetworkInfo("iw dev wlan0 link");

      const freqMatch = linkInfo.match(/freq: (\d+)/);
      if (freqMatch) {
          const freq = parseInt(freqMatch[1], 10);
          band.setValue(freq > 5000 ? "5 GHz" : "2.4 GHz");
      } else {
          band.setValue("N/A");
      }

      const bitrateMatch = linkInfo.match(/tx bitrate: ([\d.]+ MBit\/s)/);
      bandwidth.setValue(bitrateMatch ? bitrateMatch[1] : "N/A");

      const signalMatch = linkInfo.match(/signal: (-?\d+ dBm)/);
      signal.setValue(signalMatch ? signalMatch[1] : "N/A");
    } else {
        band.setValue("N/A");
        bandwidth.setValue("N/A");
        signal.setValue("N/A");
    }

    // For security, we can check nmcli
    const activeConnection = await getNetworkInfo("nmcli -t -f NAME,DEVICE connection show --active | grep wlan0 | cut -d: -f1");
    if (activeConnection && activeConnection !== "N/A") {
        const secInfo = await getNetworkInfo(`nmcli -t -f 802-11-wireless-security.key-mgmt connection show "${activeConnection}"`);
        security.setValue(secInfo || "Unknown");
    } else {
        security.setValue("N/A");
    }
  };

  // --- WIFI TOGGLE ---
  const toggleWifi = () => {
    const newState = !wifiState.getValue();
    execAsync(`nmcli radio wifi ${newState ? "on" : "off"}`).then(() => {
      wifiState.setValue(newState);
      // After toggling, wait a bit for the state to settle before updating
      setTimeout(updateNetworkInfo, 1000);
    });
  };

  // Update info every 5 seconds
  const interval = setInterval(updateNetworkInfo, 5000);
  updateNetworkInfo(); // Initial call

  // A proper implementation would clear the interval when the widget is destroyed.
  // Astal might not expose this for non-window elements.
  // For now, we assume the sidebar is persistent and doesn't get destroyed.

  return (
    <box vertical className={"wide-container dark network-tile"}>
      <box>
        <label hexpand={true} label={bind(ssid)} />
        <Switch active={bind(wifiState)} on-activate={toggleWifi} />
      </box>
      <box>
        <Icon iconName="network-wired-symbolic" />
        <label label={bind(ipAddress)} />
        <box hexpand={true} />
        <Icon iconName="speedometer-symbolic" />
        <label label={bind(bandwidth)} />
      </box>
      <box>
        <label label={bind(band)} />
        <box hexpand={true} />
        <Icon iconName="wifi-symbolic" />
        <label label={bind(signal)} />
        <box hexpand={true} />
        <Icon iconName="lock-symbolic" />
        <label label={bind(security)} />
      </box>
    </box>
  );
}