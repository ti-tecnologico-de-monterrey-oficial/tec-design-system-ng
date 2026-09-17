import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import type { StoryObj } from '@storybook/angular';
import { BmbCardComponent, BmbCardContentComponent } from '../bmb-card.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbFocusElementComponent } from '../../bmb-focus-element/bmb-focus-element.component';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

export const CARD_EXAMPLES = {
  'informative-media-detail-vertical': `<section aria-labelledby="informative-media-detail-vertical">
    <h2 id="informative-media-detail-vertical">Informative Media Detail Vertical</h2>

    <div bmbLayout margin="none" gapSize="none" alignItems="start">
      <div bmbLayoutItem [colSm]="4" [colLg]="4" [colXl]="4">
        <bmb-card type="normal" borderRadius="l" margin="none">
          <bmb-card-content padding="l">
            <div bmbVerticalLayout margin="none" gapSize="m" alignItems="stretch">
              <bmb-image
                bmbVerticalLayoutItem
                [src]="informativeImage"
                alt="Edificio de Rectoría del Tecnológico de Monterrey"
                ratio="5 / 2"
                borderRadius="l"
                objectFit="cover"
              />

              <div bmbVerticalLayoutItem>
                <div bmbLayout margin="none" gapSize="s" alignItems="center" [horizontalScroll]="true" role="group" aria-label="Etiquetas" tabindex="0">
                  <bmb-badge bmbLayoutItem text="Badge" appearance="creative-use-violet" />
                  <bmb-badge bmbLayoutItem text="Badge" appearance="creative-use-hibiscus" />
                </div>
              </div>

              <bmb-title
                bmbVerticalLayoutItem
                componentTitle="Title"
                titleSize="6"
                titleFontWeight="400"
              />

              <p bmbVerticalLayoutItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                volutpat rhoncus leo vel pharetra. Donec feugiat enim pharetra
                ipsum euismod, sed.
              </p>

              <div bmbVerticalLayoutItem>
                <div bmbLayout margin="none" gapSize="none" justify="end" alignItems="center">
                  <button
                    bmbButton
                    type="button"
                    appearance="transparent"
                    size="small"
                    icon="open_in_new"
                    [iconSize]="24"
                    iconAlt="Abrir detalle"
                    aria-label="Abrir detalle"
                    (click)="handleButtonClick($event)"
                  ></button>
                </div>
              </div>
            </div>
          </bmb-card-content>
        </bmb-card>
      </div>
    </div>
  </section>`,
  'informative-media-detail-horizontal': `<section aria-labelledby="informative-media-detail-horizontal">
    <h2 id="informative-media-detail-horizontal">Informative Media Detail Horizontal</h2>
    <div bmbLayout margin="none" gapSize="none" alignItems="start">
      <div bmbLayoutItem [colSm]="4" [colLg]="6" [colXl]="6">
        <bmb-card type="normal" borderRadius="l" margin="none">
          <bmb-card-content padding="none">
            <div bmbLayout margin="none" gapSize="none" alignItems="stretch" [avoidRowWrap]="true">
              <div bmbLayoutItem [isDynamicItem]="true" [colGrow]="1" [colLg]="4" [colXl]="4">
                <bmb-image
                  [src]="informativeImage"
                  alt="Edificio del Tecnológico de Monterrey"
                  borderRadius="none"
                  objectFit="cover"
                />
              </div>
              <div bmbLayoutItem [isDynamicItem]="true" [colGrow]="2" [colLg]="8" [colXl]="8">
                <bmb-card-content padding="m">
                  <div bmbVerticalLayout margin="none" gapSize="m" alignItems="stretch" layoutHeight="100%">
                    <div bmbVerticalLayoutItem>
                      <div bmbLayout margin="none" gapSize="s" alignItems="center" [horizontalScroll]="true" role="group" aria-label="Etiquetas" tabindex="0">
                        <bmb-badge bmbLayoutItem text="Badge" appearance="creative-use-violet" />
                        <bmb-badge bmbLayoutItem text="Badge" appearance="creative-use-hibiscus" />
                      </div>
                    </div>
                    <bmb-title bmbVerticalLayoutItem componentTitle="Title" titleSize="6" titleFontWeight="400" />
                    <p bmbVerticalLayoutItem [rowGrow]="1" [disableScroll]="true">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Fusce volutpat rhoncus leo vel pharetra. Donec feugiat enim
                      pharetra ipsum euismod, sed.
                    </p>
                    <div bmbVerticalLayoutItem>
                      <div bmbLayout margin="none" gapSize="none" justify="end" alignItems="center">
                        <button
                          bmbButton
                          type="button"
                          appearance="transparent"
                          size="small"
                          icon="open_in_new"
                          [iconSize]="24"
                          iconAlt="Abrir detalle"
                          aria-label="Abrir detalle"
                          (click)="handleButtonClick($event)"
                        ></button>
                      </div>
                    </div>
                  </div>
                </bmb-card-content>
              </div>
            </div>
          </bmb-card-content>
        </bmb-card>
      </div>
    </div>
  </section>`,
  'informative-media-simple': `<section aria-labelledby="informative-media-simple">
    <h2 id="informative-media-simple">Informative Media Simple</h2>

    <div bmbLayout margin="none" gapSize="none" alignItems="start">
      <div bmbLayoutItem [colSm]="4" [colLg]="4" [colXl]="4">
        <bmb-card type="transparent" borderRadius="l" margin="none">
          <bmb-card-content padding="l">
            <div bmbVerticalLayout margin="none" gapSize="xl" alignItems="stretch">
              <bmb-image
                bmbVerticalLayoutItem
                [src]="informativeImage"
                alt="Edificio del Tecnológico de Monterrey"
                ratio="12 / 5"
                borderRadius="l"
                objectFit="cover"
              />

              <p bmbVerticalLayoutItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
              </p>

              <p bmbVerticalLayoutItem>Lorem ipsum dolor</p>

              <p bmbVerticalLayoutItem>Lorem ipsum dolor</p>

              <div bmbVerticalLayoutItem>
                <div bmbLayout margin="none" gapSize="s" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true">
                  <div bmbLayoutItem [isDynamicItem]="true" [colGrow]="1">
                    <div bmbLayout margin="none" gapSize="s" alignItems="center" [horizontalScroll]="true" role="group" aria-label="Etiquetas" tabindex="0">
                      <bmb-badge bmbLayoutItem text="Badge" appearance="creative-use-violet" />
                      <bmb-badge bmbLayoutItem text="Badge" appearance="creative-use-hibiscus" />
                    </div>
                  </div>
                  <button
                    bmbButton
                    type="button"
                    appearance="transparent"
                    size="small"
                    icon="open_in_new"
                    [iconSize]="24"
                    iconAlt="Abrir detalle"
                    aria-label="Abrir detalle"
                    (click)="handleButtonClick($event)"
                  ></button>
                </div>
              </div>
            </div>
          </bmb-card-content>
        </bmb-card>
      </div>
    </div>
  </section>`,
  'informative-media-simple-horizontal': `<section aria-labelledby="informative-media-simple-horizontal">
    <h2 id="informative-media-simple-horizontal">Informative Media Simple Horizontal</h2>

    <div bmbLayout margin="none" gapSize="none" alignItems="start">
      <div bmbLayoutItem [colSm]="4" [colLg]="6" [colXl]="6">
        <bmb-card type="transparent" borderRadius="l" margin="none">
          <bmb-card-content padding="l">
            <div bmbVerticalLayout margin="none" gapSize="l" alignItems="stretch">
              <div bmbVerticalLayoutItem>
                <div bmbLayout margin="none" gapSize="m" alignItems="stretch" [avoidRowWrap]="true">
                  <div bmbLayoutItem>
                    <div bmbVerticalLayout margin="none" gapSize="none" layoutHeight="100%">
                      <bmb-image
                        [src]="informativeImage"
                        alt="Edificio del Tecnológico de Monterrey"
                        width="5rem"
                        ratio="1 / 1"
                        borderRadius="m"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div bmbLayoutItem [isDynamicItem]="true" [colGrow]="1">
                    <div bmbVerticalLayout margin="none" gapSize="s" justify="spaceBetween" alignItems="stretch" layoutHeight="100%">
                      <div bmbVerticalLayoutItem>
                        <div bmbLayout margin="none" gapSize="none" justify="end" alignItems="center">
                          <button
                            bmbButton
                            type="button"
                            appearance="transparent"
                            size="small"
                            icon="more_vert"
                            [iconSize]="24"
                            iconAlt="Más opciones"
                            aria-label="Más opciones"
                            (click)="handleButtonClick($event)"
                          ></button>
                        </div>
                      </div>
                      <div bmbVerticalLayoutItem>
                        <div bmbLayout margin="none" gapSize="s" alignItems="center" [avoidRowWrap]="true" [horizontalScroll]="true" role="group" aria-label="Etiquetas" tabindex="0">
                          <bmb-badge bmbLayoutItem text="semantic-info-event" appearance="semantic-info-event" />
                          <bmb-badge bmbLayoutItem text="semantic-success" appearance="semantic-success" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <bmb-title
                bmbVerticalLayoutItem
                componentTitle="Title"
                titleSize="6"
                titleFontWeight="700"
                subtitle="Subtitle (optional)"
                subtitleSize="6"
                subtitleFontWeight="400"
              />

              <p bmbVerticalLayoutItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                volutpat rhoncus leo vel pharetra.
              </p>

              <div bmbVerticalLayoutItem>
                <div bmbLayout margin="none" gapSize="none" justify="end" alignItems="center">
                  <div bmbLayoutItem>
                    <button
                      bmbButton
                      type="button"
                      appearance="transparent"
                      size="large"
                      icon="arrow_forward"
                      position="right"
                      (click)="handleButtonClick($event)"
                    >
                      Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </bmb-card-content>
        </bmb-card>
      </div>
    </div>
  </section>`,
  'informative-focus-element': `<section aria-labelledby="informative-focus-element">
    <h2 id="informative-focus-element">Informative FocusElement</h2>

    <div bmbLayout margin="none" gapSize="none" alignItems="start">
      <div bmbLayoutItem [colSm]="4" [colLg]="3" [colXl]="3">
        <bmb-card type="normal" borderRadius="l" margin="none">
          <bmb-card-content padding="l">
            <div bmbVerticalLayout margin="none" gapSize="m" alignItems="center">
              <bmb-title
                bmbVerticalLayoutItem
                componentTitle="Title"
                titleSize="8"
                titleFontWeight="400"
                subtitle="Subtitle"
                subtitleSize="6"
                subtitleFontWeight="400"
                [isCenterContent]="true"
              />
              <bmb-focus-element
                bmbVerticalLayoutItem
                [isFullWidth]="false"
                [number]="1"
                [isCurrentColor]="true"
                componentTitle="Title"
              />
            </div>
          </bmb-card-content>
        </bmb-card>
      </div>
    </div>
  </section>`,
  'informative-item-list': `<section aria-labelledby="informative-item-list">
    <h2 id="informative-item-list">Informative ItemList</h2>

    <div bmbVerticalLayout margin="none" gapSize="m" alignItems="stretch" role="list">
      @for (item of informativeItems; track item.id; let last = $last) {
        <div bmbVerticalLayoutItem role="listitem">
          <div
            bmbLayout
            margin="s"
            gapSize="s"
            [alignItems]="isItemListMobile() && item.stackedMobileActions ? 'stretch' : 'center'"
            [avoidRowWrap]="true"
          >
            <div bmbLayoutItem>
              <div>
                <bmb-image
                  [src]="informativeImage"
                  alt="Edificio del Tecnológico de Monterrey"
                  width="2.25rem"
                  ratio="1 / 1"
                  borderRadius="xs"
                  objectFit="cover"
                />
              </div>
            </div>

            <div bmbLayoutItem [isDynamicItem]="true" [colGrow]="1">
              <div bmbVerticalLayout margin="none" gapSize="xs" alignItems="stretch">
                <bmb-title
                  bmbVerticalLayoutItem
                  componentTitle="Título de noticia del nombre de el recurso y una segunda línea"
                  titleSize="4"
                  titleFontWeight="400"
                  [subtitle]="item.showSubtitle ? 'Subtitle' : undefined"
                  subtitleSize="4"
                  subtitleFontWeight="400"
                />
                @if (item.showComplement) {
                  <span bmbVerticalLayoutItem>Complimentary text</span>
                }
              </div>
            </div>

            @if (isItemListMobile() && item.stackedMobileActions) {
              <div bmbLayoutItem>
                <div bmbVerticalLayout margin="none" gapSize="s" justify="spaceBetween" alignItems="end" layoutHeight="100%">
                  <div bmbVerticalLayoutItem [isFullWidth]="false">
                    <bmb-badge text="Badge" appearance="semantic-success" />
                  </div>
                  <div bmbVerticalLayoutItem [isFullWidth]="false">
                    <button
                      bmbButton
                      type="button"
                      appearance="transparent"
                      size="micro"
                      icon="open_in_new"
                      [iconSize]="20"
                      [attr.aria-label]="'Abrir recurso ' + item.id"
                      iconAlt="Abrir recurso"
                      (click)="handleButtonClick($event)"
                    ></button>
                  </div>
                </div>
              </div>
            } @else {
              <div bmbLayoutItem>
                <div bmbLayout margin="none" gapSize="s" alignItems="center" [avoidRowWrap]="true">
                  <bmb-badge bmbLayoutItem text="Badge" appearance="semantic-success" />
                  <div bmbLayoutItem>
                    <button
                      bmbButton
                      type="button"
                      appearance="transparent"
                      size="micro"
                      icon="open_in_new"
                      [iconSize]="20"
                      [attr.aria-label]="'Abrir recurso ' + item.id"
                      iconAlt="Abrir recurso"
                      (click)="handleButtonClick($event)"
                    ></button>
                  </div>
                </div>
              </div>
            }
          </div>
          @if (!last) {
            <bmb-divider [removeMargin]="true" />
          }
        </div>
      }
    </div>
  </section>`,
} as const;

