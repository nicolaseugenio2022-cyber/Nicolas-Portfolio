# Portfolio Project Rules

These rules apply to every task performed within this repository.

Codex should read and follow these rules before making implementation decisions.

---

# Purpose

This portfolio represents my professional software engineering work.

Every change should improve professionalism, maintainability, accessibility, performance, and user experience.

Do not make unnecessary changes.

---

# Development Principles

Always:

- Understand the existing architecture before modifying code.
- Reuse existing components whenever practical.
- Prefer extending existing functionality over rewriting it.
- Keep implementations modular.
- Keep code readable and maintainable.
- Avoid unnecessary dependencies.
- Follow the project's existing conventions.

---

# UI Principles

The portfolio should feel

- modern
- premium
- clean
- minimal
- developer-focused

Avoid

- flashy animations
- cluttered layouts
- excessive gradients
- unnecessary visual effects

Animations should feel subtle and intentional.

---

# Design Consistency

Maintain consistent

- spacing
- typography
- colors
- border radius
- shadows
- transitions

Do not introduce inconsistent UI styles.

---

# Responsiveness

Every feature must work correctly on

- desktop
- tablet
- mobile

Never design only for desktop.

---

# Accessibility

Every new feature should support

- keyboard navigation
- visible focus states
- semantic HTML
- sufficient color contrast
- descriptive alt text
- screen readers where appropriate

Interactive elements should remain accessible without a mouse.

---

# Images

Reuse existing project screenshots.

Do not create duplicate assets.

Do not invent screenshots.

Preserve image quality.

Use optimized image loading whenever possible.

---

# Project Information

Never invent

- client names
- statistics
- performance metrics
- deployment URLs
- GitHub URLs
- awards
- certifications
- user counts

If information cannot be verified, leave it out.

---

# LexVerdict Rules

LexVerdict is currently being rebuilt.

Never present unfinished functionality as completed.

Use wording such as

- Currently rebuilding
- Designed
- Implemented
- Supports
- Planned

only when accurate.

Preserve factual descriptions from

- repository
- resume
- project documentation
- Obsidian notes

Do not exaggerate project scope.

---

# RHU Rules

Only describe functionality that exists within the project.

Do not invent medical workflows.

---

# Components

Prefer reusable components.

Examples

- ProjectCard
- ProjectGallery
- ProjectModal
- ThemeToggle
- Badge
- SectionHeader

Avoid duplicated UI.

## Reusable Frontend Interaction Patterns

Apply these patterns when building comparable UI elsewhere:

- Keep mutually exclusive overlays under one parent state owner. Do not let repeated cards independently mount competing dialogs.
- Render viewport dialogs outside transformed or animated ancestors. A portal prevents `position: fixed` from being constrained by a transformed container.
- Separate visual size from interaction size. Compact icons may sit inside a minimum 44px touch target.
- On touch galleries, distinguish horizontal intent from vertical scrolling before navigating. Require a horizontal threshold and ensure horizontal movement clearly exceeds vertical movement.
- Treat taps and swipes as one gesture system. Ignore bubbled pointer events from nested buttons so arrow and fullscreen controls do not trigger gallery-zone navigation.
- Use one natural scroll owner. Avoid nested side-panel scrollbars; allow mobile dialog content to scroll while making common desktop viewports fit without scrolling where practical.
- Use roving `tabIndex` and arrow-key focus movement for accessible tabs.
- Mobile tab rails may scroll horizontally when labels cannot fit, but must not create page-level overflow or expose an unnecessary scrollbar.
- Preserve per-group gallery state when switching feature tabs so users do not lose their place.
- Use progressive affordance hints sparingly. Session-scoped hints may explain a gesture or clickable surface once, then disappear without blocking the first interaction.
- Respect reduced-motion preferences and keep transitions limited to opacity and transforms where possible.
- Use semantic theme tokens for surfaces, borders, foregrounds, muted text, and focus states. Add theme-specific utility overrides only when a shared token cannot express the requirement.

---

# Styling

Reuse the project's styling system.

Avoid scattered hardcoded colors.

Prefer reusable variables or theme tokens.

Dark mode and light mode should both remain fully supported.

---

# Performance

Avoid unnecessary re-renders.

Lazy load heavy assets where practical.

Optimize images.

Avoid unnecessary JavaScript.

Keep animations lightweight.

---

# Code Quality

Write clean, maintainable code.

Prefer clarity over cleverness.

Use meaningful names.

Remove dead code.

Avoid large monolithic components.

Keep files organized.

---

# Validation

Before completing any task

- run lint
- run production build
- resolve introduced errors
- verify responsive layouts
- verify accessibility
- verify dark mode
- verify light mode

Do not leave known issues unresolved.

---

# Deliverables

Every completed implementation should include

1. Summary of changes
2. Files modified
3. Files created
4. Commands executed
5. Assumptions made
6. Remaining recommendations

---

# Priority Order

When requirements conflict, follow this order:

1. Accuracy
2. Maintainability
3. Accessibility
4. Performance
5. Responsiveness
6. Visual polish

Never sacrifice correctness for appearance.

---

# Repository Scope

Only modify files that are relevant to the requested task.

Do not refactor unrelated parts of the application.

Do not remove working functionality unless explicitly instructed.

Respect the existing project structure.

---

# Final Rule

When uncertain, inspect the repository first.

Base implementation decisions on the existing codebase rather than assumptions.

Every change should leave the portfolio in a better state than before.
