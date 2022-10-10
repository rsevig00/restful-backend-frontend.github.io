import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogEComponent } from './confirm-dialog-e.component';

describe('ConfirmDialogEComponent', () => {
  let component: ConfirmDialogEComponent;
  let fixture: ComponentFixture<ConfirmDialogEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