export type CardExampleVariant = keyof typeof CARD_EXAMPLES;

// Storybook-only host: keeps examples independent of angular-app.
@Component({
  selector: 'bmb-card-example',
  standalone: true,
  imports: [BmbCardComponent, BmbCardContentComponent, BmbBadgeComponent,
    BmbImageComponent, BmbTitleComponent, BmbFocusElementComponent,
    BmbDividerComponent, BmbButtonDirective, BmbLayoutDirective,
    BmbLayoutItemDirective, BmbVerticalLayoutDirective, BmbVerticalLayoutItemDirective],
  template: `@switch (variant()) {
  @case ('informative-media-detail-vertical') { ${CARD_EXAMPLES['informative-media-detail-vertical']} }
  @case ('informative-media-detail-horizontal') { ${CARD_EXAMPLES['informative-media-detail-horizontal']} }
  @case ('informative-media-simple') { ${CARD_EXAMPLES['informative-media-simple']} }
  @case ('informative-media-simple-horizontal') { ${CARD_EXAMPLES['informative-media-simple-horizontal']} }
  @case ('informative-focus-element') { ${CARD_EXAMPLES['informative-focus-element']} }
  @case ('informative-item-list') { ${CARD_EXAMPLES['informative-item-list']} }
}`,
  styleUrl: './bmb-card-examples.story.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCardExampleComponent {
  variant = input<CardExampleVariant>('informative-media-detail-vertical');
  readonly isItemListMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(width < 1001px)')
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  readonly informativeItems = [
    { id: 1, stackedMobileActions: true, showSubtitle: true, showComplement: true },
    { id: 2, stackedMobileActions: true, showSubtitle: true, showComplement: true },
    { id: 3, stackedMobileActions: false, showSubtitle: true, showComplement: true },
    { id: 4, stackedMobileActions: false, showSubtitle: true, showComplement: true },
    { id: 5, stackedMobileActions: false, showSubtitle: true, showComplement: true },
    { id: 6, stackedMobileActions: false, showSubtitle: false, showComplement: false },
  ];

  readonly informativeImage =
    'https://conecta.tec.mx/sites/default/files/inline-images/tec-de-monterrey.webp';

  handleButtonClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}

export function cardExampleStory(variant: CardExampleVariant, mobile = false): StoryObj<BmbCardExampleComponent> {
  return {
    args: { variant },
    render: (args) => ({ props: args, template: '<bmb-card-example [variant]="variant" />' }),
    globals: { viewport: { value: mobile ? 'small' : 'extra', isRotated: false } },
    parameters: {
      layout: 'padded',
      docs: { source: { code: CARD_EXAMPLES[variant], language: 'html' } },
    },
  };
}
