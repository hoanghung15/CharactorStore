import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerapiComponent } from './serverapi.component';

describe('ServerapiComponent', () => {
  let component: ServerapiComponent;
  let fixture: ComponentFixture<ServerapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerapiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
