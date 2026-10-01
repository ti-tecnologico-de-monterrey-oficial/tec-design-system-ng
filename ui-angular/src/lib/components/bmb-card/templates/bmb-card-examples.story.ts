import { BmbHomeCardComponent } from '../../bmb-home-card/bmb-home-card.component';
import { BmbProgressCircleComponent } from '../../bmb-progress-cirlce/bmb-progress-circle.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import type { StoryObj } from '@storybook/angular';
import { getCardViewportStoryParameters } from './bmb-card-template-story.utils';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbTooltipComponent } from '../../bmb-tooltip/bmb-tooltip.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbFocusElementComponent } from '../../bmb-focus-element/bmb-focus-element.component';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

export const CARD_EXAMPLES = {
  empty: `<bmb-home-card
    componentTitle="Title"
    [showRightButton]="false"
    contentPadding="l"
  >
    <div
      bmbVerticalLayout
      margin="none"
      gapSize="l"
      alignItems="stretch"
      layoutHeight="100%"
    >
      <div bmbVerticalLayoutItem>
        <div
          bmbLayout
          margin="none"
          gapSize="m"
          justify="spaceBetween"
          alignItems="center"
          [avoidRowWrap]="true"
        >
          <span bmbLayoutItem>Lorem ipsum</span>
          <span bmbLayoutItem>0 / <small>10</small></span>
        </div>
      </div>

      <div bmbVerticalLayoutItem [rowGrow]="1" [disableScroll]="true">
        <div
          bmbVerticalLayout
          margin="none"
          gapSize="xl"
          justify="center"
          alignItems="center"
          layoutHeight="100%"
        >
          <bmb-icon
            bmbVerticalLayoutItem
            [isFullWidth]="false"
            icon="thumb_up"
            [size]="80"
            alt="Sin elementos"
          />

          <bmb-title
            bmbVerticalLayoutItem
            componentTitle="Title"
            titleSize="8"
            titleFontWeight="700"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
            subtitleSize="4"
            subtitleFontWeight="400"
            [isCenterContent]="true"
          />

          <div bmbVerticalLayoutItem [isFullWidth]="false">
            <button
              BmbButtonDirective
              bmbButton
              appearance="primary"
              size="large"
              (click)="handleButtonClick($event)"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  </bmb-home-card>`,
  informative: `<section
    bmbVerticalLayout
    margin="none"
    gapSize="none"
    [alignItems]="isInformativeMobile() ? 'center' : 'start'"
    [style.display]="isInformativeMobile() ? 'flex' : 'inline-flex'"
  >
    <bmb-card type="normal" borderRadius="l" [margin]="[]">
      <bmb-card-content padding="m">
        <div
          bmbLayout
          margin="none"
          [gapSize]="isInformativeMobile() ? 'm' : 'xl'"
          alignItems="stretch"
          [flow]="{ m: 'row', l: 'reverse', xl: 'reverse' }"
        >
          <bmb-image
            bmbLayoutItem
            [colSm]="4"
            [colLg]="5"
            [src]="informativeImage"
            alt="Edificio de Rectoría del Tecnológico de Monterrey"
            [borderRadius]="isInformativeMobile() ? 'none' : 'm'"
            objectFit="cover"
          />

          <div bmbLayoutItem [colSm]="4" [colLg]="7">
            <div
              bmbVerticalLayout
              margin="none"
              [class.bmb_margin-none]="false"
              gapSize="l"
              justify="start"
              alignItems="stretch"
            >
              <div bmbVerticalLayoutItem>
                <div
                  bmbVerticalLayout
                  margin="none"
                  gapSize="s"
                  justify="start"
                  alignItems="stretch"
                >
                  <section bmbVerticalLayoutItem>
                    <div
                      bmbLayout
                      margin="none"
                      [class.bmb_margin-none]="false"
                      gapSize="s"
                      alignItems="center"
                      [avoidRowWrap]="true"
                    >
                      <bmb-tooltip
                        bmbLayoutItem
                        icon="info"
                        text="Additional information"
                        componentTitle="Information"
                        [size]="20"
                      />
                      <bmb-badge
                        bmbLayoutItem
                        text="Badge"
                        appearance="creative-use-violet"
                        [container]="true"
                      />
                    </div>
                  </section>
                  <bmb-title
                    componentTitle="Title"
                    titleSize="9"
                    titleFontWeight="700"
                    subtitle="Complementary text"
                    subtitleSize="5"
                    subtitleFontWeight="400"
                    bmbVerticalLayoutItem
                  />
                  <bmb-divider [removeMargin]="true" bmbVerticalLayoutItem />
                </div>
              </div>
              <p
                bmbVerticalLayoutItem
                [class.font-regular-3]="isInformativeMobile()"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                volutpat rhoncus leo vel pharetra. Donec feugiat enim pharetra
                ipsum euismod, sed maximus justo pharetra.
              </p>

              <div bmbVerticalLayoutItem>
                <div
                  bmbLayout
                  margin="none"
                  [class.bmb_margin-none]="false"
                  gapSize="l"
                  alignItems="center"
                  [flow]="isInformativeMobile() ? 'reverse' : 'row'"
                >
                  <div bmbLayoutItem [isDynamicItem]="!isInformativeMobile()" [colSm]="isInformativeMobile() ? 4 : null">
                    <button
                      bmbButton
                      appearance="primary"
                      [size]="isInformativeMobile() ? 'large' : 'small'"
                      (click)="handleButtonClick($event)"
                    >
                      Button
                    </button>
                  </div>
                  <div bmbLayoutItem [isDynamicItem]="!isInformativeMobile()" [colSm]="isInformativeMobile() ? 4 : null">
                    <button
                      bmbButton
                      appearance="secondary-outlined"
                      [size]="isInformativeMobile() ? 'large' : 'small'"
                      (click)="handleButtonClick($event)"
                    >
                      Secondary button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </bmb-card-content>
    </bmb-card>
  </section>`,
  'informative-balance': `<section bmbLayout margin="none" gapSize="m" alignItems="start" >
    <bmb-card type="secondary" bmbLayoutItem [colSm]="4" [colLg]="4" borderRadius="m">
      <bmb-card-content>
        <div
          bmbVerticalLayout
          margin="none"
          gapSize="m"
          alignItems="center"
        >
          <div bmbVerticalLayoutItem>
            <div
              bmbVerticalLayout
              margin="none"
              gapSize="s"
              alignItems="stretch"
            >
              <div bmbVerticalLayoutItem>
                <div
                  bmbLayout
                  margin="none"
                  gapSize="s"
                  justify="spaceBetween"
                  alignItems="center"
                  [avoidRowWrap]="true"
                >
                  <bmb-title
                    bmbLayoutItem
                    componentTitle="Título corto"
                    titleSize="5"
                    titleFontWeight="400"
                  />
                  <button
                    bmbLayoutItem
                    bmbButton
                    type="button"
                    appearance="transparent"
                    size="small"
                    icon="zoom_out_map"
                    [iconSize]="18"
                    iconAlt="Ampliar balance"
                    aria-label="Ampliar balance"
                    (click)="handleButtonClick($event)"
                  ></button>
                </div>
              </div>
              <bmb-divider bmbVerticalLayoutItem [removeMargin]="true" />
            </div>
          </div>
          <div bmbVerticalLayoutItem>
            <div
              bmbVerticalLayout
              margin="none"
              gapSize="m"
              alignItems="center"
            >
              <bmb-progress-circle
                bmbVerticalLayoutItem
                [isFullWidth]="false"
                size="small"
                [percent]="75"
                valueLabel="0000"
                [showValueLabel]="true"
                [showBackground]="true"
                aria-label="Balance: 0000, progreso 75 por ciento"
              />
              <bmb-title
                bmbVerticalLayoutItem
                componentTitle="Text"
                titleSize="3"
                titleFontWeight="400"
                [isCenterContent]="true"
              />
            </div>
          </div>
        </div>
      </bmb-card-content>
    </bmb-card>
  </section>`,
  'informative-media-expanded-vertical': `<section bmbLayout margin="none" gapSize="none" alignItems="start">
    <div bmbLayoutItem [colSm]="4" [colLg]="4" [colXl]="4">
      <bmb-card borderRadius="m" margin="none">
        <bmb-card-content>
          <div
            bmbVerticalLayout
            margin="none"
            gapSize="m"
            alignItems="stretch"
          >
            <bmb-image
              bmbVerticalLayoutItem
              [src]="informativeImage"
              alt="Edificio de Rectoría del Tecnológico de Monterrey"
              ratio="2 / 1"
              borderRadius="l"
              objectFit="cover"
            />
            <div bmbVerticalLayoutItem>
              <div
                bmbVerticalLayout
                margin="none"
                gapSize="s"
                alignItems="stretch"
              >
                <bmb-title
                  bmbVerticalLayoutItem
                  componentTitle="Texto principal largo (máximo 2 líneas o 3 sin contenido complementario)"
                  titleSize="7"
                  titleFontWeight="400"
                />
                <div bmbVerticalLayoutItem>
                  <div
                    bmbLayout
                    margin="none"
                    gapSize="s"
                    alignItems="center"
                    [avoidRowWrap]="true"
                    role="group"
                    aria-label="Etiquetas"
                  >
                    <bmb-badge
                      bmbLayoutItem
                      text="Badge"
                      appearance="creative-use-violet"
                    />
                    <bmb-badge
                      bmbLayoutItem
                      text="Badge"
                      appearance="creative-use-emerald"
                    />
                  </div>
                </div>
              </div>
            </div>
            <p bmbVerticalLayoutItem class="font-regular-3">
              Resumen de texto en diferentes idiomas con las consideraciones
              especificadas para más contenido el cual puede ir hasta en 4
              líneas de texto largo lorem ipsum lorem ipsum lore...
            </p>
            <div bmbVerticalLayoutItem>
              <div
                bmbLayout
                margin="none"
                gapSize="s"
                justify="spaceBetween"
                alignItems="center"
                [avoidRowWrap]="true"
              >
                <div bmbLayoutItem>
                  <div
                    bmbLayout
                    margin="none"
                    gapSize="xs"
                    alignItems="center"
                    [avoidRowWrap]="true"
                  >
                    <bmb-icon
                      bmbLayoutItem
                      icon="thumb_up"
                      [size]="16"
                      alt="Votos"
                    />
                    <small bmbLayoutItem>100 votos</small>
                  </div>
                </div>
                <small bmbLayoutItem>ID: 1234</small>
              </div>
            </div>
          </div>
        </bmb-card-content>
      </bmb-card>
    </div>
  </section>`,
  'informative-media-detail-vertical': `<section bmbLayout margin="none" gapSize="none" alignItems="start">
    <div bmbLayoutItem [colSm]="4" [colLg]="4" [colXl]="4">
      <bmb-card type="normal" borderRadius="l" margin="none">
        <bmb-card-content>
          <div
            bmbVerticalLayout
            margin="none"
            gapSize="m"
            alignItems="stretch"
          >
            <bmb-image
              bmbVerticalLayoutItem
              [src]="informativeImage"
              alt="Edificio de Rectoría del Tecnológico de Monterrey"
              ratio="5 / 2"
              borderRadius="m"
              objectFit="cover"
            />

            <div bmbVerticalLayoutItem>
              <div
                bmbLayout
                margin="none"
                gapSize="s"
                alignItems="center"
                [horizontalScroll]="true"
                role="group"
                aria-label="Etiquetas"
                tabindex="0"
              >
                <bmb-badge
                  bmbLayoutItem
                  text="Badge"
                  appearance="creative-use-violet"
                />
                <bmb-badge
                  bmbLayoutItem
                  text="Badge"
                  appearance="creative-use-hibiscus"
                />
              </div>
            </div>

            <bmb-title
              bmbVerticalLayoutItem
              componentTitle="Title"
              titleSize="7"
              titleFontWeight="400"
            />

            <p bmbVerticalLayoutItem class="font-regular-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              volutpat rhoncus leo vel pharetra. Donec feugiat enim pharetra
              ipsum euismod, sed.
            </p>

            <div bmbVerticalLayoutItem>
              <div
                bmbLayout
                margin="none"
                gapSize="none"
                justify="end"
                alignItems="center"
              >
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
  </section>`,
  'informative-media-detail-horizontal': `<section bmbLayout margin="none" gapSize="none" alignItems="start">
    <div bmbLayoutItem [colSm]="4" [colLg]="6" [colXl]="6">
      <bmb-card type="normal" borderRadius="m" margin="none">
        <bmb-card-content padding="none">
          <div
            bmbLayout
            margin="none"
            gapSize="none"
            alignItems="stretch"
            [avoidRowWrap]="true"
            style="border-radius: var(--bmb-radius-m); overflow: hidden;"
          >
            <bmb-image
              [src]="informativeImage"
              alt="Edificio del Tecnológico de Monterrey"
              borderRadius="none"
              objectFit="cover"
              bmbLayoutItem
              [isDynamicItem]="true"
              ratio="3/4"
              [colGrow]="1"
            />
            <div
              bmbLayoutItem
              [isDynamicItem]="true"
              [colGrow]="2"
            >
              <bmb-card-content padding="m">
                <div
                  bmbVerticalLayout
                  margin="none"
                  gapSize="s"
                  alignItems="stretch"
                  layoutHeight="100%"
                >
                  <div bmbVerticalLayoutItem>
                    <div
                      bmbLayout
                      margin="none"
                      gapSize="s"
                      alignItems="center"
                      [horizontalScroll]="true"
                      role="group"
                      aria-label="Etiquetas"
                      tabindex="0"
                    >
                      <bmb-badge
                        bmbLayoutItem
                        text="Badge"
                        appearance="creative-use-violet"
                      />
                      <bmb-badge
                        bmbLayoutItem
                        text="Badge"
                        appearance="creative-use-hibiscus"
                      />
                    </div>
                  </div>
                  <bmb-title
                    bmbVerticalLayoutItem
                    componentTitle="Title"
                    titleSize="7"
                    titleFontWeight="400"
                  />
                  <p
                    bmbVerticalLayoutItem
                    class="font-regular-3"
                    [rowGrow]="1"
                    [disableScroll]="true"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce volutpat rhoncus leo vel pharetra. Donec feugiat
                    enim pharetra ipsum euismod, sed.
                  </p>
                  <div bmbVerticalLayoutItem>
                    <div
                      bmbLayout
                      margin="none"
                      gapSize="none"
                      justify="end"
                      alignItems="center"
                    >
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
  </section>`,
  'informative-media-simple': `<section bmbLayout margin="none" gapSize="none" alignItems="start">
    <div bmbLayoutItem [colSm]="4" [colLg]="4" [colXl]="4">
      <bmb-card type="secondary" borderRadius="m" margin="none">
        <bmb-card-content>
          <div
            bmbVerticalLayout
            margin="none"
            gapSize="m"
            alignItems="stretch"
          >
            <bmb-image
              bmbVerticalLayoutItem
              [src]="informativeImage"
              alt="Edificio del Tecnológico de Monterrey"
              ratio="12 / 5"
              borderRadius="l"
              objectFit="cover"
            />

            <p bmbVerticalLayoutItem class="font-regular-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
            </p>

            <p bmbVerticalLayoutItem class="font-regular-4">Lorem ipsum dolor</p>

            <p bmbVerticalLayoutItem class="font-regular-4">Lorem ipsum dolor</p>

            <div bmbVerticalLayoutItem>
              <div
                bmbLayout
                margin="none"
                gapSize="s"
                justify="spaceBetween"
                alignItems="center"
                [avoidRowWrap]="true"
              >
                <div bmbLayoutItem [isDynamicItem]="true" [colGrow]="1">
                  <div
                    bmbLayout
                    margin="none"
                    gapSize="s"
                    alignItems="center"
                    [horizontalScroll]="true"
                    role="group"
                    aria-label="Etiquetas"
                    tabindex="0"
                  >
                    <bmb-badge
                      bmbLayoutItem
                      text="Badge"
                      appearance="creative-use-violet"
                    />
                    <bmb-badge
                      bmbLayoutItem
                      text="Badge"
                      appearance="creative-use-hibiscus"
                    />
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
  </section>`,
  'informative-media-simple-horizontal': `<section bmbLayout margin="none" gapSize="none" alignItems="start">
    <div bmbLayoutItem [colSm]="4" [colLg]="6" [colXl]="6">
      <bmb-card type="transparent" borderRadius="l" margin="none">
        <bmb-card-content padding="l">
          <div
            bmbVerticalLayout
            margin="none"
            gapSize="l"
            alignItems="stretch"
          >
            <div bmbVerticalLayoutItem>
              <div
                bmbLayout
                margin="none"
                gapSize="m"
                alignItems="stretch"
                [avoidRowWrap]="true"
              >
                <div bmbLayoutItem>
                  <div
                    bmbVerticalLayout
                    margin="none"
                    gapSize="none"
                    layoutHeight="100%"
                  >
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
                  <div
                    bmbVerticalLayout
                    margin="none"
                    gapSize="s"
                    justify="spaceBetween"
                    alignItems="stretch"
                    layoutHeight="100%"
                  >
                    <div bmbVerticalLayoutItem>
                      <div
                        bmbLayout
                        margin="none"
                        gapSize="none"
                        justify="end"
                        alignItems="center"
                      >
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
                      <div
                        bmbLayout
                        margin="none"
                        gapSize="s"
                        alignItems="center"
                        [avoidRowWrap]="true"
                        [horizontalScroll]="true"
                        role="group"
                        aria-label="Etiquetas"
                        tabindex="0"
                      >
                        <bmb-badge
                          bmbLayoutItem
                          text="semantic-info-event"
                          appearance="semantic-info-event"
                        />
                        <bmb-badge
                          bmbLayoutItem
                          text="semantic-success"
                          appearance="semantic-success"
                        />
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
              <div
                bmbLayout
                margin="none"
                gapSize="none"
                justify="end"
                alignItems="center"
              >
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
  </section>`,
  'informative-focus-element': `<section bmbLayout margin="none" gapSize="none" alignItems="start">
    <div bmbLayoutItem [colSm]="4" [colLg]="3" [colXl]="3">
      <bmb-card type="normal" borderRadius="m" margin="none">
        <bmb-card-content padding="m">
          <div
            bmbVerticalLayout
            margin="none"
            gapSize="s"
            alignItems="center"
          >
            <bmb-title
              bmbVerticalLayoutItem
              componentTitle="Title"
              titleSize="6"
              titleFontWeight="400"
              subtitle="Subtitle"
              subtitleSize="5"
              subtitleFontWeight="400"
              [isCenterContent]="true"
            />
            <bmb-focus-element
              bmbVerticalLayoutItem
              [isFullWidth]="false"
              [number]="1"
              [isCurrentColor]="true"
              [isInheritedBg]="false"
              componentTitle="Title"
            />
          </div>
        </bmb-card-content>
      </bmb-card>
    </div>
  </section>`,
  'informative-item-list': `<section bmbVerticalLayout
      margin="none"
      gapSize="m"
      alignItems="stretch"
      role="list"
    >
    @for (item of informativeItems; track item.id; let last = $last) {
      <div bmbVerticalLayoutItem role="listitem">
        <div
          bmbLayout
          margin="s"
          gapSize="s"
          [alignItems]="
            isItemListMobile() && item.stackedMobileActions
              ? 'stretch'
              : 'center'
          "
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
            <div
              bmbVerticalLayout
              margin="none"
              gapSize="xs"
              alignItems="stretch"
            >
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
              <div
                bmbVerticalLayout
                margin="none"
                gapSize="s"
                justify="spaceBetween"
                alignItems="end"
                layoutHeight="100%"
              >
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
              <div
                bmbLayout
                margin="none"
                gapSize="s"
                alignItems="center"
                [avoidRowWrap]="true"
              >
                <bmb-badge
                  bmbLayoutItem
                  text="Badge"
                  appearance="semantic-success"
                />
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
  </section>`,
} as const;

