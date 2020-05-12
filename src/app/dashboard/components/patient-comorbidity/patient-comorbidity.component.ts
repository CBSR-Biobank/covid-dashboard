import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BarChartData } from '@app/models';
import { DEFAULT_THEME as baseTheme } from '@nebular/theme';

const comorbidityLabels = {
  cld: 'Chronic Lung Disease',
  diabetes: 'Diabetes Mellitus',
  cvd: 'Cardiovascular disease',
  priorMyocardialInfarctio: 'Prior myocardial infarction',
  priorCoronaryArteryBypa: 'Prior coronary artery bypass graft',
  priorPercutaneousCoronar: 'Prior percutaneous coronary intervention',
  renaldis: 'Chronic renal disease',
  liverdis: 'Liver disease',
  immsupp: 'Immunocompromised condition',
  hyp: 'Hypertension',
  hypertension: 'Uncontrolled hypertension',
  hiv: 'HIV+',
  cerebrovascularDisease: 'Cerebrovascular Disease',
  priorStroke: 'Prior stroke',
  obesity: 'Obesity',
  dyslipidemia: 'Dyslipidemia',
  pregnant: 'Currently pregnant',
  smokeCurr: 'Current smoker',
  smokeFormer: 'Former smoker',
  hasOtherDisease: 'Other chronic diseases',
  hba1c: 'HbA1C'
};

@Component({
  selector: 'app-patient-comorbidity',
  template: '<app-bar-chart-card [heading]="heading" [data]="data"></app-bar-chart-card>'
})
export class PatientComorbidityComponent implements OnInit, OnChanges {
  @Input() report: any;
  heading = 'Comorbidity';
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

    const comorbidity = this.report.testResults.comorbidity;

    this.data = {
      barData: [
        {
          label: 'Positive',
          colors: [baseTheme.variables.primaryLight, baseTheme.variables.primary],
          values: Object.keys(comorbidity).map((c) => ({
            label: comorbidityLabels[c],
            value: comorbidity[c].positive,
            percent: Math.round((100 * comorbidity[c].positive) / this.report.patientCount)
          }))
        },
        {
          label: 'Negative',
          colors: [baseTheme.variables.dangerLight, baseTheme.variables.danger],
          values: Object.keys(comorbidity).map((c) => ({
            label: comorbidityLabels[c],
            value: comorbidity[c].negative,
            percent: Math.round((100 * comorbidity[c].negative) / this.report.patientCount)
          }))
        }
      ]
    };
  }
}
