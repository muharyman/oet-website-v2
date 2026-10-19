import * as migration_20261013_052051_initial from './20261013_052051_initial';
import * as migration_20261019_011429_media_prefix from './20261019_011429_media_prefix';

export const migrations = [
  {
    up: migration_20261013_052051_initial.up,
    down: migration_20261013_052051_initial.down,
    name: '20261013_052051_initial',
  },
  {
    up: migration_20261019_011429_media_prefix.up,
    down: migration_20261019_011429_media_prefix.down,
    name: '20261019_011429_media_prefix'
  },
];
