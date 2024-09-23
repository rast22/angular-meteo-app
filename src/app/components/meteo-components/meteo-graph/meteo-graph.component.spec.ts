import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoGraphComponent } from './meteo-graph.component';

describe('MeteoGraphComponent', () => {
  let component: MeteoGraphComponent;
  let fixture: ComponentFixture<MeteoGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeteoGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
