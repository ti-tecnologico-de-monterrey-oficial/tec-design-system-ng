export interface AccordionState {
  disabled: boolean;
  expanded: boolean;
  active: boolean;
}

export function getInitialAccordionState(
  states: Record<string, boolean> | null | undefined,
  id: string,
  index: number,
): AccordionState {
  if (!states || Object.keys(states).length === 0)
    return { disabled: false, expanded: index === 0, active: index === 0 };
  const expanded = !!states[id];
  return { disabled: !expanded, expanded, active: expanded };
}

export function getOpenedAccordionState(
  id: string,
  openId: string,
  controlled: boolean,
): AccordionState {
  const expanded = id === openId;
  return { disabled: !expanded && controlled, expanded, active: expanded };
}
