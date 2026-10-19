import * as migration_20261013_052051_initial from './20261013_052051_initial';
import * as migration_20261019_011429_media_prefix from './20261019_011429_media_prefix';
import * as migration_20261019_033943_publication_services_tools from './20261019_033943_publication_services_tools';
import * as migration_20261019_045923_site_share_image from './20261019_045923_site_share_image';

export const migrations = [
  {
    up: migration_20261013_052051_initial.up,
    down: migration_20261013_052051_initial.down,
    name: '20261013_052051_initial',
  },
  {
    up: migration_20261019_011429_media_prefix.up,
    down: migration_20261019_011429_media_prefix.down,
    name: '20261019_011429_media_prefix',
  },
  {
    up: migration_20261019_033943_publication_services_tools.up,
    down: migration_20261019_033943_publication_services_tools.down,
    name: '20261019_033943_publication_services_tools',
  },
  {
    up: migration_20261019_045923_site_share_image.up,
    down: migration_20261019_045923_site_share_image.down,
    name: '20261019_045923_site_share_image'
  },
];
