import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSoundsCardComponent } from './bmb-sounds-card.component';

describe('BmbSoundsCardComponent', () => {
  let component: BmbSoundsCardComponent;
  let fixture: ComponentFixture<BmbSoundsCardComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbSoundsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paint the track background on init based on the default volume', () => {
    expect(component.trackInput?.style.background).toContain(
      'linear-gradient',
    );
    expect(component.percentage).toBe(component.internalVolume / 100);
  });

  it('should toggle play/pause and emit handlePlay', () => {
    jest.spyOn(component.handlePlay, 'emit');

    component.handlePlayPause();

    expect(component.isPlaying).toBe(true);
    expect(component.handlePlay.emit).toHaveBeenCalledWith(true);

    component.handlePlayPause();

    expect(component.isPlaying).toBe(false);
    expect(component.handlePlay.emit).toHaveBeenCalledWith(false);
  });

  it('should update the volume and repaint the track on volume change', () => {
    jest.spyOn(component.handlevolume, 'emit');
    const input = document.createElement('input');
    input.value = '80';

    component.onVolumeChange({ target: input } as unknown as Event);

    expect(component.internalVolume).toBe(80);
    expect(component.percentage).toBe(0.8);
    expect(component.trackInput?.style.background).toContain(
      'linear-gradient',
    );
    expect(component.handlevolume.emit).toHaveBeenCalledWith(80);
  });

  it('should mute, save the previous volume, and restore it on unmute', () => {
    jest.spyOn(component.handleMute, 'emit');
    const input = document.createElement('input');
    input.value = '60';
    component.onVolumeChange({ target: input } as unknown as Event);

    component.handleMuteVolume();

    expect(component.isMuted).toBe(true);
    expect(component.saveVolume).toBe(60);
    expect(component.internalVolume).toBe(0);
    expect(component.handleMute.emit).toHaveBeenCalledWith(true);

    component.handleMuteVolume();

    expect(component.isMuted).toBe(false);
    expect(component.internalVolume).toBe(60);
    expect(component.handleMute.emit).toHaveBeenCalledWith(false);
  });
});
