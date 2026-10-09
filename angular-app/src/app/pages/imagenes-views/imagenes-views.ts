import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

type RatioId = '21:9' | '16:9' | '4:3' | '1:1' | '4:5' | '9:16';
type ResolutionMode = 'auto' | 'preset' | 'custom';
type RatioMode = 'auto' | RatioId;

interface ImageVariant {
  id: RatioId;
  label: string;
  width: number;
  height: number;
  src: string;
}

interface Dimensions {
  width: number;
  height: number;
}

interface ViewportMetrics extends Dimensions {
  dpr: number;
}

interface ResolutionPreset {
  label: string;
  width: number;
  height: number;
}

const DEFAULT_IMAGES: ImageVariant[] = [
  {
    id: '21:9',
    label: 'Ultrawide',
    width: 2100,
    height: 900,
    src: '/ratio/01.png',
    // src: 'https://fastly.picsum.photos/id/1018/2100/900.jpg?hmac=a14kKXuLT-V8VbKWUOWVvKIjv4Oc0e3CqMw9k-a11io',
  },
  {
    id: '16:9',
    label: 'Horizontal',
    width: 1920,
    height: 1080,
    src: '/ratio/02.png',
    // src: 'https://fastly.picsum.photos/id/1018/1920/1080.jpg?hmac=Z-0vPrMvqfkGFzkq3vnamIQKXBk0KSXVxNIKXKCtW4I',
  },
  {
    id: '4:3',
    label: 'Clásico',
    width: 1200,
    height: 900,
    src: '/ratio/03.png',
    // src: 'https://fastly.picsum.photos/id/1018/1200/900.jpg?hmac=I6oPaqb012t4Cck6uSedjteQjjU-azErjRG2i-YYb4Q',
  },
  {
    id: '1:1',
    label: 'Cuadrado',
    width: 1000,
    height: 1000,
    src: '/ratio/04.png',
    // src: 'https://picsum.photos/id/1018/1000/1000',
  },
  {
    id: '4:5',
    label: 'Retrato',
    width: 800,
    height: 1000,
    src: '/ratio/05.png',
    // src: 'https://fastly.picsum.photos/id/1018/800/1000.jpg?hmac=opxs0rnwQJR-drdu70wFwssQH0sr_O9KFVzNnvfWw5M',
  },
  {
    id: '9:16',
    label: 'Vertical',
    width: 720,
    height: 1280,
    src: '/ratio/06.png',
    // src: 'https://picsum.photos/id/1018/720/1280',
  },
];

