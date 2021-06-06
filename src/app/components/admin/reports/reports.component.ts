import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { UsersService } from '../../../services/admin/users.service';
import { User } from '../../../models/admin/user.model';
import { TagsService } from '../../../services/admin/tags.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  // Data

  users: any = [];
  tags: any = [];
  tagInformation = {type: 'Tec', amount: 2};
  numberTags = [];


  // First Char

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Tecnologia'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Trabajos'
    },
    {
      data: [45, 67, 800, 500],
      label: 'Gobierno de Canarias'
    }
  ];

  chartLabels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril'
  ];

  chartOptions = {
    responsive: true
  };


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  // Second Chart

  public pieChartLabels: Label[] = [['Tecnologia'], ['Trabajos'], 'Gobierno de Canarias'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 50,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 50,
        }
      }]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 15, y: 15, r: 15 },
        { x: 25, y: 15, r: 25 },
        { x: 36, y: 12, r: 33 },
        { x: 10, y: 18, r: 18 },
      ],
      label: 'Investment Equities',
    },
  ];


  constructor(private userService: UsersService, private tagService: TagsService) { }

  ngOnInit(): void {
    const DATA_COUNT = 12;
    const labels = [];
    for (let i = 0; i < DATA_COUNT; ++i) {
      labels.push(i.toString());
    };

    this.userService.getAllUsers().then(u => this.users = u);
    this.tagService.getAllTags().then(u => this.tags = u);

    this.numberTags.push(this.tagInformation);
    this.numberTags.push(this.tagInformation);
    console.log(this.numberTags)

  }

  calculateNumberTypeTags(){

  }

  // events

  changeLabels(): void {
    const words = ['hen'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  addSlice(): void {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice(): void {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

}
