import { Component, OnInit, Input } from '@angular/core';

enum NgxLegendItemColor {
  GREEN = 'green',
  PURPLE = 'purple',
  LIGHT_PURPLE = 'light-purple',
  BLUE = 'blue',
  YELLOW = 'yellow'
}

@Component({
  selector: 'app-chart-legend',
  templateUrl: './chart-legend.component.html',
  styleUrls: ['./chart-legend.component.scss']
})
export class ChartLegendComponent {
  /**
   * Take an array of legend items
   * Available iconColor: 'green', 'purple', 'light-purple', 'blue', 'yellow'
   * @type {{iconColor: string; title: string}[]}
   */
  @Input()
  legendItems: { iconColor: NgxLegendItemColor; title: string }[] = [];
}
