import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryWeatherDashboardComponent } from './history-weather-dashboard.component';

describe('HistoryWeatherDashboardComponent', () => {
  let component: HistoryWeatherDashboardComponent;
  let fixture: ComponentFixture<HistoryWeatherDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryWeatherDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryWeatherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
