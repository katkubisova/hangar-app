# Code Review Best Practices

## Pre-Review Requirements

### Branch Naming Conventions

| Type     | Pattern                        | Example                         |
| -------- | ------------------------------ | ------------------------------- |
| Feature  | `feat/<ticket-id>-<description>` | `feat/ABC-123-add-user-dashboard` |
| Fix      | `fix/<ticket-id>-<description>`  | `fix/ABC-456-login-validation`    |
| Refactor | `refactor/<description>`         | `refactor/extract-auth-utils`     |
| Docs     | `docs/<description>`             | `docs/update-api-documentation`   |
| Chore    | `chore/<description>`            | `chore/update-dependencies`       |

### PR Description Requirements

Every PR must include:

**Required sections:**
```markdown
## What
[1-2 sentences describing the change]

## Why
[Business context or problem being solved]

## How
[Technical approach summary - key decisions made]

## Testing
[How this was tested: unit tests, manual testing, etc.]

## Checklist
- [ ] Tests added/updated
- [ ] Self-reviewed my diff
- [ ] No unintended behavior changes
- [ ] Follows project conventions (see AGENTS.md)
```

**Optional sections when applicable:**
```markdown
## Breaking Changes
[Document any breaking changes]

## Dependencies
[List new dependencies and justification]

## Screenshots
[For UI changes]
```

### Self-Review Checklist

Before requesting review, verify:

| Category      | Item                                                    |
| ------------- | ------------------------------------------------------- |
| **Basics**        | Branch is up to date with base branch                   |
|               | PR title follows conventional commit format             |
|               | All CI checks pass                                      |
| **Code Quality**  | No commented-out code                                   |
|               | No debug code (console.logs, debugger statements)       |
|               | No TODOs without linked issues                          |
|               | Imports follow convention (external → internal via `@/*`) |
|               | Named exports used (except pages/layouts)               |
| **Testing**       | New code has test coverage                              |
|               | Edge cases covered                                      |
|               | Tests actually test behavior, not implementation        |
| **Documentation** | Complex logic has inline comments                       |
|               | Public APIs/functions have JSDoc                        |
|               | README updated if needed                                |
|               | Type updates documented                                 |

### Testing Requirements

| Change Type | Minimum Requirements                                |
| ----------- | --------------------------------------------------- |
| **New feature** | Unit tests + integration test + manual verification |
| **Bug fix**     | Regression test + verification fix works            |
| **Refactor**    | Existing tests pass + coverage maintained           |
| **UI change**   | Component tests + visual verification               |
| **API change**  | Route handler tests + type safety verified          |

### Documentation Expectations

- **Inline comments:** Explain "why", not "what"
- **JSDoc:** For all exported functions/components
- **README:** Update if adding dependencies or changing setup
- **Type files:** Use `types/` folder, document complex types

---

## Code Review Criteria

### Code Quality Aspects

| Aspect         | What to Check                                        |
| -------------- | ---------------------------------------------------- |
| **Readability**    | Code is self-explanatory, follows naming conventions |
| **Simplicity**     | No clever code, prefer explicit over implicit        |
| **Correctness**    | Logic is correct, edge cases handled                |
| **Error Handling** | Errors are caught and handled appropriately          |
| **Type Safety**    | No `any` types, proper type inference                |
| **DRY**            | Duplication is justified, not mindless               |
| **Function Size**  | Functions < 50 lines, single responsibility          |

### Architecture Alignment

| Aspect                 | What to Check                                           |
| ---------------------- | ------------------------------------------------------- |
| **Server/Client Boundary** | `"use client"` only when necessary                        |
| **Project Structure**      | Correct folder placement (features/, components/, lib/) |
| **Data Flow**              | Proper use of Server Components for data fetching       |
| **Dependencies**           | No circular dependencies, correct import paths          |
| **Abstraction Level**      | Follows existing patterns, not over-abstracted          |

**Questions to ask:**
- Does this change follow the "Measure twice, cut once" philosophy?
- Would a new team member understand this code?
- Does this fit the existing architecture or require discussion?

### Security Considerations

| Priority | What to Check                                      |
| -------- | -------------------------------------------------- |
| **Critical** | SQL/NoSQL injection, XSS, CSRF vulnerabilities     |
| **Critical** | Authentication/authorization gaps                  |
| **Critical** | Secrets/API keys in code                           |
| **High**     | Input validation and sanitization                  |
| **High**     | Insecure dependencies                              |
| **Medium**   | Proper error messages (no sensitive data exposure) |
| **Medium**   | Rate limiting on exposed endpoints                 |

### Performance Concerns

| Area          | What to Check                                |
| ------------- | -------------------------------------------- |
| **React**         | Unnecessary re-renders, missing memoization  |
| **Data Fetching** | N+1 queries, missing caching, unbounded data |
| **Bundle Size**   | Unnecessary dependencies, tree-shaking       |
| **Next.js**       | Proper use of caching, dynamic imports       |
| **Memory**        | Event listener cleanup, subscription cleanup |

### Maintainability Factors

| Factor        | What to Check                              |
| ------------- | ------------------------------------------ |
| **Naming**        | Clear, consistent, follows conventions     |
| **Coupling**      | Low coupling between modules               |
| **Cohesion**      | Related code grouped together              |
| **Testability**   | Code is testable without mocks overuse     |
| **Extensibility** | Easy to add features without major changes |

---

## Review Process

### Response Time Expectations

| PR Size                | Target Response Time | Maximum         |
| ---------------------- | -------------------- | --------------- |
| **Small** (< 100 lines)    | Same day             | 1 business day  |
| **Medium** (100-300 lines) | 1 business day       | 2 business days |
| **Large** (> 300 lines)    | 2 business days      | 3 business days |