@Component({
  selector: 'app-imagenes-views',
  standalone: true,
  imports: [],
  templateUrl: './imagenes-views.html',
  styleUrl: './imagenes-views.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagenesViews {
  private readonly destroyRef = inject(DestroyRef);

  private readonly previewElement =
    viewChild<ElementRef<HTMLElement>>('previewContainer');
  private readonly viewportExampleElement = viewChild<ElementRef<HTMLElement>>(
    'viewportExampleContainer',
  );
  readonly viewportExampleSize = signal<Dimensions>({ width: 0, height: 0 });
  readonly viewportExampleFailed = signal(false);
  readonly viewportExampleWidth = signal(30);
  readonly viewportExampleHeight = signal(100);
  readonly viewportExampleRatio = computed(() =>
    this.calculateRatio(this.viewportExampleSize()),
  );
  private readonly viewportExampleLoadedImage = signal<{
    src: string;
    width: number;
    height: number;
  } | null>(null);
  readonly viewportExampleNaturalSize = computed(() => {
    const loaded = this.viewportExampleLoadedImage();
    return loaded?.src === this.viewportExampleImage()?.src ? loaded : null;
  });
  readonly viewportExampleNaturalRatio = computed(() => {
    const size = this.viewportExampleNaturalSize();
    return size ? this.calculateRatio(size) : 0;
  });
  onViewportExampleDimensionChange(
    dimension: 'width' | 'height',
    event: Event,
  ): void {
    const value = Number((event.target as HTMLInputElement).value);
    const target =
      dimension === 'width'
        ? this.viewportExampleWidth
        : this.viewportExampleHeight;
    if (Number.isFinite(value) && value > 0) {
      target.set(Math.min(100, value));
    }
  }
  onViewportExampleImageLoad(event: Event, src: string): void {
    const image = event.target as HTMLImageElement;
    this.viewportExampleLoadedImage.set({
      src,
      width: image.naturalWidth,
      height: image.naturalHeight,
    });
    this.viewportExampleFailed.set(false);
  }
  readonly viewportExampleImage = computed(() =>
    this.findClosestImage(this.calculateRatio(this.viewportExampleSize())),
  );

  readonly ratios: readonly RatioId[] = [
    '21:9',
    '16:9',
    '4:3',
    '1:1',
    '4:5',
    '9:16',
  ];

  readonly presets: readonly ResolutionPreset[] = [
    { label: 'Móvil vertical - 360 × 800', width: 360, height: 800 },
    { label: 'Móvil horizontal - 800 × 360', width: 800, height: 360 },
    { label: 'Tablet vertical - 768 × 1024', width: 768, height: 1024 },
    { label: 'Tablet horizontal - 1024 × 768', width: 1024, height: 768 },
    { label: 'Laptop - 1366 × 768', width: 1366, height: 768 },
    { label: 'Desktop FHD - 1920 × 1080', width: 1920, height: 1080 },
    { label: 'Desktop QHD - 2560 × 1440', width: 2560, height: 1440 },
    { label: 'Ultrawide - 3440 × 1440', width: 3440, height: 1440 },
  ];

  // --------------------------------------------------
  // Estado
  // --------------------------------------------------

  readonly images = signal<ImageVariant[]>(DEFAULT_IMAGES);

  readonly resolutionMode = signal<ResolutionMode>('auto');
  readonly ratioMode = signal<RatioMode>('auto');

  readonly customWidth = signal(1200);
  readonly customHeight = signal(675);

  readonly zoom = signal(100);

  readonly selectedPresetIndex = signal(0);

  readonly viewport = signal<ViewportMetrics>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  readonly container = signal<Dimensions>({
    width: 0,
    height: 0,
  });

  readonly imageFailed = signal(false);

  private resizeObserver?: ResizeObserver;

  // --------------------------------------------------
  // Dimensiones simuladas
  // --------------------------------------------------

  readonly simulatedSize = computed<Dimensions | null>(() => {
    const mode = this.resolutionMode();

    if (mode === 'auto') {
      return null;
    }

    const source =
      mode === 'preset'
        ? this.presets[this.selectedPresetIndex()]
        : {
            width: this.customWidth(),
            height: this.customHeight(),
          };

    if (!source) {
      return null;
    }

    const scale = this.zoom() / 100;

    return {
      width: Math.max(1, source.width / scale),
      height: Math.max(1, source.height / scale),
    };
  });

  readonly previewWidth = computed<string>(() => {
    const size = this.simulatedSize();

    return size ? `${size.width}px` : '100%';
  });

  readonly previewHeight = computed<string>(() => {
    const size = this.simulatedSize();

    return size ? `${size.height}px` : 'clamp(260px, 55dvh, 720px)';
  });

  // --------------------------------------------------
  // Aspect ratios
  // --------------------------------------------------

  readonly viewportRatio = computed(() => this.calculateRatio(this.viewport()));

  readonly containerRatio = computed(() =>
    this.calculateRatio(this.container()),
  );

  readonly activeRatio = computed(() => {
    const containerRatio = this.containerRatio();

    if (containerRatio > 0) {
      return containerRatio;
    }

    return this.viewportRatio();
  });

  // --------------------------------------------------
  // Selección inteligente
  // --------------------------------------------------

  readonly selectedImage = computed<ImageVariant | null>(() => {
    const images = this.images();

    if (!images.length) {
      return null;
    }

    const mode = this.ratioMode();

    if (mode !== 'auto') {
      return images.find((image) => image.id === mode) ?? null;
    }

    const targetRatio = this.activeRatio();

    if (targetRatio <= 0) {
      return images.find((image) => image.id === '16:9') ?? images[0];
    }

    return this.findClosestImage(targetRatio);
  });

  private findClosestImage(targetRatio: number): ImageVariant | null {
    const images = this.images();
    if (!images.length) return null;
    if (targetRatio <= 0) {
      return images.find((image) => image.id === '16:9') ?? images[0];
    }
    return images.reduce((best, current) => {
      const bestRatio = best.width / best.height;
      const currentRatio = current.width / current.height;

      const bestError = Math.abs(Math.log(bestRatio / targetRatio));
      const currentError = Math.abs(Math.log(currentRatio / targetRatio));

      if (currentError < bestError) {
        return current;
      }

      return best;
    });
  }

  readonly selectedRatio = computed(() => {
    const image = this.selectedImage();

    return image ? image.width / image.height : 0;
  });

  readonly ratioDifference = computed(() => {
    const targetRatio = this.activeRatio();
    const selectedRatio = this.selectedRatio();

    if (targetRatio <= 0 || selectedRatio <= 0) {
      return 0;
    }

    return Math.abs(Math.log(selectedRatio / targetRatio)) * 100;
  });

  readonly effectiveDpr = computed(() => {
    return Math.min(this.viewport().dpr, 2.5);
  });

  readonly requiredResolution = computed<Dimensions>(() => {
    const container = this.container();
    const dpr = this.effectiveDpr();

    return {
      width: Math.ceil(container.width * dpr),
      height: Math.ceil(container.height * dpr),
    };
  });

  readonly hasEnoughResolution = computed(() => {
    const image = this.selectedImage();
    const required = this.requiredResolution();

    if (!image || !required.width || !required.height) {
      return false;
    }

    return image.width >= required.width && image.height >= required.height;
  });

  readonly selectedImageUrl = computed(() => {
    return this.selectedImage()?.src ?? '';
  });

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------

  constructor() {
    afterNextRender({
      read: () => this.initializeObservers(),
    });
  }

  private initializeObservers(): void {
    const element = this.previewElement()?.nativeElement;

    if (!element) {
      return;
    }

    const updateViewport = (): void => {
      this.viewport.set({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio || 1,
      });
    };

    const viewportExample = this.viewportExampleElement()?.nativeElement;
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        const dimensions =
          entry.target === viewportExample
            ? this.viewportExampleSize
            : this.container;
        dimensions.update((previous) => {
          if (
            Math.abs(previous.width - width) < 0.5 &&
            Math.abs(previous.height - height) < 0.5
          ) {
            return previous;
          }

          return { width, height };
        });
      }
    });

    this.resizeObserver.observe(element);
    if (viewportExample) this.resizeObserver.observe(viewportExample);

    let dprQuery: MediaQueryList | undefined;

    const updateDprWatcher = (): void => {
      dprQuery?.removeEventListener('change', onDprChange);

      dprQuery = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`,
      );

      dprQuery.addEventListener('change', onDprChange);
    };

    const onDprChange = (): void => {
      updateViewport();
      updateDprWatcher();
    };

    updateViewport();
    updateDprWatcher();

    window.addEventListener('resize', updateViewport);

    window.visualViewport?.addEventListener('resize', updateViewport);

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();

      window.removeEventListener('resize', updateViewport);

      window.visualViewport?.removeEventListener('resize', updateViewport);

      dprQuery?.removeEventListener('change', onDprChange);
    });
  }

  // --------------------------------------------------
  // Acciones de controles
  // --------------------------------------------------

  setResolutionMode(value: string): void {
    if (value === 'auto' || value === 'preset' || value === 'custom') {
      this.resolutionMode.set(value);
    }
  }

  setRatioMode(value: string): void {
    if (value === 'auto' || this.isRatioId(value)) {
      this.ratioMode.set(value);
    }
  }

  setPreset(value: string): void {
    const index = Number(value);

    if (Number.isInteger(index) && index >= 0 && index < this.presets.length) {
      this.selectedPresetIndex.set(index);
      this.resolutionMode.set('preset');
    }
  }

  setCustomWidth(value: string): void {
    this.customWidth.set(this.parseDimension(value, 1200));
  }

  setCustomHeight(value: string): void {
    this.customHeight.set(this.parseDimension(value, 675));
  }

  setZoom(value: string): void {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      return;
    }

    this.zoom.set(Math.min(300, Math.max(50, parsed)));
  }

  updateImageSource(id: RatioId, src: string): void {
    this.images.update((images) =>
      images.map((image) =>
        image.id === id ? { ...image, src: src.trim() } : image,
      ),
    );
  }

  showImage(id: RatioId): void {
    this.ratioMode.set(id);
  }

  restoreAutomaticSelection(): void {
    this.ratioMode.set('auto');
  }

  restoreDefaults(): void {
    this.viewportExampleWidth.set(30);
    this.viewportExampleHeight.set(100);
    this.images.set(DEFAULT_IMAGES.map((image) => ({ ...image })));
    this.resolutionMode.set('auto');
    this.ratioMode.set('auto');
    this.zoom.set(100);
    this.customWidth.set(1200);
    this.customHeight.set(675);
    this.selectedPresetIndex.set(0);
    this.imageFailed.set(false);
  }

  onImageError(): void {
    this.imageFailed.set(true);
  }

  onImageLoad(): void {
    this.imageFailed.set(false);
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

  private calculateRatio(size: Dimensions): number {
    if (size.width <= 0 || size.height <= 0) {
      return 0;
    }

    return size.width / size.height;
  }

  private parseDimension(value: string, fallback: number): number {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed <= 0) {
      return fallback;
    }

    return Math.min(10000, Math.max(1, parsed));
  }

  private isRatioId(value: string): value is RatioId {
    return this.ratios.some((ratio) => ratio === value);
  }

  formatNumber(value: number): string {
    return Number.isFinite(value) ? value.toFixed(3) : '0.000';
  }

  formatDimension(value: number): string {
    return Math.round(value).toString();
  }

  // Template event adapters
  onResolutionChange(event: Event): void {
    this.setResolutionMode((event.target as HTMLSelectElement).value);
  }

  onPresetChange(event: Event): void {
    this.setPreset((event.target as HTMLSelectElement).value);
  }

  onRatioChange(event: Event): void {
    this.setRatioMode((event.target as HTMLSelectElement).value);
  }

  onWidthChange(event: Event): void {
    this.setCustomWidth((event.target as HTMLInputElement).value);
  }

  onHeightChange(event: Event): void {
    this.setCustomHeight((event.target as HTMLInputElement).value);
  }

  onZoomChange(event: Event): void {
    this.setZoom((event.target as HTMLInputElement).value);
  }

  onSourceChange(id: RatioId, event: Event): void {
    this.updateImageSource(id, (event.target as HTMLInputElement).value);
  }
}
