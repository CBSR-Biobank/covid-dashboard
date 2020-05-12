import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PieChartData, Report } from '@app/models';

@Component({
  selector: 'app-positive-symptomatic',
  template: '<app-patients-pie-card [header]="header" [data]="data"></app-patients-pie-card>'
})
export class PositiveSymptomaticComponent implements OnInit, OnChanges {
  @Input() report: Report;
  header = 'Positive Patients';
  data: PieChartData;

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

    const testResults = this.report.testResults;

    const sum = testResults.symptomatic.positive + testResults.asymptomatic.positive;
    this.data = [
      {
        label: 'Symptomatic',
        value: testResults.symptomatic.positive,
        percent: Math.round((100 * testResults.symptomatic.positive) / sum)
      },
      {
        label: 'Asymptomatic',
        value: testResults.asymptomatic.positive,
        percent: Math.round((100 * testResults.asymptomatic.positive) / sum)
      }
    ];
  }
}
