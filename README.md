# GhostLink 👻🔗

**GhostLink** is a privacy-focused browser extension that automatically strips invasive tracking parameters from URLs when you copy them. Keep your links clean and your sharing private.

![GhostLink Icon](icon.png)

## Why GhostLink?
When you share links from sites like YouTube, Instagram, or TikTok, they often attach long strings of tracking data (e.g., `?si=...`, `?igsh=...`, `&fbclid=...`) to monitor who you are and who you share with. GhostLink removes this "digital dust" instantly.

## Features
*   **Auto-Purify**: Automatically cleans links when you copy text or use "Share" buttons on major sites.
*   **Manual Cleaner**: A popup tool to paste and clean links manually.
*   **Granular Control**: Toggle specific categories of trackers on/off in the settings.
*   **Privacy First**: All processing happens locally on your device. No data is sent to any server.

### Supported Platforms & Parameters
GhostLink removes over 50 tracking parameters from these major platforms:

| Platform / Category | Parameters Removed |
|---------------------|-------------------|
| **Google & Analytics** | `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`, `gclid`, `gclsrc`, `dclid`, `_gl`, `_ga` |
| **YouTube & Spotify** | `si` |
| **Facebook & Instagram** | `fbclid`, `igsh`, `igshid` |
| **TikTok** | `is_from_webapp`, `sender_device` |
| **Twitter / X** | `twclkd` |
| **LinkedIn** | `li_fat_id` |
| **Pinterest** | `epik` |
| **Microsoft / Bing** | `msclkid` |
| **Email Marketing** | `mc_eid`, `mc_cid` (Mailchimp), `_hsenc`, `_hsmi` (HubSpot), `vero_id` |
| **Other Analytics** | `pk_*`, `mtm_*` (Matomo), `yclid` (Yandex), `ref`, `referrer` |

## Download
| Browser | Store Link |
|---------|------------|
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" width="24"/> **Chrome** | [Coming Soon](#) |
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" width="24"/> **Firefox** | [Coming Soon](#) |
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" width="24"/> **Edge** | [Coming Soon](#) |
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" width="24"/> **Opera** | [Coming Soon](#) |

## Installation (Developer Mode)
1.  Clone or download this repository.
2.  Open Chrome (or Edge/Brave) and navigate to `chrome://extensions`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the folder containing this project.

## Usage
*   **Just Copy**: Select any link or text containing a link and copy it (Ctrl+C). GhostLink cleans it before it hits your clipboard.
*   **Share Buttons**: Use the "Copy Link" button on YouTube, Instagram, etc. GhostLink intercepts and purifies it.
*   **Popup Menu**: Click the GhostLink icon in your toolbar to:
    *   Manually clean a link.
    *   View how many links you've purified.
    *   Configure which trackers to block.

## Privacy Policy
GhostLink does not collect, store, or transmit any user data. All URL processing is performed locally within your browser.

## License
GNU General Public License v3.0
