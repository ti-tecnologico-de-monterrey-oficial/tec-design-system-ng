# Remote Angular API audit — v1.6.4-b migration

Previous remote Code Connect SHA: `5f36fe4ddb3285bf4ccf92e74daf6ea5b690b9de`

Target remote develop SHA: `94e14c2ca61c9cf011a017335f6c710d1cb5e777`

Unique mapped sources audited: **96**. Path-only: **84**. Snippet revalidation: **12**. Missing remote sources: **0**.

The audit compares selectors and Angular public `input`, `input.required`, `model`, `output`, `@Input`, `@Output`, and `contentChild` declarations fetched from GitHub at the exact SHAs above. Import-only changes caused by the Nx move are intentionally ignored.

## Sources requiring snippet revalidation

| Source | Templates | Added API | Removed API | Changed API | Selector/class |
| --- | --- | --- | --- | --- | --- |
| `ui-angular/src/lib/components/old/bmb-accordion/bmb-accordion.component.ts` | Accordion.figma.ts | `bmbAccordionBasic`, `imageNotFoundError` | — | `bmbAccordionContent`, `bmbAccordionHeader` | — |
| `ui-angular/src/lib/components/old/bmb-account-statement/bmb-account-statement.component.ts` | AccountStatement.figma.ts | — | — | `progressCircleTitle` | — |
| `ui-angular/src/lib/components/old/bmb-action-icon/bmb-action-icon.component.ts` | ActionIcon.figma.ts | `imageNotFoundError`, `tooltipText` | — | `customActionIcon` | — |
| `ui-angular/src/lib/components/old/bmb-advertisement-card/bmb-advertisement-card.component.ts` | AdvertisementCard.figma.ts | `imageNotFoundError` | — | — | — |
| `ui-angular/src/lib/components/old/bmb-ai-chat-bubble/bmb-ai-chat-bubble.component.ts` | AiChatBubble.figma.ts | `imageNotFoundError` | — | — | — |
| `ui-angular/src/lib/components/bmb-badge/bmb-badge.component.ts` | Badge.figma.ts | — | — | `appearance` | — |
| `ui-angular/src/lib/components/old/bmb-box-icon/bmb-box-icon.component.ts` | BoxIcon.figma.ts | `boxShape`, `imageNotFoundError` | — | — | — |
| `ui-angular/src/lib/components/bmb-carousel/bmb-carousel.component.ts` | Carousel.figma.ts | `selectedIndex` | — | — | — |
| `ui-angular/src/lib/components/old/bmb-dropzone/bmb-dropzone.component.ts` | Dropzone.figma.ts | `allowDuplicateFiles`, `customErrorMessages`, `errorMessageInvalidName` | — | `customValidation` | — |
| `ui-angular/src/lib/components/bmb-iframe/bmb-iframe.component.ts` | Iframe.figma.ts | — | — | `loading` | — |
| `ui-angular/src/lib/components/old/bmb-image/bmb-image.component.ts` | Image.figma.ts | `imageNotFoundError` | — | — | — |
| `ui-angular/src/lib/components/bmb-user-image/bmb-user-image.component.ts` | UserImage.figma.ts | `imageNotFoundError` | — | — | — |

## Revalidation outcome

All 12 templates remain compatible with the target SHA and require no snippet change:

- **Badge:** the declaration of `appearance` changed, but every value emitted by `Badge.figma.ts` remains present in the remote `bmb_badge_type` catalog or the compatible background-appearance union.
- **Accordion, Account statement, Action icon, Advertisement card, AI chat bubble, Box icon, Carousel, Dropzone, Iframe, Image and User image:** their changed members are additive or are not emitted by the corresponding template. No mapped Angular input was removed, renamed or narrowed by these templates.

This disposition is based on the remote sources and shared types at the target SHA, not on the previous local source tree.

## Missing remote sources

None.

## Path-only sources

