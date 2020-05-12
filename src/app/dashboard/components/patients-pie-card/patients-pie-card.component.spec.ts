import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientGenderChartComponent } from './patient-gender-chart.component';

describe('PatientGenderChartComponent', () => {
  let component: PatientGenderChartComponent;
  let fixture: ComponentFixture<PatientGenderChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientGenderChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientGenderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
