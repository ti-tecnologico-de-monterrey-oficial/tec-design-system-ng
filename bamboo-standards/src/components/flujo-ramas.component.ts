import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BmbAccordionSimpleTextComponent } from '../../../ui-angular/src/lib/components/bmb-accordion/bmb-accordion-simple-text/bmb-accordion-simple-text.component';
import { BmbBadgeComponent } from '../../../ui-angular/src/lib/components/bmb-badge/bmb-badge.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCardFooterComponent,
  BmbCardHeaderComponent,
} from '../../../ui-angular/src/lib/components/bmb-card/bmb-card.component';
import { BmbLayoutDirective } from '../../../ui-angular/src/lib/directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../ui-angular/src/lib/directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../ui-angular/src/lib/directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../ui-angular/src/lib/directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbDividerComponent } from '../../../ui-angular/src/lib/components/bmb-divider/bmb-divider.component';
import { BmbSimpleTextComponent } from '../../../ui-angular/src/lib/components/bmb-simple-text/bmb-simple-text.component';
import { BmbTagComponent } from '../../../ui-angular/src/lib/components/bmb-tags/bmb-tags.component';
import { BmbTextLinkComponent } from '../../../ui-angular/src/lib/components/bmb-text-link/bmb-text-link.component';
import { BmbTitleComponent } from '../../../ui-angular/src/lib/components/bmb-title/bmb-title.component';

@Component({
  selector: 'bamboo-flujo-ramas',
  standalone: true,
  imports: [
    BmbAccordionSimpleTextComponent,
    BmbBadgeComponent,
    BmbCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbCardFooterComponent,
    BmbDividerComponent,
    BmbSimpleTextComponent,
    BmbTagComponent,
    BmbTextLinkComponent,
    BmbTitleComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="not-content" bmbVerticalLayout gapSize="m">
      <div bmbVerticalLayoutItem>
        <bmb-title
          componentTitle="Flujo de trabajo por ticket"
          subtitle="Tres pasos para llevar un cambio de la rama del ticket al despliegue"
        />
      </div>

      <div bmbVerticalLayoutItem>
        <div
          bmbLayout
          gapSize="s"
          margin="s"
          alignItems="center"
          justify="center"
        >
          <bmb-tag bmbLayoutItem text="develop" appearance="success" />
          <bmb-tag bmbLayoutItem text="DS-XXXX" appearance="info" />
          <bmb-tag bmbLayoutItem text="feature-prod" appearance="warning" />
        </div>
      </div>

      <bmb-divider bmbVerticalLayoutItem />

      <div bmbVerticalLayoutItem>
        <div bmbVerticalLayout gapSize="m" margin="none">
          @for (paso of pasos; track paso.numero) {
            <bmb-card bmbVerticalLayoutItem margin="none" [rowGrow]="1">
              <bmb-card-header>
                <section
                  bmbLayout
                  margin="none"
                  gapSize="m"
                  alignItems="center"
                  [dynamicCols]="true"
                >
                  <bmb-badge
                    [text]="'Paso ' + paso.numero"
                    [appearance]="paso.color"
                    bmbLayoutItem
                  />
                  <bmb-title
                    [componentTitle]="paso.titulo"
                    titleSize="4"
                    bmbLayoutItem
                  />
                </section>
              </bmb-card-header>
              <bmb-card-content>
                <bmb-simple-text
                  [text]="paso.descripcion"
                  [showFullText]="true"
                />
              </bmb-card-content>
              <bmb-card-footer padding="xl" />
            </bmb-card>
          }
        </div>
      </div>

      <bmb-divider bmbVerticalLayoutItem />

      <div bmbVerticalLayoutItem>
        <div bmbVerticalLayout gapSize="s">
          <bmb-title
            bmbVerticalLayoutItem
            componentTitle="Preguntas frecuentes"
            titleSize="4"
          />
          @for (faq of preguntas; track faq.titulo) {
            <bmb-accordion-simple-text
              bmbVerticalLayoutItem
              [titleContent]="faq.titulo"
              [textContent]="faq.texto"
            />
          }
        </div>
      </div>

      <bmb-text-link
        bmbVerticalLayoutItem
        textLink="Más información sobre Pull Requests"
        link="https://docs.github.com/es/pull-requests"
      />
    </div>
  `,
})
export class FlujoRamasComponent {
  readonly pasos = [
    {
      numero: 1,
      color: 'info',
      titulo: 'Crea la rama del ticket desde develop',
      descripcion:
        'Usa el identificador de Jira en el nombre de la rama (por ejemplo DS-XXXX) y haz ahí tus commits.',
    },
    {
      numero: 2,
      color: 'warning',
      titulo: 'Abre el primer PR de tu rama a feature-prod',
      descripcion:
        'Un colega revisa el código. Al integrarlo, se hacen las pruebas en feature-prod y QA da el visto bueno.',
    },
    {
      numero: 3,
      color: 'success',
      titulo: 'Abre el segundo PR de la misma rama a develop',
      descripcion:
        'Este PR también pasa por revisión. Una vez integrado, el cambio queda en la rama desde la que se hace el despliegue. Guarda la rama del ticket hasta completar este paso.',
    },
  ];

  readonly preguntas = [
    {
      titulo: '¿Cuándo puedo borrar la rama del ticket?',
      texto:
        'Solo después de que el segundo PR a develop esté integrado. Hasta entonces la rama debe conservarse.',
    },
    {
      titulo: '¿Qué pasa si QA encuentra un error?',
      texto:
        'Corrige en la misma rama del ticket, agrega los commits y actualiza el PR a feature-prod para repetir revisión y pruebas.',
    },
  ];
}
