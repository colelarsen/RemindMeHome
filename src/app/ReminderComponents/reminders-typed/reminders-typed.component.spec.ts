import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersTypedComponent } from './reminders-typed.component';

describe('RemindersTypedComponent', () => {
  let component: RemindersTypedComponent;
  let fixture: ComponentFixture<RemindersTypedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindersTypedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersTypedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
