import {Component} from '@angular/core';
import {ChartType} from "../../../../models/chart_type.model";



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  public chartTypesMap: Map<number, ChartType> = new Map([
    [0, new ChartType('monthNotes', true)],
    [1, new ChartType('statusNotes', false)],
    [2, new ChartType('pieStatusNotes', true)],
  ]);
  public chartTypesMapKeys: number[] = [];

  constructor() {
    this.keysToArray()
  }

  private keysToArray(): void{
    for(let key of this.chartTypesMap.keys())
      this.chartTypesMapKeys.push(key)
  }


  public leftButtonClickListener(){
    let position: number = this.findCurrentChartTypePosition();
    this.hideCurrentChartType(position);
    position--;
    this.showNewChartType(position--);
  }

  public rightButtonClickListener() {
    let position: number = this.findCurrentChartTypePosition();
    this.hideCurrentChartType(position);
    position++;
    this.showNewChartType(position);
  }

  private hideCurrentChartType(position: number): void{
    if(position >= this.chartTypesMap.size){
      position = 0;
    }
    if(position < 0){
      position = this.chartTypesMap.size-1;
    }
    let chartType: ChartType = this.chartTypesMap.get(position);
    chartType.hidden = true;
    this.chartTypesMap.delete(position)
    this.chartTypesMap.set(position, chartType);
  }

  private findCurrentChartTypePosition(): number{
    for(let key of this.chartTypesMap.keys()){
      if(this.chartTypesMap.get(key).hidden === false){
        return key;
      }
    }
  }

  private showNewChartType(position: number): void{
    if(position >= this.chartTypesMap.size){
      position = 0;
    }
    if(position < 0){
      position = this.chartTypesMap.size-1;
    }
    let chartType: ChartType = this.chartTypesMap.get(position);
    chartType.hidden = false;
    this.chartTypesMap.delete(position)
    this.chartTypesMap.set(position, chartType);
  }

}
