# Task: Redesign Portfolio Projects Section

## Objective

Modernize the Projects section of my developer portfolio while keeping the overall visual identity consistent.

Before making any changes, inspect the repository structure, existing components, routing, styling system, and project data. Reuse the current architecture wherever possible.

---

# Reference Material

Several reference images have been provided.

Use them only as inspiration.

## Reference 1

Contains the updated project information and technical descriptions.

Use these descriptions as the source of truth for project content.

---

## Reference 2

Shows the current Projects section.

This section will be redesigned.

---

## Reference 3

Shows that all screenshots already exist inside the repository.

Project images can be found in:

```
src/Image/Lexverdict Python/
src/Image/RHU/
```

Inspect the folders and use the correct filenames.

Do not create duplicate images.

---

## Reference 4 & 5

These are UI inspirations.

Take inspiration from:

- image presentation
- hover effects
- project detail layout
- modal layout
- animations
- spacing
- typography

Do NOT copy them exactly.

---

# Optional Reference

If additional project details are needed, inspect my Obsidian vault.

```
C:\Obsidian\Nicolas Second Brain\Projects
```

Treat the vault as read-only.

Do not modify anything inside it.

---

# Projects

Remove the Barangay Census System completely.

Only display these two projects.

1. LexVerdict
2. Rural Health Unit Management System

---

# LexVerdict

Subtitle:

Case Management System

Technology

- Laravel
- React
- TypeScript
- PostgreSQL
- Git

Description

Currently rebuilding a legacy prosecutor case management system using Laravel, React, TypeScript, and PostgreSQL while preserving validated legal workflows and business rules.

Highlights

- Role-based authorization
- Administrator
- Prosecutor
- Secretary
- Process Server
- Secure subpoena workflows
- Resolution management
- Audit trail
- Reporting
- Private document storage
- Modular architecture
- Git workflow

Use the login or landing page as the card thumbnail.

Locate the image inside

```
src/Image/Lexverdict Python/
```

Do not assume filenames.

Inspect the folder.

Important

Do not claim unfinished functionality is complete.

Use wording such as

- Currently rebuilding
- Designed
- Implemented
- Supports

when appropriate.

---

# Rural Health Unit Management System

Subtitle

Healthcare Records and Operations Platform

Technology

- Laravel
- PHP
- MySQL
- Vite

Description

Healthcare management platform supporting patient records, appointments, prenatal care, laboratory services, medical requests, and administrative workflows.

Highlights

- Role-based access
- Patient records
- Appointment management
- Laboratory workflows
- Medical requests
- Administrative dashboard
- Centralized database
- Organized healthcare records

Use the login or landing page as the thumbnail.

Locate the image inside

```
src/Image/RHU/
```

---

# Project Cards

Redesign both cards.

Each card should contain

- large thumbnail
- project title
- subtitle
- short description
- technology badges
- View Details button

The cards should feel premium and modern.

---

# Hover Effect

When hovering over the project thumbnail

- slightly zoom the image
- apply a dark overlay
- show a centered "View Details" button
- animate smoothly

The hover effect should be elegant rather than flashy.

On mobile devices, the action should remain visible.

---

# Project Details

Clicking

- View Details
- View Project Overview

should open an expanded project presentation.

Use an accessible modal if it integrates well with the existing architecture.

Otherwise use dedicated project pages.

The expanded view should include

- project title
- subtitle
- overview
- problem
- solution
- key features
- technologies
- project status
- screenshot gallery

Use the existing screenshots inside each project folder.

The gallery should

- preserve aspect ratio
- support multiple screenshots
- be responsive
- lazy load images where practical

The modal should

- close on Escape
- close when clicking outside
- restore keyboard focus
- prevent background scrolling

---

# Remove Live Demo

Do NOT display a Live Demo button.

These projects are not deployed online.

Only display repository links if real URLs already exist.

Never invent URLs.

---

# Dark Mode

Implement a complete dark and light mode.

Requirements

- Theme toggle in the navigation
- Save preference using localStorage
- Respect prefers-color-scheme on first visit
- Prevent flash of incorrect theme
- Entire portfolio must support both themes
- Accessible contrast
- Keyboard accessible toggle

Do not hardcode colors throughout the application.

Reuse the existing styling system.

---

# Code Quality

Prefer reusable components.

Examples

```
ProjectCard
ProjectModal
ProjectGallery
ThemeToggle
```

Store project information in a central data file instead of duplicating content.

Reuse existing components whenever practical.

Do not rewrite unrelated pages.

Do not remove working functionality.

---

# Accessibility

Ensure

- keyboard navigation
- focus states
- Escape closes modal
- semantic HTML
- alt text
- responsive layout

---

# Validation

After implementation

- Run lint
- Run production build
- Fix introduced errors
- Test desktop
- Test tablet
- Test mobile
- Test dark mode
- Test light mode
- Verify both projects display correctly
- Verify Barangay Census System has been removed
- Verify screenshots load correctly
- Verify no Live Demo button exists

---

# Deliverables

At the end provide

1. Summary of changes
2. Files modified
3. Files created
4. Commands executed
5. Assumptions made
6. Remaining recommendations (if any)