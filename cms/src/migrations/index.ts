import * as migration_20261013_052051_initial from './20261013_052051_initial';

export const migrations = [
  {
    up: migration_20261013_052051_initial.up,
    down: migration_20261013_052051_initial.down,
    name: '20261013_052051_initial'
  },
];
