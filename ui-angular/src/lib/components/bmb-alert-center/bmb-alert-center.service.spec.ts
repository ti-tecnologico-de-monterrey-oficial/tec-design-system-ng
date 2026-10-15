import { BmbAlertCenterService } from './bmb-alert-center.service';
import type { IBmbDataAlert } from './types';

describe('BmbAlertCenterService', () => {
  let service: BmbAlertCenterService;

  const alerts: IBmbDataAlert[] = [
    {
      id: 1,
      title: 'First alert',
      description: [{ text: 'First', type: 'paragraph' }],
      date: '13/10/2026',
      time: '09:00',
      isRead: false,
      isFavorite: false,
      isArchived: false,
      type: 'notification',
    },
    {
      id: 2,
      title: 'Second alert',
      description: [{ text: 'Second', type: 'paragraph' }],
      date: '13/10/2026',
      time: '10:00',
      isRead: true,
      isFavorite: true,
      isArchived: false,
      type: 'notification',
    },
  ];

  beforeEach(() => {
    service = new BmbAlertCenterService();
  });

  it('sets, retrieves, adds, updates, and removes alerts', () => {
    service.setAlerts([alerts[0]]);
    service.addAlerts([alerts[1]]);

    expect(service.getAlerts()).toEqual(alerts);

    service.updateAlerts([{ ...alerts[0], isRead: true, title: 'Updated' }]);
    expect(service.getAlerts()).toEqual([
      { ...alerts[0], isRead: true, title: 'Updated' },
      alerts[1],
    ]);

    service.removeAlert(1);
    expect(service.getAlerts()).toEqual([alerts[1]]);
  });

  it('keeps alerts unchanged when an update has no matching ids', () => {
    service.setAlerts([alerts[0]]);
    service.updateAlerts([alerts[1]]);

    expect(service.getAlerts()).toEqual([alerts[0]]);
  });

  it('sets, retrieves, adds, and updates advertisements', () => {
    service.setAdvertisements([alerts[0]]);
    service.addAdvertisements([alerts[1]]);

    expect(service.getAdvertisements()).toEqual(alerts);

    service.updateAdvertisements([
      { ...alerts[0], title: 'Updated advertisement' },
    ]);
    expect(service.getAdvertisements()).toEqual([
      { ...alerts[0], title: 'Updated advertisement' },
      alerts[1],
    ]);
  });

  it('keeps advertisements unchanged when an update has no matching ids', () => {
    service.setAdvertisements([alerts[0]]);
    service.updateAdvertisements([alerts[1]]);

    expect(service.getAdvertisements()).toEqual([alerts[0]]);
  });

  it('tracks the loading state', () => {
    expect(service.getLoadingState()).toBe(false);

    service.setLoadingState(true);
    expect(service.getLoadingState()).toBe(true);

    service.setLoadingState(false);
    expect(service.getLoadingState()).toBe(false);
  });
});
