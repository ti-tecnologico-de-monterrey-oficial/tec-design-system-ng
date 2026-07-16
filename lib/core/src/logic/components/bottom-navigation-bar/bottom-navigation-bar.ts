// import { IBmbActionHeader } from '../../../../types';

// export type IBmbFooterEvent =
//   | 'back'
//   | 'forward'
//   | 'share'
//   | 'reload';

// export type IBmbNavigationBarIcon = {
//   name: string;
//   label: string;
//   eventName?: IBmbFooterEvent;
//   dotNotification?: number;
// };

// export type IBmbNavigationBarIcons = {
//   one: IBmbNavigationBarIcon;
//   two: IBmbNavigationBarIcon;
//   three: IBmbNavigationBarIcon;
//   four: IBmbNavigationBarIcon;
// };

// export const buildNavigationElement = (
//   element: IBmbNavigationBarIcon,
//   eventName: IBmbFooterEvent,
// ): IBmbNavigationBarIcon => {
//   const newElement = { ...element };

//   if (newElement.eventName !== eventName) {
//     newElement.eventName = eventName;
//   }

//   return newElement;
// };

// export const buildNavigationElements = (
//   icons: IBmbNavigationBarIcons,
// ): IBmbNavigationBarIcon[] => [
//   buildNavigationElement(icons.one, 'back'),
//   buildNavigationElement(icons.two, 'forward'),
//   buildNavigationElement(icons.three, 'share'),
//   buildNavigationElement(icons.four, 'reload'),
// ];

// export const buildActionHeaders = (
//   elements: IBmbNavigationBarIcon[],
//   callback: (event: IBmbFooterEvent) => void,
// ): IBmbActionHeader[] =>
//   elements.map((element) => ({
//     icon: element.name,
//     action: () => callback(element.eventName!),
//     alt: element.label,
//   }));
