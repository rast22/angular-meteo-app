import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherDashboardComponent } from './current-weather-dashboard.component';

describe('CurrentWeatherDashboardComponent', () => {
  let component: CurrentWeatherDashboardComponent;
  let fixture: ComponentFixture<CurrentWeatherDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentWeatherDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentWeatherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
