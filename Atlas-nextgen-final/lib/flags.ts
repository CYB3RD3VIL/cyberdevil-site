const flags = { 'new-dashboard': true, 'editor-ai-experiments': false };
export function isFeatureEnabled(key){ return !!flags[key]; }
export function setFlag(key, val){ flags[key]=!!val; }
export default flags;
