import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BarChartData, Report } from '@app/models';
import { DEFAULT_THEME as baseTheme } from '@nebular/theme';

@Component({
  selector: 'app-patient-gender-card',
  template: '<app-bar-chart-card [heading]="heading" [data]="data"></app-bar-chart-card>'
})
export class PatientGenderCardComponent implements OnInit, OnChanges {
  @Input() report: Report;

  heading = 'Gender';
  data: BarChartData;

  constructor() {}

  ngOnInit(): void {
    this.initData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.report && !changes.report.isFirstChange()) {
      this.report = changes.report.currentValue;
      this.initData();
    }
  }

  private initData() {
    if (this.report === undefined) {
      return;
    }

    const gender = this.report.testResults.gender;

    this.data = {
      barData: [
        {
          label: 'Positive',
          colors: [baseTheme.variables.primaryLight, baseTheme.variables.primary],
          values: [
            {
              label: 'Unknown',
              value: gender.genderUnknown.positive,
              percent: Math.round((100 * gender.genderUnknown.positive) / this.report.patientCount)
            },
            {
              label: 'Other',
              value: gender.other.positive,
              percent: Math.round((100 * gender.other.positive) / this.report.patientCount)
            },
            {
              label: 'Male',
              value: gender.male.positive,
              percent: Math.round((100 * gender.male.positive) / this.report.patientCount)
            },
            {
              label: 'Female',
              value: gender.female.positive,
              percent: Math.round((100 * gender.female.positive) / this.report.patientCount)
            }
          ]
        },
        {
          label: 'Negative',
          colors: [baseTheme.variables.dangerLight, baseTheme.variables.danger],
          values: [
            {
              label: 'Unknown',
              value: gender.genderUnknown.negative,
              percent: Math.round((100 * gender.genderUnknown.negative) / this.report.patientCount)
            },
            {
              label: 'Other',
              value: gender.other.negative,
              percent: Math.round((100 * gender.other.negative) / this.report.patientCount)
            },
            {
              label: 'Male',
              value: gender.male.negative,
              percent: Math.round((100 * gender.male.negative) / this.report.patientCount)
            },
            {
              label: 'Female',
              value: gender.female.negative,
              percent: Math.round((100 * gender.female.negative) / this.report.patientCount)
            }
          ]
        }
      ]
    };
  }
}
