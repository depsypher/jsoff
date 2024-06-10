import JavascriptSetDetails = chrome.contentSettings.JavascriptSetDetails;
import Tab = chrome.tabs.Tab;

// eslint-disable-next-line
chrome.tabs.onUpdated.addListener((_) => {
    js(false);
});

// eslint-disable-next-line
chrome.tabs.onActivated.addListener((_) => {
    js(false);
});

// eslint-disable-next-line
chrome.action.onClicked.addListener((_) => {
    js(true);
});

const js = (toggleJs: boolean) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: Tab[]) => {
        const current = tabs[0];

        if (!current || current.url === undefined || current.url.startsWith("chrome")) {
            chrome.action.setIcon({path: "/src/icons/icon48.png"});
            return;
        }
        chrome.contentSettings['javascript'] && chrome.contentSettings['javascript'].get({
            primaryUrl: current.url!,
            incognito: current.incognito
        }, (details: JavascriptSetDetails) => {
            if (toggleJs) {
                const setting = details.setting === 'allow' ? 'block' : 'allow';
                const url = new URL(current.url!);
                const pat = url.protocol + "//" + url.hostname + "/*";
                chrome.contentSettings['javascript'].set({
                    primaryPattern: pat,
                    setting: setting,
                    scope: current.incognito ? 'incognito_session_only' : 'regular'
                }, () => {
                    chrome.tabs.reload({bypassCache: true}).then(() => {
                        chrome.action.setIcon({imageData: getIcon(setting)});
                    });
                });
            } else {
                chrome.action.setIcon({imageData: getIcon(details.setting)});
            }
        });
    });
};

export function getIcon(setting: "allow" | "block") {
    const canvas = new OffscreenCanvas(128, 128)
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = setting === 'allow' ? "green" : "red";
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = "white";
    ctx.font = "100px Impact";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JS", 64, 64);
    return ctx.getImageData(0, 0, 128, 128)
}
