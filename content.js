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

function cleanUrl(urlStr, settings) {
  try {
    const url = new URL(urlStr);
    const params = url.searchParams;
    let changed = false;

    const activeParams = new Set();
    if (settings.ads) addToSet(activeParams, PARAMS.ads);
    if (settings.social) addToSet(activeParams, PARAMS.social);
    if (settings.analytics) addToSet(activeParams, PARAMS.analytics);
    if (settings.misc) addToSet(activeParams, PARAMS.misc);

    for (const param of activeParams) {
      if (params.has(param)) {
        params.delete(param);
        changed = true;
      }
    }

    if (changed) {
      return url.toString();
    }
  } catch (e) {
  }
  return null;
}

function addToSet(target, source) {
  for (const item of source) target.add(item);
}

document.addEventListener('copy', (event) => {
  const selection = document.getSelection();
  const text = selection.toString();

  if (!text) return;

  chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
    if (!settings.active) return;

    const cleaned = cleanUrl(text, settings);

    if (cleaned) {
      event.clipboardData.setData('text/plain', cleaned);
      event.preventDefault();

      chrome.storage.local.get({ cleanedCount: 0 }, (data) => {
        chrome.storage.local.set({ cleanedCount: data.cleanedCount + 1 });
      });
    }
  });
});
