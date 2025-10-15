import { TabsService } from './tabs.service';
import { IBmbTab } from '../../components/bmb-tabs/bmb-tabs.component';

describe('TabsService', () => {
  let service: TabsService;

  beforeEach(() => {
    service = new TabsService();
    service.resetTabs(); // Reset state before each test
  });

  it('debe inicializar con lista de pestañas vacía y pestaña seleccionada nula', (done) => {
    service.tabs$.subscribe(tabs => {
      expect(tabs).toEqual([]);
      done();
    });
    service.selectedTab$.subscribe(tab => {
      expect(tab).toBeNull();
    });
  });

  it('debe actualizar la lista de pestañas', (done) => {
    const tabs: IBmbTab[] = [
      { title: 'Inicio', id: 1 },
      { title: 'Perfil', id: 2 },
    ];
    service.setTabs(tabs);
    service.tabs$.subscribe(result => {
      expect(result).toEqual(tabs);
      done();
    });
  });

  it('debe seleccionar una pestaña', (done) => {
    const tab: IBmbTab = { title: 'Inicio', id: 1 };
    service.selectTab(tab);
    service.selectedTab$.subscribe(selected => {
      expect(selected).toEqual(tab);
      done();
    });
  });

  it('debe resetear la lista de pestañas y la selección', (done) => {
    const tabs: IBmbTab[] = [{ title: 'Inicio', id: 1 }];
    service.setTabs(tabs);
    service.selectTab(tabs[0]);
    service.resetTabs();
    service.tabs$.subscribe(result => {
      expect(result).toEqual([]);
      done();
    });
    service.selectedTab$.subscribe(selected => {
      expect(selected).toBeNull();
    });
  });
});
