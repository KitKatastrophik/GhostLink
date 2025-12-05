const PARAMS = {
    ads: new Set([
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
        'utm_id', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic',
        'gclid', 'gclsrc', 'dclid', 'wbraid', 'gbraid', '_gl', '_ga', 'gtm-debug',
        'msclkid', 'twclkd', 'yclid', '_openstat', 's_kwcid', 'oly_enc_id', 'oly_anon_id',
        'rb_clickid', 'irclickid', 'aff_id', 'aff_sub', 'aff_sub2', 'aff_sub3', 'aff_sub4', 'aff_sub5'
    ]),
    social: new Set([
        'fbclid', 'igsh', 'igshid', 'is_from_webapp', 'sender_device', 'li_fat_id', 'epik',
        'share_id', 'soc_src', 'soc_trk'
    ]),
    analytics: new Set([
        'si', '_hsenc', '_hsmi', 'mc_eid', 'mc_cid',
        'pk_campaign', 'pk_kwd', 'mtm_campaign', 'mtm_keyword', 'mtm_source',
        'mtm_medium', 'mtm_content', 'mtm_cid', 'mtm_group', 'mtm_placement'
    ]),
    misc: new Set([
        'ref', 'referrer', 'source', 'campaign_id', 'vero_id',
        'WT.nav', 'WT.mc_id', 'wprov', 'hootPostID', 'customid',
        '__s', 'sourceid', 'emci', 'emdi', 'ceid'
    ])
};

const DEFAULT_SETTINGS = {
    active: true,
    ads: true,
    social: true,
    analytics: true,
    misc: true
};

const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
const manualInput = document.getElementById('manualInput');
const cleanBtn = document.getElementById('cleanBtn');
const resultArea = document.getElementById('resultArea');
const cleanedOutput = document.getElementById('cleanedOutput');
const copyBtn = document.getElementById('copyBtn');
const statsCount = document.getElementById('statsCount');

const toggleGlobal = document.getElementById('toggleGlobal');
const toggleAds = document.getElementById('toggleAds');
const toggleSocial = document.getElementById('toggleSocial');
const toggleAnalytics = document.getElementById('toggleAnalytics');
const toggleMisc = document.getElementById('toggleMisc');

document.addEventListener('DOMContentLoaded', async () => {
    loadSettings();
    loadStats();
    setupTabs();
    setupCleaner();
    setupSettingsListeners();
});

function setupTabs() {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

async function loadSettings() {
    const data = await chrome.storage.sync.get(DEFAULT_SETTINGS);

    toggleGlobal.checked = data.active;
    toggleAds.checked = data.ads;
    toggleSocial.checked = data.social;
    toggleAnalytics.checked = data.analytics;
    toggleMisc.checked = data.misc;
}

function setupSettingsListeners() {
    const save = () => {
        const settings = {
            active: toggleGlobal.checked,
            ads: toggleAds.checked,
            social: toggleSocial.checked,
            analytics: toggleAnalytics.checked,
            misc: toggleMisc.checked
        };
        chrome.storage.sync.set(settings);
    };

    toggleGlobal.addEventListener('change', save);
    toggleAds.addEventListener('change', save);
    toggleSocial.addEventListener('change', save);
    toggleAnalytics.addEventListener('change', save);
    toggleMisc.addEventListener('change', save);
}

async function loadStats() {
    const data = await chrome.storage.local.get({ cleanedCount: 0 });
    statsCount.textContent = data.cleanedCount;
}

function setupCleaner() {
    cleanBtn.addEventListener('click', () => {
        const text = manualInput.value;
        if (!text) return;

        const cleaned = cleanUrl(text);

        if (cleaned && cleaned !== text) {
            cleanedOutput.textContent = cleaned;
            resultArea.classList.remove('hidden');
            incrementStats();
        } else {
            cleanedOutput.textContent = cleaned || "Invalid URL or no params found";
            resultArea.classList.remove('hidden');
        }
    });

    copyBtn.addEventListener('click', () => {
        const text = cleanedOutput.textContent;
        if (text) {
            navigator.clipboard.writeText(text);
            copyBtn.textContent = '✅';
            setTimeout(() => copyBtn.textContent = '📋', 1500);
        }
    });
}

function cleanUrl(urlStr) {
    try {
        const url = new URL(urlStr);
        const params = url.searchParams;
        let changed = false;

        const activeParams = new Set();
        if (toggleAds.checked) addToSet(activeParams, PARAMS.ads);
        if (toggleSocial.checked) addToSet(activeParams, PARAMS.social);
        if (toggleAnalytics.checked) addToSet(activeParams, PARAMS.analytics);
        if (toggleMisc.checked) addToSet(activeParams, PARAMS.misc);

        for (const param of activeParams) {
            if (params.has(param)) {
                params.delete(param);
                changed = true;
            }
        }

        return url.toString();
    } catch (e) {
        return null;
    }
}

function addToSet(target, source) {
    for (const item of source) target.add(item);
}

function incrementStats() {
    chrome.storage.local.get({ cleanedCount: 0 }, (data) => {
        const newCount = data.cleanedCount + 1;
        chrome.storage.local.set({ cleanedCount: newCount });
        statsCount.textContent = newCount;
    });
}
