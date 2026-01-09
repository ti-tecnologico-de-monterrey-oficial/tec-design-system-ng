import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  OnInit,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbMediaCardComponent } from '../bmb-media-card/bmb-media-card.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-sounds-card',
  standalone: true,
  imports: [CommonModule, BmbMediaCardComponent, BmbIconComponent],
  templateUrl: './bmb-sounds-card.component.html',
  styleUrl: './bmb-sounds-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSoundsCardComponent implements AfterViewInit {
  title = input<string>('');
  subtitle = input<string>('');
  width = input<string>('250px');
  ratio = input<string>('8/9');

  handlevolume = output<number>();
  handlePlay = output<boolean>();
  handleMute = output<boolean>();

  isPlaying: boolean = false;
  isMuted: boolean = false;
  internalVolume: number = 50;
  saveVolume: number = 0;
  trackInput: HTMLInputElement | null = null;
  percentage: number = 0;

  @ViewChild('rangeVolume', { read: ElementRef })
  rangeVolume?: ElementRef<any>;

  ngAfterViewInit(): void {
    this.trackInput = this.rangeVolume?.nativeElement;
    this.percentage = this.internalVolume / 100;
    this.trackInput!.style.background = `linear-gradient(to right, RGBA(var( --blue-mariner-700)) ${this.percentage * 100}%, RGBA(var(--gray-charade-50)) ${this.percentage * 100}%)`;
  }

  onVolumeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.internalVolume = +inputElement.value;
    this.percentage = this.internalVolume / 100;
    this.trackInput!.style.background = `linear-gradient(to right, RGBA(var(--blue-mariner-700)) ${this.percentage * 100}%, RGBA(var(--gray-charade-50)) ${this.percentage * 100}%)`;
    this.handlevolume.emit(this.internalVolume);
  }

  handlePlayPause() {
    this.isPlaying = !this.isPlaying;
    this.handlePlay.emit(this.isPlaying);
  }

  handleMuteVolume() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.saveVolume = this.internalVolume;
      this.internalVolume = 0;
      this.percentage = this.internalVolume / 100;
      this.trackInput!.style.background = `linear-gradient(to right, RGBA(var(--blue-mariner-700)) ${this.percentage * 100}%, RGBA(var(--gray-charade-50)) ${this.percentage * 100}%)`;
    } else {
      this.internalVolume = this.saveVolume;
      this.percentage = this.internalVolume / 100;
      this.trackInput!.style.background = `linear-gradient(to right, RGBA(var(--blue-mariner-700)) ${this.percentage * 100}%, RGBA(var(--gray-charade-50)) ${this.percentage * 100}%)`;
    }
    this.handleMute.emit(this.isMuted);
  }
}
