# Tools needed later

Ideas that need a tool, service or account we don't have yet. Each entry says what it would unlock and what's in place for now.

## Shared progress tracking for a masjid team

- **What it unlocks:** everyone on a masjid's team sees the same "My programs" dashboard, on any device, with changes showing up for everyone. It also enables history (who ticked what, when) and dashboards that compare several mosques.
- **What's needed:** a small hosted database with sign-in. Options include Supabase or Firebase (both have free tiers), or a GitHub-based login if the team already uses GitHub. Someone has to create the account, and we'd need to decide who can see a masjid's data.
- **For now:** progress is saved in each visitor's browser (`localStorage`). The dashboard's **Download backup** and **Load a backup** buttons let a team pass progress between people and devices by file.
- **Logged:** 2026-10-22
