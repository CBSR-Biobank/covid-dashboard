import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PieChartData, Report } from '@app/models';

@Component({
  selector: 'app-negative-symptomatic',
  template: '<app-patients-pie-card [header]="header" [data]="data"></app-patients-pie-card>'
})
export class NegativeSymptomaticComponent implements OnInit, OnChanges {
  @Input() report: Report;
  header = 'Negative Patients';
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

    const sum = this.report.testResults.symptomatic.negative + this.report.testResults.asymptomatic.negative;
    this.data = [
      {
        label: 'Symptomatic',
        value: this.report.testResults.symptomatic.negative,
        percent: Math.round((100 * this.report.testResults.symptomatic.negative) / sum)
      },
      {
        label: 'Asymptomatic',
        value: this.report.testResults.asymptomatic.negative,
        percent: Math.round((100 * this.report.testResults.asymptomatic.negative) / sum)
      }
    ];
  }
}
