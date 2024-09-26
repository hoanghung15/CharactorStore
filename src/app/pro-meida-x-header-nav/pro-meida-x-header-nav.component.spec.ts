import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProMeidaXHeaderNavComponent } from './pro-meida-x-header-nav.component';

describe('ProMeidaXHeaderNavComponent', () => {
  let component: ProMeidaXHeaderNavComponent;
  let fixture: ComponentFixture<ProMeidaXHeaderNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProMeidaXHeaderNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProMeidaXHeaderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
