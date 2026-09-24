## Agent skills

### Issue tracker

Issues and specs are tracked in this repository's GitHub Issues. See `docs/agents/issue-tracker.md`.

### Ticket delivery

For work tied to a GitHub issue, create a dedicated branch from `main` before editing. Commit the work on that branch, push it, and open a pull request targeting `main` with `Closes #<issue-number>` in the PR body. Keep ticket commits off `main`.

### Triage labels

Uses a compact `status:` and `type:` label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

Uses a single-context layout (`CONTEXT.md` and root `docs/adr/`). See `docs/agents/domain.md`.