export type CardExampleVariant = keyof typeof CARD_EXAMPLES;

// Storybook-only host: keeps examples independent of angular-app.
@Component({
  selector: 'bmb-card-example',
  standalone: true,
  imports: [
    BmbHomeCardComponent,
    BmbProgressCircleComponent,
    BmbIconComponent,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbBadgeComponent,
    BmbImageComponent,
    BmbTitleComponent,
    BmbTooltipComponent,
    BmbFocusElementComponent,
    BmbDividerComponent,
    BmbButtonDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  template: `@switch (variant()) {
    @case ('empty') {
      ${CARD_EXAMPLES.empty}
    }
    @case ('informative') {
      ${CARD_EXAMPLES.informative}
    }
    @case ('informative-balance') {
      ${CARD_EXAMPLES['informative-balance']}
    }
    @case ('informative-media-expanded-vertical') {
      ${CARD_EXAMPLES['informative-media-expanded-vertical']}
    }
    @case ('informative-media-detail-vertical') {
      ${CARD_EXAMPLES['informative-media-detail-vertical']}
    }
    @case ('informative-media-detail-horizontal') {
      ${CARD_EXAMPLES['informative-media-detail-horizontal']}
    }
    @case ('informative-media-simple') {
      ${CARD_EXAMPLES['informative-media-simple']}
    }
    @case ('informative-media-simple-horizontal') {
      ${CARD_EXAMPLES['informative-media-simple-horizontal']}
    }
    @case ('informative-focus-element') {
      ${CARD_EXAMPLES['informative-focus-element']}
    }
    @case ('informative-item-list') {
      ${CARD_EXAMPLES['informative-item-list']}
    }
  }`,
  styleUrl: './bmb-card-examples.story.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCardExampleComponent {
  variant = input<CardExampleVariant>('informative-media-detail-vertical');
  readonly isInformativeMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(width < 1001px)')
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  readonly isItemListMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(width < 1001px)')
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  readonly informativeItems = [
    {
      id: 1,
      stackedMobileActions: true,
      showSubtitle: true,
      showComplement: true,
    },
    {
      id: 2,
      stackedMobileActions: true,
      showSubtitle: true,
      showComplement: true,
    },
    {
      id: 3,
      stackedMobileActions: false,
      showSubtitle: true,
      showComplement: true,
    },
    {
      id: 4,
      stackedMobileActions: false,
      showSubtitle: true,
      showComplement: true,
    },
    {
      id: 5,
      stackedMobileActions: false,
      showSubtitle: true,
      showComplement: true,
    },
    {
      id: 6,
      stackedMobileActions: false,
      showSubtitle: false,
      showComplement: false,
    },
  ];

  readonly informativeImage =
    'https://conecta.tec.mx/sites/default/files/inline-images/tec-de-monterrey.webp';

  handleButtonClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}

const getCardTemplateSource = (sourceCode: string): string => {
  const docsSection = sourceCode.match(
    /^<section aria-labelledby="[^\"]+">\s*<h2[^>]*>[\s\S]*?<\/h2>([\s\S]*)<\/section>$/,
  );

  return docsSection ? docsSection[1].trim() : sourceCode;
};

export function cardExampleStory(
  variant: CardExampleVariant,
  isMobile = false,
): StoryObj<BmbCardExampleComponent> {
  return {
    args: { variant },
    render: (args) => ({
      props: args,
      template: '<bmb-card-example [variant]="variant" />',
    }),
    ...getCardViewportStoryParameters(
      isMobile,
      getCardTemplateSource(CARD_EXAMPLES[variant]),
    ),
  };
}