- `ui-angular/src/lib/components/old/bmb-academic-progress/bmb-academic-progress.component.ts` — AcademicProgress.figma.ts
- `ui-angular/src/lib/components/old/bmb-alert-center/bmb-alert-center.component.ts` — AlertCenter.figma.ts
- `ui-angular/src/lib/components/old/bmb-balance-overview/bmb-balance-overview.component.ts` — BalanceOverview.figma.ts
- `ui-angular/src/lib/components/old/bmb-bookmark/bmb-bookmark.component.ts` — Bookmark.figma.ts
- `ui-angular/src/lib/components/old/bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component.ts` — BottomNavigationBar.figma.ts
- `ui-angular/src/lib/components/old/bmb-breadcrumb/bmb-breadcrumb.component.ts` — Breadcrumb.figma.ts
- `ui-angular/src/lib/directives/old/bmb-button/button.directive.ts` — Button.figma.ts, ButtonGroupChevronItem.figma.ts, ButtonGroupItem.figma.ts, ButtonGroupSimpleItem.figma.ts
- `ui-angular/src/lib/directives/old/bmb-button-group/bmb-button-group.directive.ts` — ButtonGroup.figma.ts
- `ui-angular/src/lib/components/old/bmb-button-icon/bmb-button-icon.component.ts` — ButtonIcon.figma.ts
- `ui-angular/src/lib/components/old/bmb-calendar/bmb-calendar.component.ts` — Calendar.figma.ts
- `ui-angular/src/lib/components/old/bmb-chat-bar/bmb-chat-bar.component.ts` — ChatBar.figma.ts
- `ui-angular/src/lib/components/old/bmb-checkbox/bmb-checkbox.component.ts` — Checkbox.figma.ts
- `ui-angular/src/lib/components/old/bmb-chevron-title-selector/bmb-chevron-title-selector.component.ts` — ChevronTitleSelector.figma.ts
- `ui-angular/src/lib/components/bmb-container/bmb-container.component.ts` — Container.figma.ts
- `ui-angular/src/lib/components/old/bmb-container-button/bmb-container-button.component.ts` — ContainerButton.figma.ts
- `ui-angular/src/lib/components/old/bmb-date-range/bmb-date-range.component.ts` — DateRange.figma.ts
- `ui-angular/src/lib/components/old/bmb-datepicker/bmb-datepicker.component.ts` — Datepicker.figma.ts
- `ui-angular/src/lib/components/old/bmb-digital-id/bmb-digital-id.component.ts` — DigitalId.figma.ts
- `ui-angular/src/lib/components/bmb-divider/bmb-divider.component.ts` — Divider.figma.ts
- `ui-angular/src/lib/components/old/bmb-dot-paginator/bmb-dot-paginator.component.ts` — DotPaginator.figma.ts
- `ui-angular/src/lib/components/old/bmb-drawer-overlay/bmb-drawer-overlay.component.ts` — DrawerOverlay.figma.ts
- `ui-angular/src/lib/components/old/bmb-dropdown/bmb-dropdown.component.ts` — Dropdown.figma.ts
- `ui-angular/src/lib/components/old/bmb-dropdown-menu/bmb-dropdown-menu.component.ts` — DropdownMenu.figma.ts
- `ui-angular/src/lib/components/old/bmb-evaluation-rubric/bmb-evaluation-rubric.component.ts` — EvaluationRubric.figma.ts
- `ui-angular/src/lib/components/old/bmb-filter-card/bmb-filter-card.component.ts` — FilterCard.figma.ts
- `ui-angular/src/lib/components/old/bmb-focus-element/bmb-focus-element.component.ts` — FocusElement.figma.ts
- `ui-angular/src/lib/components/old/bmb-frequent-apps-selector/bmb-frequent-apps-selector.component.ts` — FrequentAppsSelector.figma.ts
- `ui-angular/src/lib/components/bmb-grade-value/bmb-grade-value.component.ts` — GradeValue.figma.ts
- `ui-angular/src/lib/components/old/bmb-grades/bmb-grades.component.ts` — Grades.figma.ts
- `ui-angular/src/lib/components/old/bmb-header-mobile/bmb-header-mobile.component.ts` — HeaderMobile.figma.ts
- `ui-angular/src/lib/components/old/bmb-hito-card/bmb-hito-card.component.ts` — HitoCard.figma.ts
- `ui-angular/src/lib/components/old/bmb-hito-list/bmb-hito-list.component.ts` — HitoList.figma.ts
- `ui-angular/src/lib/components/old/bmb-home-card/bmb-home-card.component.ts` — HomeCard.figma.ts
- `ui-angular/src/lib/components/old/bmb-home-section/bmb-home-section.component.ts` — HomeSection.figma.ts
- `ui-angular/src/lib/components/old/bmb-icon-item/bmb-icon-item.component.ts` — IconItem.figma.ts
- `ui-angular/src/lib/components/old/bmb-inner-header/bmb-inner-header.component.ts` — InnerHeader.figma.ts
- `ui-angular/src/lib/components/old/bmb-input/bmb-input.component.ts` — Input.figma.ts
- `ui-angular/src/lib/components/old/bmb-input-phone-number/bmb-input-phone-number.component.ts` — InputPhoneNumber.figma.ts
- `ui-angular/src/lib/components/old/bmb-input-tags/bmb-input-tags.component.ts` — InputTags.figma.ts
- `ui-angular/src/lib/components/old/bmb-interactive-icon/bmb-interactive-icon.component.ts` — InteractiveIcon.figma.ts
- `ui-angular/src/lib/components/old/bmb-invoice/bmb-invoice.component.ts` — Invoice.figma.ts
- `ui-angular/src/lib/components/bmb-legend/bmb-legend.component.ts` — Legend.figma.ts
- `ui-angular/src/lib/components/old/bmb-login/bmb-login.component.ts` — Login.figma.ts
- `ui-angular/src/lib/components/old/bmb-login-onboarding/bmb-login-onboarding.component.ts` — LoginOnboarding.figma.ts
- `ui-angular/src/lib/components/old/bmb-fab/bmb-fab.component.ts` — MainFab.figma.ts
- `ui-angular/src/lib/components/old/bmb-media-card/bmb-media-card.component.ts` — MediaCard.figma.ts
- `ui-angular/src/lib/components/old/bmb-mobile-templates/bmb-mobile-templates.component.ts` — MobileTemplateCalendar.figma.ts, MobileTemplateExternalLink.figma.ts
- `ui-angular/src/lib/components/old/bmb-modal/bmb-modal.component.ts` — Modal.figma.ts
- `ui-angular/src/lib/components/old/bmb-multi-dot-paginator/bmb-multi-dot-paginator.component.ts` — MultiDotPaginator.figma.ts
- `ui-angular/src/lib/components/old/bmb-navigation-bar/bmb-navigation-bar.component.ts` — NavigationBar.figma.ts
- `ui-angular/src/lib/components/old/bmb-notice-card/bmb-notice-card.component.ts` — NoticeCard.figma.ts
- `ui-angular/src/lib/components/old/bmb-notification-card/bmb-notification-card.component.ts` — NotificationCard.figma.ts
- `ui-angular/src/lib/components/bmb-overlay/bmb-overlay.component.ts` — Overlay.figma.ts
- `ui-angular/src/lib/components/old/bmb-paginator/bmb-paginator.component.ts` — Paginator.figma.ts
- `ui-angular/src/lib/components/old/bmb-profile/bmb-profile.component.ts` — Profile.figma.ts
- `ui-angular/src/lib/components/old/bmb-progress-bar/bmb-progress-bar.component.ts` — ProgressBar.figma.ts
- `ui-angular/src/lib/components/old/bmb-progress-cirlce/bmb-progress-circle.component.ts` — ProgressCircle.figma.ts
- `ui-angular/src/lib/components/bmb-pull-wedge/bmb-pull-wedge.component.ts` — PullWedge.figma.ts
- `ui-angular/src/lib/components/old/bmb-push-notification/bmb-push-notification.component.ts` — PushNotification.figma.ts
- `ui-angular/src/lib/components/old/bmb-radial/bmb-radial.component.ts` — Radial.figma.ts
- `ui-angular/src/lib/components/old/bmb-search-card/bmb-search-card.component.ts` — SearchCard.figma.ts
- `ui-angular/src/lib/components/old/bmb-search-input/bmb-search-input.component.ts` — SearchInput.figma.ts
- `ui-angular/src/lib/components/bmb-server-table/bmb-server-table.component.ts` — ServerTable.figma.ts
- `ui-angular/src/lib/components/old/bmb-sidebar/bmb-sidebar.component.ts` — Sidebar.figma.ts
- `ui-angular/src/lib/components/old/bmb-simple-header/bmb-simple-header.component.ts` — SimpleHeader.figma.ts
- `ui-angular/src/lib/components/old/bmb-sounds-card/bmb-sounds-card.component.ts` — SoundsCard.figma.ts
- `ui-angular/src/lib/components/old/bmb-icon-status/bmb-icon-status.component.ts` — StatusIcon.figma.ts
- `ui-angular/src/lib/components/old/bmb-step-progress-bar/bmb-step-progress-bar.component.ts` — StepProgressBar.figma.ts
- `ui-angular/src/lib/components/old/bmb-student-activity-card/bmb-student-activity-card.component.ts` — StudentActivityCard.figma.ts, StudentActivityCardListItem.figma.ts
- `ui-angular/src/lib/components/old/bmb-switch/bmb-switch.component.ts` — Switch.figma.ts
- `ui-angular/src/lib/components/old/bmb-tables/bmb-tables.component.ts` — Table.figma.ts
- `ui-angular/src/lib/components/old/bmb-table-lite/bmb-table-lite.component.ts` — TableLite.figma.ts
- `ui-angular/src/lib/components/old/bmb-tabs/bmb-tabs.component.ts` — Tabs.figma.ts
- `ui-angular/src/lib/components/old/bmb-tags/bmb-tags.component.ts` — Tag.figma.ts
- `ui-angular/src/lib/components/old/bmb-text-editor/bmb-text-editor.component.ts` — TextEditor.figma.ts
- `ui-angular/src/lib/components/old/bmb-text-link/bmb-text-link.component.ts` — TextLink.figma.ts
- `ui-angular/src/lib/components/old/bmb-timestream-card/bmb-timestream-card.component.ts` — TimestreamCard.figma.ts
- `ui-angular/src/lib/components/old/bmb-toast/bmb-toast.component.ts` — Toast.figma.ts
- `ui-angular/src/lib/components/old/bmb-tooltip/bmb-tooltip.component.ts` — Tooltip.figma.ts
- `ui-angular/src/lib/components/old/bmb-top-bar/bmb-top-bar.component.ts` — TopBar.figma.ts
- `ui-angular/src/lib/components/old/bmb-totp/bmb-totp.component.ts` — Totp.figma.ts
- `ui-angular/src/lib/components/old/bmb-user-summary/bmb-user-summary.component.ts` — UserSummary.figma.ts
- `ui-angular/src/lib/components/old/bmb-value-counter/bmb-value-counter.component.ts` — ValueCounter.figma.ts
- `ui-angular/src/lib/components/old/bmb-web-templates/bmb-web-templates.component.ts` — WebTemplates.figma.ts
