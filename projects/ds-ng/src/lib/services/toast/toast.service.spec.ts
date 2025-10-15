import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    service = new ToastService();
    service.closeToast(); // Reset state before each test
  });

  it('debe inicializar con el toast cerrado', (done) => {
    service.isOpen$.subscribe(isOpen => {
      expect(isOpen).toBe(false);
      done();
    });
  });

  it('debe abrir el toast', (done) => {
    service.openToast();
    service.isOpen$.subscribe(isOpen => {
      expect(isOpen).toBe(true);
      done();
    });
  });

  it('debe cerrar el toast', (done) => {
    service.openToast();
    service.closeToast();
    service.isOpen$.subscribe(isOpen => {
      expect(isOpen).toBe(false);
      done();
    });
  });
});
