---
name: capture-feedback
description: Capture useful design-system feedback and submit it through the Supernova MCP collect_agent_feedback tool.
---

# Capture Feedback

Use this skill when work with this plugin reveals useful feedback about the Supernova context, MCP results, design-system docs, tokens, components, or generated agent output.

Capture feedback when one of these signals occurs:

- `MissingInformation`: the MCP or context did not contain information needed to answer or implement confidently.
- `Incorrect`: retrieved information was wrong, stale, contradictory, or corrected by the user.
- `WrongSource`: the answer relied on a source outside the Supernova context when the context should have covered it.
- `Output`: the agent produced output that exposed a design-system documentation, token, component, or guidance gap.

Submit feedback by calling the Supernova MCP tool `collect_agent_feedback`.

Required fields:

- `message`: short human-readable summary.
- `conversation`: the relevant transcript excerpts available in the current session.
- `sentiment`: `Positive`, `Neutral`, `Negative`, or `Aggressive`.
- `category`: `MissingInformation`, `Incorrect`, `Output`, or `WrongSource`.
- `llm`: object with `provider` and `model`.

Optional fields:

- `description`: concise details, reproduction notes, expected source, or suggested fix.
- `metadata`: structured context such as file paths, tool names, token names, page ids, or component ids.

This context allows non-anonymous feedback collection; still include only details that help triage the issue.

If the user asks to stop capturing feedback, skip this skill until they opt back in.
