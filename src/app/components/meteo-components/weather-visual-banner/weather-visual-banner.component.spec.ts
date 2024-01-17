import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherVisualBannerComponent } from './weather-visual-banner.component';

describe('WeatherVisualBannerComponent', () => {
  let component: WeatherVisualBannerComponent;
  let fixture: ComponentFixture<WeatherVisualBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherVisualBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherVisualBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
