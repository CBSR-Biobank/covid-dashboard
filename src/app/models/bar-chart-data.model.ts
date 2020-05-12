export interface BarData {
  label: string;
  value: number;
  percent: number;
}

export interface MultipleBarData {
  label: string;
  colors: any[];
  values: BarData[];
}

export interface BarChartData {
  barData: MultipleBarData[];
}
