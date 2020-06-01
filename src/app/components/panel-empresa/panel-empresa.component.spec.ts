import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEmpresaComponent } from './panel-empresa.component';

describe('PanelEmpresaComponent', () => {
  let component: PanelEmpresaComponent;
  let fixture: ComponentFixture<PanelEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
