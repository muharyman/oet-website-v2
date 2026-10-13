# CMS deployment — VPS with Docker

The CMS runs on one VPS as three containers defined in `cms/docker-compose.production.yml`: Postgres 16, the Payload app (Next standalone build from `cms/Dockerfile`) and Caddy, which terminates HTTPS with an automatic Let's Encrypt certificate. Database, media and certificates live in named Docker volumes.

Verified locally on 2026-10-13 with Docker 29.1 and Compose 2.40: image build, automatic migration on an empty database, seed, REST API, admin login page and media files. Caddy and the certificate were not exercised; they need the real domain.

## Requirements

- A VPS with current Docker Engine and the Compose plugin (`docker compose version`), 2 GB RAM or more. The image build needs about 3 GB of memory; add swap on a smaller machine or build elsewhere.
- A DNS record for the CMS host name (for example `cms.openenergytransition.org`) pointing at the VPS, and ports 80 and 443 open.

## First deployment

```bash
git clone <repository> && cd <repository>/cms
cp .env.production.example .env.production      # then fill it in
docker compose --env-file .env.production -f docker-compose.production.yml up -d --build
```

`.env.production`:

| Variable | Value |
| --- | --- |
| `CMS_DOMAIN` | Host name of the CMS, without scheme |
| `DB_PASSWORD` | Database password; letters and digits only, it is placed in a connection URL |
| `PAYLOAD_SECRET` | Long random string; changing it invalidates sessions and API keys |
| `WEB_URL` | Origin of the public site, allowed by CORS |
| `WEB_DEPLOY_HOOK_URL` | Vercel deploy hook; empty until it exists |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | First admin user, created by the seed |

The app applies pending database migrations when it starts. Then create the admin user and, if wanted, the Figma content:

```bash
docker compose --env-file .env.production -f docker-compose.production.yml --profile tools run --rm seed
```

`SEED_AREAS=core` in that command's environment (`run --rm -e SEED_AREAS=core seed`) creates only the admin user. The seed is idempotent, but it overwrites seeded documents with the Figma content, so do not run the content areas again once editors have changed them.

## Connecting the website

In the Vercel project of `web/`:

- Set `PAYLOAD_URL` to `https://<CMS_DOMAIN>` for production and preview. Every build reads all content and downloads all media from it.
- Create a deploy hook for the production branch and put its URL in `WEB_DEPLOY_HOOK_URL` on the VPS, then restart the app (`up -d`). Publishing in the CMS then rebuilds the site after 30 quiet seconds.

## Updating

```bash
git pull
docker compose --env-file .env.production -f docker-compose.production.yml up -d --build
```

New migrations run on start. A schema change must be committed with its migration (`pnpm migrate:create <name>` in development), otherwise production starts with the old tables.

## Backups

```bash
docker compose --env-file .env.production -f docker-compose.production.yml exec -T database \
  pg_dump -U payload oet_cms | gzip > oet_cms-$(date +%F).sql.gz
docker run --rm -v oet-cms-production_media:/media -v "$PWD":/backup alpine \
  tar czf /backup/media-$(date +%F).tar.gz -C /media .
```

Both are needed: the database references media by file name. No backup schedule is set up yet.

## Not covered yet

- Outgoing email (password reset): Payload has no email adapter configured and logs the message instead.
- Rate limiting and spam protection for the public `form-submissions` endpoint.
- Monitoring and scheduled backups.
