import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEmpleadoComponent } from './panel-empleado.component';

describe('PanelEmpleadoComponent', () => {
  let component: PanelEmpleadoComponent;
  let fixture: ComponentFixture<PanelEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
