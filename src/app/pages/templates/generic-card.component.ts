import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BmbBadgeComponent,
  BmbBoxIconComponent,
  BmbButtonDirective,
  BmbButtonIconComponent,
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCardHeaderComponent,
  BmbImageComponent,
  BmbListGroupComponent,
  BmbListGroupItemComponent,
  BmbTooltipComponent,
} from '../../../../projects/ds-ng/src/public-api';

interface HomeCardItem {
  id: string;
  title: string;
  description: string;
}

interface AlertCardItem {
  appearance: 'warning' | 'error' | 'success' | 'info';
  icon: string;
  title: string;
  text: string;
}

interface GenericCardExample {
  components: string[];
  html: string;
  scss: string;
  typescript: string;
}

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [
    BmbBadgeComponent,
    BmbBoxIconComponent,
    BmbButtonDirective,
    BmbButtonIconComponent,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbCardHeaderComponent,
    BmbImageComponent,
    BmbListGroupComponent,
    BmbListGroupItemComponent,
    BmbTooltipComponent,
  ],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericCard {
  readonly informativeImage =
    'https://studio-assets.supernova.io/design-systems/74407/a2f82e86-1d59-4c28-8212-6e724b560249.png';

  readonly homeItems: HomeCardItem[] = Array.from({ length: 5 }, (_, index) => ({
    id: `home-card-${index + 1}`,
    title: 'Lorem ipsum dolor sit amet, consectetur',
    description: 'Subtitle',
  }));

  readonly fileItems: HomeCardItem[] = Array.from({ length: 5 }, (_, index) => ({
    id: `file-card-${index + 1}`,
    title: 'Nombre_Archivo.png',
    description: 'Descripcion del documento agregado',
  }));

  readonly alerts: AlertCardItem[] = [
    { appearance: 'warning', icon: 'warning', title: 'Title', text: 'Complementary text' },
    { appearance: 'error', icon: 'error', title: 'Title', text: 'Complementary text' },
    { appearance: 'success', icon: 'check_circle', title: 'Title', text: 'Complementary text' },
    { appearance: 'info', icon: 'info', title: 'Title', text: 'Complementary text' },
  ];

  readonly examples: Record<string, GenericCardExample> = {
    informative: {
      components: ['BmbCardComponent', 'BmbTooltipComponent', 'BmbBadgeComponent', 'BmbImageComponent', 'BmbButtonDirective'],
      html: '<bmb-card type="normal" borderRadius="m" margin="none">\n  <div class="card informative"><div class="content"><div class="labels">\n    <bmb-tooltip componentTitle="Information" text="Additional information" icon="info" />\n    <bmb-badge text="Badge" appearance="creative-violet" />\n  </div><h3>Title</h3><p>Complementary text</p><hr />\n  <p>Lorem ipsum dolor sit amet.</p>\n  <button bmbButton (click)="onAction($event)">Button</button></div>\n  <bmb-image [src]="imageUrl" alt="Building" /></div>\n</bmb-card>',
      scss: '.informative { display:grid; grid-template-columns:1.15fr .9fr; gap:1rem; padding:.75rem; background:#30364d; }\n@media(max-width:600px) { .informative { display:flex; flex-direction:column; } }',
      typescript: "imports: [BmbCardComponent, BmbTooltipComponent, BmbBadgeComponent, BmbImageComponent, BmbButtonDirective];\nimageUrl = 'YOUR_IMAGE_URL';\nonAction(event: MouseEvent): void { console.log(event); }",
    },
    flat: {
      components: ['BmbCardComponent', 'BmbBoxIconComponent'],
      html: '<bmb-card type="normal" borderRadius="m" margin="none"><div class="card flat">\n  <bmb-box-icon iconName="crop_16_9" boxShape="circle" boxSize="regular" boxColor="black-primary" />\n  <div><h3><span>1. </span>Title</h3><p>Complementary text+</p></div>\n</div></bmb-card>',
      scss: '.flat { display:flex; width:340px; min-height:78px; align-items:center; gap:.75rem; padding:1rem; border-radius:1rem; background:#30364d; }\n@media(max-width:600px) { .flat { width:146px; min-height:156px; flex-direction:column; justify-content:center; text-align:center; } }',
      typescript: 'imports: [BmbCardComponent, BmbBoxIconComponent];',
    },
    actions: {
      components: ['BmbCardComponent', 'BmbBoxIconComponent', 'BmbButtonDirective'],
      html: '<bmb-card type="normal" borderRadius="m" margin="none"><div class="card actions">\n  <bmb-box-icon iconName="crop_16_9" boxShape="circle" boxColor="black-primary" />\n  <div><h3>Title</h3><p>Text content</p></div>\n  <button bmbButton appearance="secondary-outlined" (click)="onAction($event)">Button</button>\n</div></bmb-card>',
      scss: '.actions { display:flex; width:340px; min-height:84px; align-items:center; gap:.75rem; padding:.75rem; border-radius:1rem; background:#30364d; }\n.actions div { flex:1; }\n@media(max-width:600px) { .actions { width:190px; min-height:228px; flex-direction:column; justify-content:center; } }',
      typescript: 'imports: [BmbCardComponent, BmbBoxIconComponent, BmbButtonDirective];\nonAction(event: MouseEvent): void { console.log(event); }',
    },
    home: {
      components: ['BmbCardComponent', 'BmbCardHeaderComponent', 'BmbCardContentComponent', 'BmbListGroupComponent', 'BmbListGroupItemComponent', 'BmbBadgeComponent', 'BmbButtonIconComponent'],
      html: '<bmb-card class="home" type="normal" borderRadius="xl" margin="none"><bmb-card-header><h3>Title</h3></bmb-card-header><bmb-card-content>\n  <div class="summary"><span>Lorem ipsum</span><span>0 / 00</span></div><bmb-list-group (selectionChange)="onSelection($event)">\n    @for (item of items; track item.id) {\n      <bmb-list-group-item [id]="item.id" [personalizedTemplate]="true"><div class="item"><div><h4>{{ item.title }}</h4><p>{{ item.description }}</p></div><bmb-badge text="Badge" appearance="blue-light" /></div></bmb-list-group-item>\n    }\n  </bmb-list-group>\n</bmb-card-content></bmb-card>',
      scss: '.home { width:370px; height:590px; overflow:hidden; border:2px solid #46506b; border-radius:1.5rem; background:#1f2230; }\n.summary,.item { display:flex; justify-content:space-between; padding:1.25rem; }\n.item { align-items:center; border:1px solid #65708d; border-radius:1rem; background:#30364d; }',
      typescript: "imports: [BmbCardComponent, BmbCardHeaderComponent, BmbCardContentComponent, BmbListGroupComponent, BmbListGroupItemComponent, BmbBadgeComponent];\nitems = [{ id: 'item-1', title: 'Lorem ipsum', description: 'Subtitle' }];\nonSelection(ids: string[]): void { console.log(ids); }",
    },
    empty: {
      components: ['BmbCardComponent', 'BmbCardHeaderComponent', 'BmbCardContentComponent', 'BmbBoxIconComponent', 'BmbButtonDirective'],
      html: '<bmb-card class="empty" type="normal" borderRadius="xl" margin="none"><bmb-card-header><h3>Title</h3></bmb-card-header><bmb-card-content><div class="summary"><span>Lorem ipsum</span><span>0 / 10</span></div><div class="content">\n  <bmb-box-icon iconName="thumb_up" boxShape="circle" boxColor="transparent" />\n  <h3>Title</h3><p>Lorem ipsum dolor sit amet.</p>\n  <button bmbButton appearance="primary" (click)="onAction($event)">Button</button>\n</div></bmb-card-content></bmb-card>',
      scss: '.empty { width:360px; height:566px; border:2px solid #46506b; border-radius:1.5rem; background:#1f2230; }\n.summary { display:flex; justify-content:space-between; padding:1.25rem; }\n.content { display:flex; height:75%; flex-direction:column; align-items:center; justify-content:center; gap:1.5rem; }',
      typescript: 'imports: [BmbCardComponent, BmbCardHeaderComponent, BmbCardContentComponent, BmbBoxIconComponent, BmbButtonDirective];\nonAction(event: MouseEvent): void { console.log(event); }',
    },
    alert: {
      components: ['BmbCardComponent', 'BmbBoxIconComponent'],
      html: '@for (alert of alerts; track alert.appearance) {\n  <bmb-card type="transparent" borderRadius="none" margin="none"><div class="alert alert--{{ alert.appearance }}"><bmb-box-icon [iconName]="alert.icon" boxShape="circle" boxColor="transparent" /><div><h3>{{ alert.title }}</h3><p>{{ alert.text }}</p></div></div></bmb-card>\n}',
      scss: '.alert { display:flex; min-height:68px; gap:.5rem; padding:.75rem 1rem; border:1px solid; background:#1f2230; }\n.alert--warning { border-color:#e5bd36; } .alert--error { border-color:#e34b54; } .alert--success { border-color:#3ab795; } .alert--info { border-color:#c7cad6; }',
      typescript: "imports: [BmbCardComponent, BmbBoxIconComponent];\nalerts = [{ appearance: 'warning', icon: 'warning', title: 'Title', text: 'Complementary text' }];",
    },
  };

  lastAction = '';
  lastEvent?: Event;

  handleButtonClick(event: MouseEvent, action: string): void {
    this.lastEvent = event;
    this.lastAction = action;
  }

  handleIconButtonClick(event: MouseEvent, item: HomeCardItem): void {
    this.lastEvent = event;
    this.lastAction = `Abrir ${item.title}`;
  }

  handleListSelection(ids: string[]): void {
    this.lastAction = ids.length ? `Seleccion: ${ids.join(', ')}` : '';
  }
}
