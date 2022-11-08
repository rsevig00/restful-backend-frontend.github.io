import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogNEComponent } from './confirm-dialog-ne.component';

describe('ConfirmDialogNEComponent', () => {
  let component: ConfirmDialogNEComponent;
  let fixture: ComponentFixture<ConfirmDialogNEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogNEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogNEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
