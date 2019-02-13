const LocalStorage = window.localStorage;
const STATS_STORAGE_KEY = "neonate-stats";

const initialStats = {
  healthMax: 5,
  healthSuperficial: 0,
  healthAggravated: 0,

  willpowerMax: 5,
  willpowerSuperficial: 0,
  willpowerAggravated: 0,

  hunger: 0,

  humanityMax: 7,
  stains: 0,

  isEditingMax: false
};

const getStats = () => {
  const statsString = LocalStorage.getItem(STATS_STORAGE_KEY);

  return statsString
    ? { ...initialStats, ...JSON.parse(statsString) }
    : initialStats;
};

const setStats = stats => {
  const statsString = JSON.stringify(stats);

  LocalStorage.setItem(STATS_STORAGE_KEY, statsString);
};

export default {
  getStats,
  setStats
};
