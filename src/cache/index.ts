import NodeCache from "node-cache"
export const CACHE = new NodeCache({ stdTTL: 60, checkperiod: 120 });

