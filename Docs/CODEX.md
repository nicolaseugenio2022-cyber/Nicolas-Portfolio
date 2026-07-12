# Codex Instructions for This Portfolio

This file defines how Codex should work inside this portfolio repository.

Read this file before planning, editing, reviewing, or implementing any task.

Also read:

```text
docs/PROJECT_RULES.md
```

For task-specific requirements, read the relevant file inside:

```text
docs/tasks/
```

---

# Repository Purpose

This repository contains Nicolas B. Eugenio's professional developer portfolio.

The portfolio should accurately present his:

- software development skills
- completed projects
- projects currently in development
- technical experience
- contact information
- professional background

The portfolio must remain truthful, responsive, accessible, maintainable, and suitable for job applications.

---

# Working Method

Before modifying code:

1. Inspect the repository structure.
2. Identify the framework and build tools.
3. Inspect the current components, pages, routes, styling, and data files.
4. Read `docs/PROJECT_RULES.md`.
5. Read the requested task specification.
6. Identify the smallest relevant set of files.
7. Form a brief implementation plan.
8. Make the changes.
9. Run validation commands.
10. Review the result against the task requirements.

Do not begin by rewriting the application.

---

# Context Loading

Load only the context required for the current task.

Start with:

- `docs/CODEX.md`
- `docs/PROJECT_RULES.md`
- the relevant task file
- directly related source files
- directly related styles
- directly related assets

Do not inspect unrelated directories unless they are needed to complete or verify the task.

Prefer targeted searches over reading the entire repository.

---

# Current Task Location

Implementation specifications are stored in:

```text
docs/tasks/
```

Example:

```text
docs/tasks/update-project-section.md
```

Task files define what should be implemented.

This file defines how Codex should work.

`docs/PROJECT_RULES.md` defines repository-wide standards.

---

# Source of Truth Priority

When information conflicts, use this order:

1. Explicit instructions in the current task
2. `docs/PROJECT_RULES.md`
3. Existing verified repository behavior
4. Existing structured project data
5. Project documentation
6. Read-only Obsidian notes
7. Assumptions

Do not rely on assumptions when information can be verified.

---

# Obsidian Vault

Additional project documentation may exist at:

```text
C:\Obsidian\Nicolas Second Brain\Projects
```

Use this only when the repository and task files do not contain enough verified information.

The Obsidian vault is read-only.

Never:

- edit vault files
- rename vault files
- move vault files
- delete vault files
- create files inside the vault

Use it only to verify project details.

---

# Accuracy Rules

Never invent:

- features
- project metrics
- user counts
- client names
- deployment links
- repository links
- awards
- certifications
- performance improvements
- completion status

Do not describe planned or unfinished functionality as complete.

Use accurate wording such as:

- Currently rebuilding
- In development
- Designed
- Implemented
- Supports
- Planned

Choose wording based on what can be verified.

---

# Portfolio Projects

The primary projects currently intended for the Projects section are:

1. LexVerdict
2. Rural Health Unit Management System

Do not reintroduce the Barangay Census System unless explicitly instructed.

Do not add a Live Demo button unless a real working deployment URL is provided and verified.

Do not invent GitHub or repository URLs.

---

# LexVerdict

LexVerdict is a prosecutor case management system being rebuilt using a modern stack.

Current rebuild technologies may include:

- Laravel
- React
- TypeScript
- PostgreSQL
- Git

The legacy system may be used as a source of validated:

- workflows
- terminology
- roles
- business rules
- field definitions
- status values

Do not copy legacy implementation code.

Do not claim the Laravel rebuild is fully completed unless the repository proves that it is complete.

Preserve validated domain terminology.

Do not invent or replace business statuses with generic values.

---

# Rural Health Unit Management System

Only describe RHU functionality that can be verified from:

- the repository
- task documentation
- existing project data
- approved project notes

Do not invent healthcare workflows or medical functionality.

Avoid making claims that imply regulatory compliance unless explicitly documented.

---

# Assets

Existing project screenshots may be stored in locations such as:

```text
src/Image/Lexverdict Python/
src/Image/RHU/
```

Inspect the actual folders and filenames before importing assets.

Do not assume filenames.

Do not:

- duplicate screenshots unnecessarily
- delete original screenshots
- rename assets without a clear reason
- generate replacement screenshots
- use images from the wrong project

Use the login or landing-page screenshot as the project thumbnail when required by the task.

---

# Architecture

Follow the repository's existing architecture.

Before creating a new file, check whether an appropriate component, utility, hook, style, or data structure already exists.

Prefer reusable components for repeated UI behavior.

Possible components include:

```text
ProjectCard
ProjectDetailsModal
ProjectGallery
ThemeToggle
Badge
SectionHeader
```

These are examples, not mandatory filenames.

Do not create abstractions that add unnecessary complexity.

---

# Project Data

Where practical, store project information in structured data rather than duplicating it across components.

A project data structure may include:

```ts
type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status?: string;
  technologies: string[];
  thumbnail: string;
  screenshots: ProjectScreenshot[];
  overview?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  repositoryUrl?: string;
};
```

Adapt this to the existing language and architecture.

Do not force this exact structure if the project already has an appropriate data model.

---

# Styling

Use the existing styling system.

Possible systems include:

- CSS
- CSS modules
- Tailwind CSS
- Sass
- styled components
- framework-specific styling

