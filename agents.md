# Agents

## architect
Responsible for tech stack decisions, folder structure, and system design.
Understands the full project scope and makes trade-off decisions.

## frontend-dev
Implements React components, Tailwind styling, and animations.
Follows the design system defined in `design-tokens.md`.
Never introduces new dependencies without updating `package.json` and this file.

## content-editor
Writes and edits all copy: hero text, project descriptions, about section, meta tags.
Keeps tone consistent: confident, concise, human. No buzzwords.

## reviewer
Reviews PRs for accessibility (a11y), performance, and consistency with the design system.
Runs Lighthouse checks and flags regressions.
