import * as migration_20261013_052051_initial from './20261013_052051_initial';
import * as migration_20261019_011429_media_prefix from './20261019_011429_media_prefix';
import * as migration_20261019_033943_publication_services_tools from './20261019_033943_publication_services_tools';
import * as migration_20261019_045923_site_share_image from './20261019_045923_site_share_image';
import * as migration_20261019_055458_user_preview_role from './20261019_055458_user_preview_role';
import * as migration_20261019_075305_site_cookie_consent from './20261019_075305_site_cookie_consent';
import * as migration_20261019_083318_draft_autosave from './20261019_083318_draft_autosave';
import * as migration_20261020_040226_media_folders from './20261020_040226_media_folders';

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
    name: '20261019_045923_site_share_image',
  },
  {
    up: migration_20261019_055458_user_preview_role.up,
    down: migration_20261019_055458_user_preview_role.down,
    name: '20261019_055458_user_preview_role',
  },
  {
    up: migration_20261019_075305_site_cookie_consent.up,
    down: migration_20261019_075305_site_cookie_consent.down,
    name: '20261019_075305_site_cookie_consent',
  },
  {
    up: migration_20261019_083318_draft_autosave.up,
    down: migration_20261019_083318_draft_autosave.down,
    name: '20261019_083318_draft_autosave',
  },
  {
    up: migration_20261020_040226_media_folders.up,
    down: migration_20261020_040226_media_folders.down,
    name: '20261020_040226_media_folders'
  },
];
