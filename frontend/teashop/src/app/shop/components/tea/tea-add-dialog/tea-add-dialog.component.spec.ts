import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaAddDialogComponent } from './tea-add-dialog.component';

describe('TeaAddDialogComponent', () => {
  let component: TeaAddDialogComponent;
  let fixture: ComponentFixture<TeaAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
