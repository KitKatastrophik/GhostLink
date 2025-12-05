const TRACKING_PARAMS = new Set([
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'utm_id', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic',
    'gclid', 'gclsrc', 'dclid', 'wbraid', 'gbraid', '_gl', '_ga', 'gtm-debug',
    'fbclid', 'igsh', 'igshid',
    'is_from_webapp', 'sender_device',
    'msclkid',
    'twclkd',
    'li_fat_id',
    'epik',
    'si',
    '_hsenc', '_hsmi',
    'mc_eid', 'mc_cid',
    'pk_campaign', 'pk_kwd', 'mtm_campaign', 'mtm_keyword', 'mtm_source',
    'mtm_medium', 'mtm_content', 'mtm_cid', 'mtm_group', 'mtm_placement',
    'yclid', '_openstat',
    'ref', 'referrer', 'source', 'share_id', 'campaign_id', 'vero_id',
    'WT.nav', 'WT.mc_id', 'wprov', 'hootPostID', 'customid',
    '__s', 'sourceid', 'emci', 'emdi', 'ceid',
    's_kwcid', 'oly_enc_id', 'oly_anon_id',
    'rb_clickid',
    'soc_src', 'soc_trk',
    'irclickid',
    'aff_id', 'aff_sub', 'aff_sub2', 'aff_sub3', 'aff_sub4', 'aff_sub5'
]);

function cleanUrl(urlStr) {
    try {
        const url = new URL(urlStr);
        const params = url.searchParams;
        let changed = false;

        for (const param of TRACKING_PARAMS) {
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

const originalWriteText = navigator.clipboard.writeText;

navigator.clipboard.writeText = async function (text) {
    if (typeof text === 'string') {
        const cleaned = cleanUrl(text);
        if (cleaned) {
            text = cleaned;
        }
    }
    return originalWriteText.apply(this, [text]);
};
