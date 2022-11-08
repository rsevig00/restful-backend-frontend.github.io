import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogNComponent } from './confirm-dialog-n.component';

describe('ConfirmDialogNComponent', () => {
  let component: ConfirmDialogNComponent;
  let fixture: ComponentFixture<ConfirmDialogNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
