import { Injectable, signal } from "@angular/core";
import { IBmbDataAlert } from "./types";

@Injectable({
  providedIn: "root",
})
export class BmbAlertCenterService {
  private alerts = signal<IBmbDataAlert[]>([]);
  private advertisements = signal<IBmbDataAlert[]>([]);
  private isLoading = signal<boolean>(false);

  constructor() {}

  // Methods to manage alerts

  setAlerts(alerts: IBmbDataAlert[]) {
    this.alerts.set(alerts);
  }

  updateAlerts(alertList: IBmbDataAlert[]) {
    const newAlerts = this.alerts().map((alert) => {
      const updatedAlert = alertList.find((a) => a.id === alert.id);
      return updatedAlert ? { ...alert, ...updatedAlert } : alert;
    });

    this.alerts.set(newAlerts);
  }

  addAlerts(alerts: IBmbDataAlert[]) {
    this.alerts.update((currentAlerts) => [...currentAlerts, ...alerts]);
  }

  getAlerts() {
    return this.alerts();
  }

  // Methods to manage advertisements

  setAdvertisements(advertisements: IBmbDataAlert[]) {
    this.advertisements.set(advertisements);
  }

  updateAdvertisements(advertisements: IBmbDataAlert[]) {
    const newAds = this.advertisements().map((ad) => {
      const updatedAd = advertisements.find((a) => a.id === ad.id);
      return updatedAd ? { ...ad, ...updatedAd } : ad;
    });

    this.advertisements.set(newAds);
  }

  addAdvertisements(advertisements: IBmbDataAlert[]) {
    this.advertisements.update((currentAds) => [...currentAds, ...advertisements]);
  }

  getAdvertisements() {
    return this.advertisements();
  }

  // Methods to manage loading state

  getLoadingState(): boolean {
    return this.isLoading();
  }

  setLoadingState(loading: boolean) {
    this.isLoading.set(loading);
  }
}
