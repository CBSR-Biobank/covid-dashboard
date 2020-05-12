import { Deserializable } from './deserializable.model';

export interface TestResultCount {
  readonly positive: number;
  readonly negative: number;
}

export interface AgeDistribution {
  readonly [key: string]: TestResultCount[];
}

export interface GenderReport {
  readonly male: TestResultCount;
  readonly female: TestResultCount;
  readonly other: TestResultCount;
  readonly genderUnknown: TestResultCount;
}

export interface ComorbidityReport {
  cld: TestResultCount;
  diabetes: TestResultCount;
  cvd: TestResultCount;
  priorMyocardialInfarctio: TestResultCount;
  priorCoronaryArteryBypa: TestResultCount;
  priorPercutaneousCoronar: TestResultCount;
  renaldis: TestResultCount;
  liverdis: TestResultCount;
  immsupp: TestResultCount;
  hyp: TestResultCount;
  hypertension: TestResultCount;
  hiv: TestResultCount;
  cerebrovascularDisease: TestResultCount;
  priorStroke: TestResultCount;
  obesity: TestResultCount;
  dyslipidemia: TestResultCount;
  pregnant: TestResultCount;
  smokeCurr: TestResultCount;
  smokeFormer: TestResultCount;
  hasOtherDisease: TestResultCount;
  hba1c: TestResultCount;
}

export interface AsymptomaticComorbidity {
  readonly comorbidity: number;
  readonly noComorbidity: number;
}

export interface GenderCounts {
  readonly male: number;
  readonly female: number;
  readonly other: number;
  readonly genderUnknown: number;
}

export interface PositiveGenderByAge {
  readonly categories: GenderCounts[];
}

export interface TestReport {
  readonly ageDistribution: AgeDistribution;
  readonly gender: GenderReport;
  readonly asymptomatic: TestResultCount;
  readonly symptomatic: TestResultCount;
  readonly comorbidity: ComorbidityReport;
  readonly asymptomaticComorbidity: AsymptomaticComorbidity;
  readonly positiveGenderByAge: PositiveGenderByAge;
}

export interface IReport {
  readonly patientCount: number;
  readonly testResults: TestReport;
}

export class Report implements Deserializable {
  readonly patientCount: number;
  readonly testResults: TestReport;

  deserialize(input: any): this {
    const { patientCount, testResults } = input;
    Object.assign(this, {
      patientCount: patientCount,
      testResults: {
        ageDistribution: {
          categories: {}
        },
        gender: {
          male: {
            positive: testResults.gender.male.positiveCount,
            negative: testResults.gender.male.negativeCount
          },
          female: {
            positive: testResults.gender.female.positiveCount,
            negative: testResults.gender.female.negativeCount
          },
          other: {
            positive: testResults.gender.other.positiveCount,
            negative: testResults.gender.other.negativeCount
          },
          genderUnknown: {
            positive: testResults.gender.unknown.positiveCount,
            negative: testResults.gender.unknown.negativeCount
          }
        },
        symptomatic: {
          positive: testResults.symptomatic.positiveCount,
          negative: testResults.symptomatic.negativeCount
        },
        asymptomatic: {
          positive: testResults.asymptomatic.positiveCount,
          negative: testResults.asymptomatic.negativeCount
        },
        comorbidity: {
          cld: {
            positive: testResults.comorbidity.cld.positiveCount,
            negative: testResults.comorbidity.cld.negativeCount
          },
          diabetes: {
            positive: testResults.comorbidity.diabetes.positiveCount,
            negative: testResults.comorbidity.diabetes.negativeCount
          },
          cvd: {
            positive: testResults.comorbidity.cvd.positiveCount,
            negative: testResults.comorbidity.cvd.negativeCount
          },
          priorMyocardialInfarctio: {
            positive: testResults.comorbidity.prior_myocardial_infarctio.positiveCount,
            negative: testResults.comorbidity.prior_myocardial_infarctio.negativeCount
          },
          priorCoronaryArteryBypa: {
            positive: testResults.comorbidity.prior_coronary_artery_bypa.positiveCount,
            negative: testResults.comorbidity.prior_coronary_artery_bypa.negativeCount
          },
          priorPercutaneousCoronar: {
            positive: testResults.comorbidity.prior_percutaneous_coronar.positiveCount,
            negative: testResults.comorbidity.prior_percutaneous_coronar.negativeCount
          },
          renaldis: {
            positive: testResults.comorbidity.renaldis.positiveCount,
            negative: testResults.comorbidity.renaldis.negativeCount
          },
          liverdis: {
            positive: testResults.comorbidity.liverdis.positiveCount,
            negative: testResults.comorbidity.liverdis.negativeCount
          },
          immsupp: {
            positive: testResults.comorbidity.immsupp.positiveCount,
            negative: testResults.comorbidity.immsupp.negativeCount
          },
          hyp: {
            positive: testResults.comorbidity.hyp.positiveCount,
            negative: testResults.comorbidity.hyp.negativeCount
          },
          hypertension: {
            positive: testResults.comorbidity.hypertension.positiveCount,
            negative: testResults.comorbidity.hypertension.negativeCount
          },
          hiv: {
            positive: testResults.comorbidity.hiv.positiveCount,
            negative: testResults.comorbidity.hiv.negativeCount
          },
          cerebrovascularDisease: {
            positive: testResults.comorbidity.cerebrovascular_disease.positiveCount,
            negative: testResults.comorbidity.cerebrovascular_disease.negativeCount
          },
          priorStroke: {
            positive: testResults.comorbidity.prior_stroke.positiveCount,
            negative: testResults.comorbidity.prior_stroke.negativeCount
          },
          obesity: {
            positive: testResults.comorbidity.obesity.positiveCount,
            negative: testResults.comorbidity.obesity.negativeCount
          },
          dyslipidemia: {
            positive: testResults.comorbidity.dyslipidemia.positiveCount,
            negative: testResults.comorbidity.dyslipidemia.negativeCount
          },
          pregnant: {
            positive: testResults.comorbidity.pregnant.positiveCount,
            negative: testResults.comorbidity.pregnant.negativeCount
          },
          smokeCurr: {
            positive: testResults.comorbidity.smoke_curr.positiveCount,
            negative: testResults.comorbidity.smoke_curr.negativeCount
          },
          smokeFormer: {
            positive: testResults.comorbidity.smoke_former.positiveCount,
            negative: testResults.comorbidity.smoke_former.negativeCount
          },
          hasOtherDisease: {
            positive: testResults.comorbidity.has_other_disease.positiveCount,
            negative: testResults.comorbidity.has_other_disease.negativeCount
          },
          hba1c: {
            positive: testResults.comorbidity.hba1c.positiveCount,
            negative: testResults.comorbidity.hba1c.negativeCount
          }
        },
        asymptomaticComorbidity: {
          comorbidity: testResults.asymptomaticComorbidity.comorbidityCount,
          noComorbidity: testResults.asymptomaticComorbidity.noComorbidityCount
        },
        positiveGenderByAge: {
          categories: testResults.positiveGenderByAge.categories
        }
      }
    });

    Object.keys(testResults.ageDistribution.categories).forEach((c) => {
      this.testResults.ageDistribution.categories[c] = {
        positive: testResults.ageDistribution.categories[c].positiveCount,
        negative: testResults.ageDistribution.categories[c].negativeCount
      };
    });

    return this;
  }
}
