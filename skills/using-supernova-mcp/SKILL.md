---
name: using-supernova-mcp
description: Use the Supernova MCP to retrieve context-scoped design system documentation, tokens, components, assets, and feedback tools.
---

# Using Supernova MCP

Use this skill whenever you need design-system context from Supernova. The plugin includes a preconfigured `supernova` MCP server scoped to the current Supernova Context.

Do not expect tokens, documentation pages, components, or assets to be present as files in this plugin. They are served live through MCP tools.

## Documentation and workspace knowledge

Start with `search_documentation` for almost every documentation or knowledge question. It searches both documentation pages and workspace knowledge selected by the context.

Recommended flow:

1. Call `search_documentation` with the user's terms.
2. Keep `mode` as `hybrid` unless you have a reason to use `full-text` or `vector`.
3. Use `limit` between 5 and 10 for focused answers.
4. If a result has a `pageId`, call `get_documentation_page_content` with that id before making detailed claims.
5. Use `get_documentation_page_list` only when you need to enumerate available pages or the search terms are unclear.

## Tokens

- Use `get_token_list` to discover context-scoped tokens. Filter with `tokenTypes` when useful.
- Use `get_token_details` with `tokenIds` for exact resolved token values.
- Use `themes` in `get_token_details` when the user asks for themed values; pass theme UUIDs or code names.
- Use `get_token_theme_list` to discover theme IDs and code names.

## Components

- Use `get_design_system_component_list` then `get_design_system_component_detail` for Supernova design-system components.
- Use `get_figma_component_list` then `get_figma_component_detail` for linked Figma components.
- Use `get_code_component_list` then `get_code_component_detail` when implementation/API details are needed.

## Assets and Storybook

- Use `get_asset_list` then `get_asset_detail` for context-scoped assets.
- Use `get_storybook_story_list` then `get_storybook_story_detail` for Storybook references.

## Project and account context

- Use `get_me` to confirm the authenticated Supernova user when needed.
- Use `get_selected_project_feature_details`, `get_selected_project_document_details`, and `get_project_feature_artifact_details` only when a selected MCP stream is available for project feature/document work.

## Pagination

Many list tools return a `nextCursor:` footer. When present, call the same tool again with that `cursor` value to continue.

## Scope

The MCP URL is context-scoped. List and search tools should only surface items selected by the Supernova Context. Detail tools may still be able to resolve explicit IDs, so prefer ids found from context-scoped search/list calls.
