import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCitySelectComponent } from './custom-city-select.component';

describe('CustomCitySelectComponent', () => {
  let component: CustomCitySelectComponent;
  let fixture: ComponentFixture<CustomCitySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCitySelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomCitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
