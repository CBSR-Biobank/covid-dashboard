import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BarChartData } from '@app/models';
import { LayoutService } from '@app/services/layout.service';
import {
  DEFAULT_THEME as baseTheme,
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbThemeService
} from '@nebular/theme';
import { EChartOption, graphic } from 'echarts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const chartTheme = {
  countryBorderColor: baseTheme.variables.border4,
  countryFillColor: baseTheme.variables.bg3,
  countryBorderWidth: '1',
  hoveredCountryBorderColor: baseTheme.variables.primary,
  hoveredCountryFillColor: baseTheme.variables.primaryLight,
  hoveredCountryBorderWidth: '1',

  chartAxisLineColor: baseTheme.variables.border4,
  chartAxisTextColor: baseTheme.variables.fg,
  chartAxisFontSize: '12',
  chartGradientTo: baseTheme.variables.primary,
  chartGradientFrom: baseTheme.variables.primaryLight,
  chartAxisSplitLine: baseTheme.variables.separator,
  chartShadowLineColor: baseTheme.variables.primaryLight,

  chartLineBottomShadowColor: baseTheme.variables.primary,

  chartInnerLineColor: baseTheme.variables.bg2
};

@Component({
  selector: 'app-bar-chart-card',
  templateUrl: './bar-chart-card.component.html',
  styleUrls: ['./bar-chart-card.component.scss']
})
export class BarChartCardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() heading: string;
  @Input() data: BarChartData;

  private destroy$: Subject<void> = new Subject<void>();

  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  labels = ['Unknown', 'Other', 'Male', 'Female'];

  echartsInstance: any;
  chartOption: EChartOption;
  maxValue: number;

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.isFirstChange()) {
      this.data = changes.data.currentValue;
      this.chartOption = this.createChartOptions();
    }
  }

  private createChartOptions() {
    if (this.data === undefined) {
      return;
    }

    const barWidth = this.data.barData.length > 2 ? '15%' : '30%';

    return {
      grid: {
        left: '2%',
        right: '2%',
        bottom: '1%',
        top: '5%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(127,127,127,.5)',
        formatter: (params) => {
          let name = '';
          const result = params.map((param) => {
            name = param.name;
            return (
              param.seriesName +
              ' ' +
              param.value +
              ' (' +
              this.data.barData[param.seriesIndex].values[param.dataIndex].percent +
              '%)'
            );
          });
          return name + '<br>' + result.join('<br>');
        }
      },
      legend: {
        data: this.data.barData.map((v) => v.label),
        top: '0%',
        padding: 0,
        textStyle: {
          color: '#fff'
        }
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          color: chartTheme.chartAxisTextColor,
          fontSize: chartTheme.chartAxisFontSize
        },
        axisLine: {
          lineStyle: {
            color: chartTheme.chartAxisLineColor,
            width: '2'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: chartTheme.chartAxisSplitLine,
            width: '1'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: this.data.barData[0].values.map((v) => v.label),
        axisLabel: {
          color: chartTheme.chartAxisTextColor,
          fontSize: chartTheme.chartAxisFontSize
        },
        axisLine: {
          lineStyle: {
            color: chartTheme.chartAxisLineColor,
            width: '2'
          }
        },
        axisTick: {
          show: false
        }
      },
      series: this.data.barData.map((bd) => ({
        type: 'bar',
        barWidth,
        name: bd.label,
        data: bd.values.map((bd) => bd.value),
        cursor: 'default',
        itemStyle: {
          normal: {
            color: new graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: bd.colors[0]
              },
              {
                offset: 1,
                color: bd.colors[1]
              }
            ])
          }
        }
      }))
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }
}