**Note:** Large PRs should be split when possible. If a PR is too large, request split.

### Feedback Format

**Use structured comments:**

```markdown
<!-- Non-blocking suggestion (nit) -->
Nit: Consider extracting this logic to a utility for reusability.

<!-- Blocking issue -->
🚫 **Must Fix**: This SQL query is vulnerable to injection.
   Use parameterized queries instead.
   Reference: https://example.com/security-guide

<!-- Question/Discussion -->
❓ Question: Why was this approach chosen over Option B?
   Want to understand the trade-off for future reference.

<!-- Praise/Good practice -->
👍 Nice use of early return pattern here!
```

**Comment categories:**

| Emoji | Category   | Action                                       |
| ----- | ---------- | -------------------------------------------- |
| 🚫    | Blocking   | Must fix before merge                        |
| ⚠️    | Important  | Should fix, but mergeable with justification |
| 💡    | Suggestion | Consider this improvement                    |
| ❓    | Question   | Need clarification                           |
| 👍    | Praise     | Highlight good practices                     |

### Approval Criteria

**Requirements for approval:**

| Criterion           | Requirement                 |
| ------------------- | --------------------------- |
| All blocking issues | Resolved                    |
| Critical issues     | Resolved or documented plan |
| Tests               | Passing, adequate coverage  |
| CI/CD               | All checks green            |
| Documentation       | Updated if needed           |

**Approval workflow:**

1. Initial review → Comments added
2. Author addresses feedback → Re-request review if significant changes
3. Follow-up review → Approve if criteria met
4. Author merges (not reviewer)

### Handling Disagreements

**Escalation path:**

```
1. Discuss in PR comments
      ↓ (not resolved)
2. Quick sync call (15 min max)
      ↓ (not resolved)
3. Involve tech lead/architect
      ↓ (not resolved)
4. Document decision and proceed
```

**Documentation of disagreements:**

```markdown
## Decision Log

**Date:** 2024-01-15
**Topic:** Caching strategy for user data
**Decision:** Use SWR on client side
**Rationale:** Better UX for real-time updates, team familiarity
**Alternatives considered:** Server-side caching with revalidation
**Trade-off:** Slightly higher client requests vs simpler architecture
```

---

## Review Anti-Patterns

### Common Mistakes to Avoid

| Anti-Pattern    | Why It's Wrong                | Instead                                                   |
| --------------- | ----------------------------- | --------------------------------------------------------- |
| **Rubber-stamping** | Undermines review purpose     | Actually read and understand the code                     |
| **Bikeshedding**    | Focuses on trivialities       | Prioritize: Security → Correctness → Architecture → Style |
| **Scope creep**     | Delays PR, causes frustration | Note scope expansion for future task, don't block         |
| **Perfectionism**   | Blocks progress               | Focus on improvement, not perfection                      |
| **Vague feedback**  | Requires clarification cycles | Be specific: file, line, suggestion                       |

### Time-Wasting Patterns

| Pattern        | Impact                          | Prevention                              |
| -------------- | ------------------------------- | --------------------------------------- |
| **Large PRs**      | Reviewer fatigue, missed issues | Split into logical chunks (< 400 lines) |
| **Incomplete PRs** | Wasted review cycles            | Self-review checklist before request    |
| **No context**     | Reviewer needs to investigate   | PR description requirements             |
| **Style debates**  | Unproductive discussions        | Use Biome/linter, move style to config  |
| **Missing tests**  | Reviewer must verify manually   | CI requirement for test coverage        |

### Unhelpful Feedback Patterns

| Unhelpful                   | Helpful                                                            |
| --------------------------- | ------------------------------------------------------------------ |
| "This is wrong"             | "This will fail when X happens because Y. Consider doing Z instead."               |
| "Refactor this"             | "This function does A and B. Extract B to a separate function for clarity."        |
| "LGTM"                      | "LGTM. I like the approach of X. One minor question on line 42."                   |
| "I don't like this"         | "This approach has trade-off A. Alternative B would help with C but introduces D." |
| "Change all variable names" | "Variable `userData` could be `user` for consistency with the rest of the codebase."   |

---

## Quick Reference Cards

### For Authors: Before Requesting Review

```
☐ PR title: conventional commit format
☐ PR description: What, Why, How, Testing
☐ Self-review: Read every changed line
☐ CI: All checks passing
☐ Tests: New code is tested
☐ Diff: Reasonable size (< 400 lines ideal)
☐ Conventions: Follows AGENTS.md
☐ No: debug code, commented code, secrets
```

### For Reviewers: Review Priorities

```
1. Security (injection, auth, secrets)
2. Correctness (logic, edge cases, types)
3. Architecture (patterns, structure)
4. Performance (N+1, memory, bundle)
5. Maintainability (naming, complexity)
6. Style (use linter, don't nitpick)
```

### Decision Framework

```
Is this a blocking issue?
├─ Security vulnerability → 🚫 Block
├─ Data loss/corruption risk → 🚫 Block
├─ Breaking change without migration → 🚫 Block
├─ Incorrect behavior → 🚫 Block
├─ Missing critical tests → ⚠️ Block until tests added
├─ Style inconsistency → 💡 Suggest linter rule
└─ Opinion/preference → 💡 Suggest, accept team decision
```

---

## Metrics to Track

| Metric                | Target             | Action if Missed           |
| --------------------- | ------------------ | -------------------------- |
| PR size               | < 400 lines        | Split PRs earlier          |
| Review turnaround     | < 24 hours         | Reviewer capacity          |
| PRs needing re-review | < 30%              | Better initial feedback    |
| Post-merge bugs       | < 5% of merged PRs | Review process improvement |