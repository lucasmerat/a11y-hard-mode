export const LEVELS_IDS = {
  LEVEL_1: 'level1',
  LEVEL_2: 'level2',
  LEVEL_3: 'level3',
} as const;

export const NEXT_LEVEL_ROUTES = {
  level1: '/levels/2',
  level2: '/levels/3',
  level3: '/results',
} as const;

export const LEVEL_TIME_LIMIT = 30000;