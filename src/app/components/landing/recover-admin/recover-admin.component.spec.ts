import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverAdminComponent } from './recover-admin.component';

describe('RecoverAdminComponent', () => {
  let component: RecoverAdminComponent;
  let fixture: ComponentFixture<RecoverAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
