import { TestBed } from '@angular/core/testing';

import { RegistroEmpleadosService } from './registro-empleados.service';

describe('RegistroEmpleadosService', () => {
  let service: RegistroEmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroEmpleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
