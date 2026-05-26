import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAdvertisementCardComponent } from './bmb-advertisement-card.component';
import { ComponentRef } from '@angular/core';
import { IBmbAdvertisementData } from './types';

describe('BmbAdvertisementCardComponent', () => {
  let component: BmbAdvertisementCardComponent;
  let fixture: ComponentFixture<BmbAdvertisementCardComponent>;
  let componentRef: ComponentRef<BmbAdvertisementCardComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbAdvertisementCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default data', () => {
    const data: IBmbAdvertisementData = {
      promociones: [
        {
          imgData: {
            url: '',
            alt: 'Imagen',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: '',
            labelBtn: 'ACTION',
          },
        },
      ],
      avisos: [
        {
          imgData: {
            url: '',
            alt: 'Imagen',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: '',
          },
        },
      ],
      informacion: [
        {
          imgData: {
            url: '',
            alt: 'Imagen',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: '',
          },
        },
      ],
    };
    componentRef.setInput('data', data);
    expect(component.data()?.promociones.length).toBe(1);
    expect(component.data()?.avisos.length).toBe(1);
    expect(component.data()?.informacion.length).toBe(1);
  });

  it('should have default title and subtitle', () => {
    expect(component.componentTitle()).toBe('');
    expect(component.subtitle()).toBe('');
  });

  it('should initialize tabsData correctly', () => {
    expect(component.tabsData.length).toBe(3);
    expect(component.tabsData[0].title).toBe('Promociones');
    expect(component.tabsData[1].title).toBe('Avisos');
    expect(component.tabsData[2].title).toBe('Información');
  });

  it('should toggle expanded state', () => {
    component.expanded = true;
    expect(component.expanded).toBeTrue();
  });

  it('should set selectedTabId correctly', () => {
    component.selectedTabId = 1;
    expect(component.selectedTabId).toBe(1);
  });

  it('should render the correct title and description', () => {
    const data: IBmbAdvertisementData = {
      promociones: [
        {
          imgData: {
            url: '',
            alt: 'Imagen',
          },
          content: {
            title: 'Test Title',
            description: 'Test Description',
          },
        },
      ],
      avisos: [],
      informacion: [],
    };

    componentRef.setInput('data', data);
    component.expanded = true;
    component.selectedTabId = 1;

    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h3');
    const descriptionElement = fixture.nativeElement.querySelector('p');

    expect(titleElement.textContent).toContain('Test Title');
    expect(descriptionElement.textContent).toContain('Test Description');
  });
});
