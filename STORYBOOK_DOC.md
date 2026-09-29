# Technical Documentation — Storybook Utilities (Bamboo Design System)

This module contains a set of **constants, types, and utility functions** used to programmatically generate the content of the Storybook documentation pages (`.stories` / `.mdx`) for the **Bamboo** design system. Its purpose is to standardize the format of descriptions, code examples, alerts/callouts, DOM architecture, and the other sections that appear in the documentation of every component/element/directive/service in the system.

---

## Table of contents

1. [Imports](#imports)
2. [Types and interfaces](#types-and-interfaces)
3. [General constants](#general-constants)
4. [Page structure](#page-structure)
5. [Attribute formatting utilities](#attribute-formatting-utilities)
6. [Name and link utilities](#name-and-link-utilities)
7. [Events](#events)
8. [Alerts and callout blocks](#alerts-and-callout-blocks)
9. [DOM architecture sections](#dom-architecture-sections)
10. [Code examples (TypeScript / HTML / Reactive forms)](#code-examples-typescript--html--reactive-forms)
11. [General component descriptions](#general-component-descriptions)
12. [Typography and design tokens (foundations)](#typography-and-design-tokens-foundations)
13. [Angular providers](#angular-providers)
14. [Description generators for component variants](#description-generators-for-component-variants)
15. [Color list](#color-list)
16. [Documentation checklist (internal comment)](#documentation-checklist-internal-comment)
----

Checklist:

ON THIS PAGE (optional, TABLE OF CONTENTS) [Done, is in preview, if not so add parameters: { docs: { toc: TOC_OBJ...]

- Tabs (optional) [Create MDX]
- Name [Done, is is .stories]
- Description [Add ${getGeneralDescription('')}  to parameters: { docs: { description: { component: ``...]
  General documentation [is in getGeneralDescription]
  getGeneralComponentDescription('') General documentation helper
- DOM Architecture (optional) [Add ${getArchitectureSection(``)}  to parameters: { docs: { description: { component: ``...]
- Considerations / Restrictions (optional) [Add ${getSpecialSpecifications(` ### []:`)} to parameters: { docs: { description: { component: ``...]
- Reactive form example (optional) [Add ${getFormExampleBlock('', '', '', '')} to parameters: { docs: { description: { component: ``...]
  TypeScript example for reactive form [is in getFormExampleBlock]
  HTML example for reactive form [is in getFormExampleBlock]
- TypeScript example [Add ${getBasicExampleBlock('')} to parameters: { docs: { description: { component: ``...]
- HTML example [is in getBasicExampleBlock]
- PROPERTIES AND EVENTS [Done, is in preview]
  PROPERTIES [Clear in parameters: { controls: { exclude: ['']}, ...]
  EVENTS [Clear in parameters: { controls: { exclude: [''] ...]
- VARIANT TEMPLATES (optional) [Done, is in preview or in GeneralTemplate.mdx]

---

## Imports

The file imports:

- Blocks from `@storybook/addon-docs/blocks` (`Controls`, `Description`, `Heading`, `Primary`, `Title`) to build the documentation page tree with React's `createElement`.
- `getListingOnOneLine` from `../../shared/logic/utils`, used to turn lists into single-line, human-readable strings.
- Predefined color lists from `../../shared/types/foundations/colors/color-type` (base, semantic, MITEC, "creative", and alert colors).

---

## Types and interfaces

| Name               | Type        | Description                                                                                            |
| ------------------ | ----------- | -------------------------------------------------------------------------------------------------------|
| `IBmbVariableDesc` | `interface` | Describes a design variable with `element` (element name) and `name` (variable name).                  |
| `IBmbOnEvent`      | `interface` | Describes a documented event: `name`, `handleExample`, `propertyValue`, `type`, `event_type`.           |
| `IBmbStoryLink`    | `interface` | Reference to another story/page: `title` and, optionally, `showFullLinkName`.                          |
| `IBmbStoryType`    | `type`      | Story type: `'element' \| 'component' \| 'organism' \| 'directive' \| 'service'`.                      |
| `IBmbOnEventType`  | `type`      | Event type: `'change' \| 'keyDown' \| 'other'`.                                                        |

---

## General constants

- **`RELEVANT_TITLE`**: map of emoji-prefixed titles for the different alert types (`warning`, `important`, `note`, `configuration`, `example`, `deprecated`, `lts`).
- **`BlockquoteType`**: GitHub Flavored Markdown blockquote syntax for `warning`, `note`, and `important`.
- **`DESIGN_SYSTEM_TITLE`**: stylized design system name (`***Bamboo***`).
- **`TECHNICAL_DOC_TITLE`**, **`TECHNICAL_DOC_REFERENCES`**: title and intro text for the technical documentation references section.
- Reusable section titles: `STORIES_TITLE`, `TITLE_OF_CONTROLS`, `PREVIEW_TITLE`, `TOC_TITLE`, `DESCRIPTION_TITLE`, `SPECIAL_SPECIFICATIONS_TITLE`, `SANDBOX_TITLE`.
- Fixed descriptive texts: `SPACING_DESCRIPTION`, `TYPOGRAPHY_DESCRIPTION`, `FONT_FAMILY_DESCRIPTION`, `FULLSCREEN_DESC`.
- **`TOC_OBJ`**: default table-of-contents configuration (`headingSelector: 'h2, h3'`).

---

## Page structure

### `getPageStructureForFoundationStories(): unknown[]`

Returns the array of React elements (`Title`, `Description`, `Heading` with `PREVIEW_TITLE`, `Primary`, `Controls`) used as the page template for **foundation** stories (design foundations).

### `getPageStructureForTemplateStories(): unknown[]`

Same as above, but **without** the `Controls` block — intended for **template** stories.

---

## Attribute formatting utilities

### `attributes(object): string`

Converts a properties object into an HTML/Angular attribute string, excluding the `test_text` key. Uses `[prop]='value'` for functions/objects and `prop="value"` for strings (via the internal helpers `getKeyFormat` and `getValue`).

### `attributesText(object): string`

Extracts only the value of the `test_text` key from the object, to be used as the text content of the example element.

---

## Name and link utilities

- **`getLandingGeneralDesc(name)`** / **`getStandaloneGeneralDesc(name)`**: generate the general description for _Landing_ and _Stand alone sites_ templates, respectively, including the link to the general documentation.
- **`getFormatName(name, separator?, replace?)`**: capitalizes the first letter of a name; if a separator is provided, capitalizes each separated word and concatenates them, or replaces the separator with another character.
- **`getStoryTitle(fullTitle)`**: returns only the last segment of a story's full title (after the last `/`).
- **`getStoryLink({ title, showFullLinkName, isPreURL })`**: builds a Markdown link to another story's `/docs/...--documentation` page.

---

## Events

### `getOnEvent(name, paramName, type?, isHandle?, additionalBlock?): IBmbOnEvent`

Generates the description of a component/directive event:

- `name`: the event's name.
- `type`: the event parameter's type (defaults to `'MouseEvent'`; if `'void'`, the parameter is omitted).
- `handleExample`: sample handler method snippet (`handleX(event) {...}`).
- `propertyValue`: the value used when binding the event in the template, e.g. `handleX($event)`.

---

## Alerts and callout blocks

### `getAlertBlockquote(content, options): string`

Base function for building GFM blockquote blocks (`> [!WARNING]`, `> [!NOTE]`, `> [!CALLOUT]`) with a title and content. Supports bold titles (`isRelevantTitle`), heading-style titles (`isHeader`), and sub-story identifiers.

Built on top of `getAlertBlockquote`:

| Function                                                | Purpose                                                                                                            |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `getEmptyStateMessage(...)`                             | Reminds to use the corresponding _empty state_, with a link to the UX writing guide.                              |
| `getTECParticularitiesMessage(element, ...)`            | Warns that an element is an exclusive particularity of the TEC/TECMI brands and must not be used by other brands. |
| `getOutOfModalUseMessage(...)`                          | Warns that the element must be implemented outside of a `Modal`.                                                  |
| `getReferenceRecommendationForVariable(element)`        | Recommends checking the _Variables_ documentation to implement the element via CSS.                               |
| `getFullScreenDesc()`                                   | Note about incorrect rendering in fullscreen mode within Storybook.                                               |
| `getElementUsesDesc(name, isOther?)`                    | States which variant (`bmb-{name}`) the current example uses.                                                     |
| `getActionMenuAlert()`                                  | Reminds to add the `#actionMenuItem` tag to _Action menu_ templates.                                               |
| `getDeprecatedDesc({ type, isHeaderL2, isBlockquote })` | Generates the **deprecated** element/property notice, optionally as a blockquote with a heading.                  |

Other related utilities:


- **`getGridGeneratorLink()`**: fixed link to the _Grid generator_ tool.
- **`getAuxiliaryDescription(principal, auxiliary)`**: describes the relationship between a main component and its auxiliary component.
- **`getTechnicalDocReferences({ references, isFullScreenDesc })`**: builds the "🛠️ Technical documentation" section with a list of links (`IBmbStoryLink[]`).
- **`getTechnicalOneReference(title)`**: shortcut for `getTechnicalDocReferences` with a single reference.

---

## DOM architecture sections

### `getArchitectureSection(architectureBlock, bmbNameLink?, documentationLink?): string`

Generates the **"DOM Architecture"** section with an HTML code block and, optionally, a link to the DOM architecture of another related component (`getDOMArchitectureLink`).

### `getCheckboxOrRadialArchitecture(type): string`

Shortcut for `getArchitectureSection` with the predefined DOM structure for `checkbox` or `radial` type components (container, `input`, check box, and optional label).

### `getDOMArchitectureLink(bmbNameLink?, documentationLink?): string`

Generates the Markdown link to the DOM architecture section of another Bamboo component.

---

## Code examples (TypeScript / HTML / Reactive forms)

- **`getDescribeTypeTextBlock(typeExampleName, additionalTitle?, isLevel3?, additionalText?)`**: generic descriptive heading for an example block (e.g. "TypeScript example", "HTML example").
- **`getTypescriptExampleBlock(...)`** _(internal)_: builds the TypeScript code block with Angular imports (`CommonModule`, `Component`), the Bamboo component import, and the standalone component class definition.
- **`getTypescriptExampleTextBlock(...)`**: combines the heading (`getDescribeTypeTextBlock`) with the code block (`getTypescriptExampleBlock`).
- **`getReactiveFormTitle(bmbInputName, ...)`**: title and description for the **reactive form** example section.
- **`getFormExampleBlock(bmbInputName, inputName, additionalBlock, inputExample, ...)`**: generates the complete reactive form example, including the TypeScript example (with `FormGroup`/`FormControl`, `onSubmit`, error validation) and the corresponding HTML example.
- **`getHTMLFormExampleTextBlock(inputExample, ...)`**: HTML code block for a form (`<form [formGroup]="userForm" ...>`) with the example field and a submit button.
- **`getBasicExampleBlock(inputName, ...)`**: combines the TypeScript example and the basic HTML example heading (without a reactive form) for a component.

---

## General component descriptions

- **`getGeneralComponentDescription({ name, type, additional, alternativeDescription })`**: standard first sentence of a component/element/directive description, formatted as `` `bmb-name` is a Bamboo [type] that allows you to... ``.
- **`getGeneralDescription(content, options)`**: builds the complete **"Description"** section, including the deprecation notice when applicable (`isDeprecated`) and the link to the general documentation (`generalDocLink`).
- **`getFieldDescription(componentName, additionalDescription, generalDocLink)`**: standard description for **input field** components (`bmb-{componentName}`), including validations, error messages, and tooltip support.
- **`getSpecialSpecifications(content, options)`**: the **"Considerations / Restrictions"** section.
- **`getContainerButtonComponentDescription({ selectorName, variantName, componentName })`**: full documentation (description + empty state + basic example) for **Container button** variants.
- **`getActionMenuItemComponentDescription({ selectorName, variantName, componentName, parentName })`**: full documentation for **Action menu** item variants (or another specified parent component).

---

## Typography and design tokens (foundations)

- **`getFoundationDescriptions(element, additionalDescription?)`**: generic description for a collection of _foundation_ variables (e.g. spacing, typography).
- **`getHelpDescriptionForGeneratingVariables(element, isControl?)`**: help text inviting the use of the interactive tool or the controls to generate variables for an element.
- **`getTypographyDetail(isCompleteDetail?)`**: detailed **typography** section: font families (`font-light`, `font-regular`, `font-bold`), size scale (1–12), and its mapping to HTML tags (`h1`–`h4`, `p`, `a`, `blockquote`).
- **`getVariableDetail(element, classes, list, definitionClass, size, style?, isInherit?, variableDescription?, stylesVar?)`**: describes an element's class name or CSS variable, with a usage example and, when `isInherit` is true, a second example showing value inheritance in child elements.
- **`getVariableAndClassesSizes(element)`**: table of available values for a size type (`none`, `xxs`…`xxl`, `auto`, and the numeric `1`–`10` scale) in REM units, with approximate pixel equivalents.
- **`getSandboxConsiderationsDocumentation(element, introductionContent?, content?, isWarning?, implementationDetails?, style?, isClassNameVar?, isInherit?, isOmitImportant?)`**: the most complex function in the module; builds the complete documentation for a sandbox-type _foundation_ (e.g. spacing), including:
  - Recommendation to use variables (optional, `isOmitImportant`).
  - Warning about possible overrides by components (`isWarning`).
  - **"Class Name"** and **"CSS Variable"** sections generated from `implementationDetails` (a list of `IBmbVariableDesc` or `string[]`), relying on the internal helpers `getSubList` and `getMergeList` to build the class/variable names and their combined values.
  - Closes with the **"Sandbox"** section.

Internal support functions (not exported outside of the `getSandboxConsiderationsDocumentation` flow):

- **`getSubList(list, elementName, template?)`**: maps a list of strings or `IBmbVariableDesc` objects into a list of strings, optionally applying a template with a `[__]` placeholder.
- **`getMergeList(list, definition, splitChar)`**: combines a list of properties with a style definition separated by `splitChar`, generating CSS declarations of the form `property: var(--variable);`.

---

## Angular providers

- **`getProviderBlockExample(bambooProviderName)`**: code block for the `providers` array with `provideRouter` and `importProvidersFrom([...])`.
- **`getProviderExample(bambooProviderName)`**: wraps the block above in an instruction sentence ("Add the **_ X _** to your App providers").
- **`getProviderTypescriptExample(bambooProviderName, additionalDetail?)`**: complete **"⚙️ Configuration"** section with the `app.config.ts` example showing how to register the Bamboo provider in `ApplicationConfig`.

---

## Color list

### `colorList: (color)[]`

Array that concatenates all of the system's color lists:
`BMB_BASE_COLOR_LIST`, `BMB_MITEC_BASE_COLOR_LIST`, `BMB_CREATIVE_BASE_COLOR_LIST`, `BMB_SEMANTIC_COLOR_LIST`, `BMB_SEMANTIC_BASE_COLOR_LIST`, `BMB_MITEC_COLOR_LIST`, `BMB_CREATIVE_COLOR_LIST`, and `BMB_ALERT_COLOR_LIST`.

Used as the single source for color controls/selectors in Storybook.

---

## Documentation checklist (internal comment)

The file includes, at the end, two comment blocks that are **not executable code** but rather aids for whoever documents a new component:

1. A **checklist** of the sections every documentation page should have (table of contents, tabs, name, description, DOM architecture, considerations/restrictions, reactive form example, TypeScript/HTML examples, properties and events, variant templates), indicating where/how to add each one within Storybook's `parameters`.
2. A **commented example template** showing how to combine `getGeneralDescription`, `getBasicExampleBlock`, `getOnEvent`, and the `controls.exclude` / `tags: ['!autodocs']` options when creating a new story.

> These sections serve as a quick reference for team developers when writing documentation for a new Bamboo design system component, and must not be removed or treated as dead code.


---

## Purpose summary

Taken together, this module acts as a reusable **Markdown/MDX template generation layer** for all of the Bamboo Design System's Storybook documentation, avoiding text/format duplication across the different documented components, elements, directives, and services, and ensuring visual and structural consistency (titles, alerts, code examples, DOM architecture, typography, and design tokens) throughout the library.
