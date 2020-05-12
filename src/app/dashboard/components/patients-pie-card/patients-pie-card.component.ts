import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutService } from '@app/services/layout.service';
import {
  DEFAULT_THEME as baseTheme,
  NbJSThemeVariable,
  NbThemeService,
  NbMediaBreakpointsService,
  NbMediaBreakpoint
} from '@nebular/theme';
import { graphic } from 'echarts';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { PieChartData } from '@app/models';

const pieTheme: NbJSThemeVariable = {
  firstPieGradientLeft: baseTheme.variables.success,
  firstPieGradientRight: baseTheme.variables.success,
  firstPieShadowColor: 'rgba(0, 0, 0, 0)',
  firstPieRadius: ['70%', '90%'],

  secondPieGradientLeft: baseTheme.variables.warning,
  secondPieGradientRight: baseTheme.variables.warningLight,
  secondPieShadowColor: 'rgba(0, 0, 0, 0)',
  secondPieRadius: ['60%', '97%'],
  shadowOffsetX: '0',
  shadowOffsetY: '0'
};

const pieLegend: NbJSThemeVariable = {
  firstSection: baseTheme.variables.warning,
  secondSection: baseTheme.variables.success
};

@Component({
  selector: 'app-patients-pie-card',
  styleUrls: ['./patients-pie-card.component.scss'],
  templateUrl: './patients-pie-card.component.html'
})
export class PatientsPieCardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() header: string;
  @Input() data: PieChartData;

  private destroy$: Subject<void> = new Subject<void>();

  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  option: any = {};
  chartLegend: { iconColor: string; title: string }[];
  echartsIntance: any;
  themeVariables: any;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private layoutService: LayoutService
  ) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();

    this.layoutService
      .onSafeChangeLayoutSize()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.resizeChart());
  }

  ngOnInit(): void {
    this.themeService
      .onMediaQueryChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(([_oldValue, newValue]) => {
        this.breakpoint = newValue;
      });

    this.themeService
      .getJsTheme()
      .pipe(takeUntil(this.destroy$), delay(1))
      .subscribe((config) => {
        this.themeVariables = config.variables;
        this.setOptions();
        this.setLegendItems();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.isFirstChange()) {
      this.data = changes.data.currentValue;
      this.setOptions();
      this.setLegendItems();
    }
  }

  setLegendItems() {
    if (this.data === undefined) {
      return;
    }

    this.chartLegend = [
      {
        iconColor: pieLegend.firstSection as string,
        title: this.data[0].label
      },
      {
        iconColor: pieLegend.secondSection as string,
        title: this.data[1].label
      }
    ];
  }

  setOptions() {
    if (this.themeVariables === undefined || this.data === undefined) {
      return;
    }

    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: ''
      },
      series: [
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['50%', '50%'],
          radius: pieTheme.firstPieRadius,
          data: [
            {
              value: this.data[1].percent,
              name: ' ',
              label: {
                normal: {
                  position: 'center',
                  formatter: '',
                  textStyle: {
                    fontSize: '22',
                    fontFamily: this.themeVariables.fontSecondary,
                    fontWeight: '600',
                    color: this.themeVariables.fgHeading
                  }
                }
              },
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: pieTheme.firstPieGradientLeft
                    },
                    {
                      offset: 1,
                      color: pieTheme.firstPieGradientRight
                    }
                  ]),
                  shadowColor: pieTheme.firstPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 3
                }
              },
              hoverAnimation: false
            },
            {
              value: this.data[0].percent,
              name: ' ',
              tooltip: {
                show: false
              },
              label: {
                normal: {
                  position: 'inner'
                }
              },
              itemStyle: {
                normal: {
                  color: this.themeVariables.layoutBg
                }
              }
            }
          ]
        },
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['50%', '50%'],
          radius: pieTheme.secondPieRadius,
          data: [
            {
              value: this.data[1].percent,
              name: ' ',
              label: {
                normal: {
                  position: 'center',
                  formatter: '',
                  textStyle: {
                    fontSize: '22',
                    fontFamily: this.themeVariables.fontSecondary,
                    fontWeight: '600',
                    color: this.themeVariables.fgHeading
                  }
                }
              },
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: new graphic.LinearGradient(0, 0, 0, 1)
                }
              },
              hoverAnimation: false
            },
            {
              value: this.data[0].percent,
              name: ' ',
              tooltip: {
                show: false
              },
              label: {
                normal: {
                  position: 'inner'
                }
              },
              itemStyle: {
                normal: {
                  color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: pieTheme.secondPieGradientLeft
                    },
                    {
                      offset: 1,
                      color: pieTheme.secondPieGradientRight
                    }
                  ]),
                  shadowColor: pieTheme.secondPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: pieTheme.shadowOffsetX,
                  shadowOffsetY: pieTheme.shadowOffsetY
                }
              }
            }
          ]
        }
      ]
    };
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