Do not introduce a second styling system unnecessarily.

Prefer shared design tokens or CSS variables for:

- background colors
- text colors
- borders
- surfaces
- muted text
- shadows
- accent colors

Avoid scattered hardcoded values.

---

# Dark and Light Mode

When implementing theme support:

- apply it across the whole portfolio
- provide a visible theme toggle
- support keyboard interaction
- provide an accessible label
- save the selected preference
- use the operating system preference for first-time visitors
- avoid an incorrect-theme flash where practical
- maintain readable contrast
- verify cards, navigation, modals, buttons, and forms in both themes

Use the repository's existing theme support if one already exists.

Do not add duplicate theme systems.

---

# Responsive Design

All changes must work on:

- desktop
- tablet
- mobile

Do not rely only on hover interactions.

Every hover-only action must have a visible or accessible mobile equivalent.

Avoid:

- horizontal page overflow
- unreadably small text
- cropped controls
- inaccessible modal content
- fixed widths that break on smaller screens

---

# Accessibility

Use semantic HTML.

Ensure:

- buttons are real buttons
- navigation links are real links
- interactive elements are keyboard accessible
- visible focus states exist
- images have meaningful alt text
- decorative images use empty alt text where appropriate
- modals have accessible names
- Escape closes modal dialogs
- focus returns to the triggering element
- background scrolling is prevented while a modal is open
- clickable cards do not create invalid nested interactive elements

Do not use clickable `div` elements when a button or link is more appropriate.

---

# Modal Requirements

When implementing a project details modal:

- include a visible close button
- close on Escape
- close when the backdrop is clicked
- do not close when modal content itself is clicked
- prevent background scrolling
- restore focus after closing
- keep content usable on mobile
- allow the content area to scroll when needed
- provide appropriate dialog semantics
- avoid multiple modals being open simultaneously

Use an existing dialog component if the project already has one.

Do not install a large dependency only for a basic modal.

---

# Image Gallery

When implementing a screenshot gallery:

- use the correct project's images
- preserve aspect ratios
- provide meaningful alt text
- support keyboard-accessible controls
- indicate the active image where practical
- make thumbnails responsive
- lazy-load noncritical images where appropriate
- avoid loading unnecessarily large images all at once

Do not distort screenshots to force matching dimensions.

---

# Performance

Keep the portfolio lightweight.

Prefer:

- optimized images
- lazy loading
- code splitting where supported
- limited animations
- minimal dependencies
- efficient components

Avoid:

- large UI libraries for one small feature
- unnecessary animation libraries
- unnecessary global state
- unnecessary re-renders
- loading every project screenshot immediately

---

# Dependencies

Before installing a dependency:

1. Check whether the project already has a solution.
2. Determine whether the feature can be implemented cleanly without it.
3. Confirm that the dependency is actively maintained and appropriate.
4. Avoid adding large packages for small UI behavior.

Document any dependency added and why it was necessary.

---

# Scope Control

Only modify files relevant to the current task.

Do not:

- redesign unrelated sections
- rename unrelated files
- change framework configuration unnecessarily
- update every dependency
- reformat the entire repository
- remove working features
- modify Obsidian files

Small related improvements are acceptable only when they are necessary for correctness, consistency, accessibility, or build stability.

---

# Git Safety

Do not:

- delete the repository history
- run destructive Git commands
- force-push
- reset unrelated user changes
- discard uncommitted work
- create commits unless explicitly requested

Before overwriting a file with substantial existing content, inspect it first.

Respect changes already made by the user.

---

# Validation Commands

Inspect `package.json`, framework files, and repository documentation to determine the correct commands.

Common commands may include:

```bash
npm run lint
npm run build
npm run test
npm run typecheck
```

Do not assume every command exists.

Run the available relevant validation commands.

Fix errors introduced by the implementation.

Do not hide errors by disabling linting, type checking, or validation rules.

---

# Manual Verification

After implementation, verify:

- the application starts or builds successfully
- navigation still works
- project thumbnails load
- each project opens the correct details
- project screenshots belong to the correct project
- responsive layouts work
- dark mode works
- light mode works
- keyboard navigation works
- modal closing behavior works
- no Live Demo button appears without a real URL
- removed projects are no longer displayed
- unrelated sections remain functional

---

# Completion Report

At the end of every implementation, report:

## Summary

Briefly explain what was implemented.

## Files Modified

List modified files.

## Files Created

List newly created files.

## Commands Run

List validation and build commands.

## Validation Results

State whether linting, building, testing, and type checking passed.

## Assumptions

List any assumptions made.

## Unverified Information

Clearly identify anything that could not be confirmed.

## Remaining Issues

List only real remaining issues.

Do not invent recommendations simply to fill the report.

---

# Failure Handling

When a command fails:

1. Read the complete error.
2. Identify whether it existed before the task.
3. Fix errors caused by the current changes.
4. Do not make unrelated broad changes to solve a narrow issue.
5. Report pre-existing errors separately when they cannot safely be fixed within the task scope.

Never claim validation passed when it did not.

---

# Final Instruction

Make the smallest complete change that satisfies the current task.

Prioritize:

1. Accuracy
2. Correctness
3. Maintainability
4. Accessibility
5. Responsiveness
6. Performance
7. Visual polish

Inspect first, implement carefully, validate honestly, and avoid unnecessary rewrites.