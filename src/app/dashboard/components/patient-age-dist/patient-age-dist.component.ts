import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BarChartData, Report } from '@app/models';
import { DEFAULT_THEME as baseTheme } from '@nebular/theme';

@Component({
  selector: 'app-patient-age-dist-card',
  template: '<app-bar-chart-card [heading]="heading" [data]="data"></app-bar-chart-card>'
})
export class PatientAgeDistCardComponent implements OnInit, OnChanges {
  @Input() report: Report;

  heading = 'Age Distribution';
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

    const categories = this.report.testResults.ageDistribution.categories;

    this.data = {
      barData: [
        {
          label: 'Positive',
          colors: [baseTheme.variables.primaryLight, baseTheme.variables.primary],
          values: Object.keys(categories).map((label) => ({
            label,
            value: categories[label].positive,
            percent: Math.round((100 * categories[label].positive) / this.report.patientCount)
          }))
        },
        {
          label: 'Negative',
          colors: [baseTheme.variables.dangerLight, baseTheme.variables.danger],
          values: Object.keys(categories).map((label) => ({
            label,
            value: categories[label].negative,
            percent: Math.round((100 * categories[label].negative) / this.report.patientCount)
          }))
        }
      ]
    };
  }
}
