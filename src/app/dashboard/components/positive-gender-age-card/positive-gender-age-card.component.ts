import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { BarChartData } from '@app/models';
import { DEFAULT_THEME as baseTheme } from '@nebular/theme';

@Component({
  selector: 'app-positive-gender-age-card',
  template: '<app-bar-chart-card [heading]="heading" [data]="data"></app-bar-chart-card>'
})
export class PositiveGenderAgeCardComponent implements OnInit, OnChanges {
  @Input() report: any;
  heading = 'Positive by Age';
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

    const categories = this.report.testResults.positiveGenderByAge.categories;

    const labels = Object.keys(categories);
    const genders = Object.keys(categories[labels[0]]);
    const colors = {
      male: [baseTheme.variables.primaryLight, baseTheme.variables.primary],
      female: [baseTheme.variables.dangerLight, baseTheme.variables.danger],
      other: [baseTheme.variables.warningLight, baseTheme.variables.warning],
      unknown: [baseTheme.variables.successLight, baseTheme.variables.success]
    };

    const barData = genders.map((gender) => ({
      label: gender,
      colors: colors[gender],
      values: labels.map((ageLabel) => ({
        label: ageLabel,
        value: categories[ageLabel][gender],
        percent: Math.round((100 * categories[ageLabel][gender]) / this.report.patientCount)
      }))
    }));

    this.data = { barData };
  }
}
