import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GroupingService } from '../grouping.service';
import { IGroupedInsights, IInsightsContainer } from '../sensor-model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() allInsights: IInsightsContainer;
  @Input() roomDayToggle: string;

  displayedInsights: IGroupedInsights[] | null;
  constructor() {}

  ngOnInit(): void {
    if (this.roomDayToggle) {
      this.displayData(this.roomDayToggle);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.roomDayToggle) {
      const groupBy = changes.roomDayToggle.currentValue;
      this.displayedInsights = this.allInsights[groupBy];
    }
  }

  displayData(groupBy: string) {
    this.displayedInsights = this.allInsights[groupBy];
  }
}
