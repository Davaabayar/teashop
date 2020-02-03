import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaCreateComponent } from './tea-create.component';

describe('TeaCreateComponent', () => {
  let component: TeaCreateComponent;
  let fixture: ComponentFixture<TeaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
