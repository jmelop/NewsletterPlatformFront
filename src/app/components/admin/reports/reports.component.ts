import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { UsersService } from '../../../services/admin/users.service';
import { User } from '../../../models/admin/user.model';
import { TagsService } from '../../../services/admin/tags.service';
import { TagData } from 'src/app/models/admin/tag-data.model';
import { Tag } from 'src/app/models/admin/tag.model';
import { CookieService } from 'ngx-cookie-service';
import { NewsService } from 'src/app/services/admin/news.service';
import { New } from 'src/app/models/admin/new.model';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  // Data

  users: User[] = [];
  tags: Tag[] = [];
  news: New[] = [];
  tag: TagData = { type: '', amount: 0 };
  user = { type: '', amount: 0 };
  new = { type: '', amount: 0 };
  tagsInfo: TagData[] = [];
  months: number[] = [];
  monthsDate: string[] = [];
  adminInfo: any = '' /* {username: '', email: '', password: ''}; */
  usersData: TagData[] = [];
  usersInfo = [];
  newsData: TagData[] = [];
  newsInfo = [];
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];


  // First Char

  chartData = [
    {
      data: this.usersInfo,
      label: 'Usuarios'
    } ,
    {
      data: this.newsInfo,
      label: 'News'
    } 
  ];

  chartLabels = this.monthsDate;

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

  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(235, 225, 201, 1)', 'rgba(255, 215, 15, 0.5)', 'rgba(215, 214, 205, 1)'],
    },
  ];

  // Third Chart

  /*   public bubbleChartOptions: ChartOptions = {
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
    ]; */


  constructor(private userService: UsersService, private tagService: TagsService, private cookieService: CookieService, private newsService: NewsService) { }

  ngOnInit(): void {
    const DATA_COUNT = 12;
    const labels = [];
    for (let i = 0; i < DATA_COUNT; ++i) {
      labels.push(i.toString());
    };

    this.getDate();

    this.adminInfo = this.cookieService.get("currentAdminId");
    this.userService.getAllUsers(this.adminInfo).then(u => {
      this.users = u;
      this.checkEmpty();
      this.tagService.getAllTags(this.adminInfo).then(u => {
        this.tags = u;
        this.calculateNumberTypeTags();
        this.calculateNumberUserElements();

        this.newsService.getAllNews(this.adminInfo).then(u => {
          this.news = u;
          this.calculateNumberNewsElements();
        })
      });
    });
  }

  getDate() {
    var TodayDate = new Date();
    var m = TodayDate.getMonth() + 1;

    for (var i = 0; i <= 3; i++) {
      this.months.push(m - i);
    }

    this.months = this.months.sort();

    console.log(this.months)

    this.months.map(month => {
      this.monthsDate.push(this.monthNames[month]);
    })

  }

  calculateNumberUserElements() {
    this.users.map(user => {
      this.months.map(map => {
        var date2 = new Date(user.createdAt);
        var m = date2.getMonth() + 1;
        if (m == map) {
          const exist = this.usersData.find(t => t.type == m.toString())
          if (!exist) {
            this.user.type = m.toString();
            this.user.amount += 1;
            this.usersData.push(this.user);
            this.user = { type: '', amount: 1};
          } else {
            this.usersData.map(useData => {
              if(useData.type == map.toString()){
                useData.amount += 1;
              }
            })
          }
        }
      });
    });

    this.usersData.map(data => {
      this.usersInfo.push(data.amount);
    });

    if(this.usersInfo.length < 4){
      for(var i = this.usersInfo.length; i <= 3; i++){
        this.usersInfo.push(0);
      }
      this.usersInfo = this.usersInfo.reverse();
    }

    console.log(this.chartData)
  }

  calculateNumberNewsElements() {
    this.news.map(news => {
      this.months.map(map => {
        var date2 = new Date(news.createdAt);
        var m = date2.getMonth() + 1;
        if (m == map) {
          const exist = this.newsData.find(t => t.type == m.toString())
          if (!exist) {
            this.new.type = m.toString();
            this.new.amount += 1;
            this.newsData.push(this.new);
            this.new = { type: '', amount: 1};
          } else {
            this.newsData.map(newData => {
              if(newData.type == map.toString()){
                newData.amount += 1;
              }
            })
          }
        }
      });
    });

    this.newsData.map(data => {
      this.newsInfo.push(data.amount);
    });

    if(this.newsInfo.length < 4){
      for(var i = this.newsInfo.length; i <= 3; i++){
        this.newsInfo.push(0);
      }
      this.newsInfo = this.newsInfo.reverse();
    }

    console.log(this.chartData)
  }

  calculateNumberTypeTags() {
    this.users.map(user => {
      user.tags.map(tag => {
        const exist = this.tagsInfo.find(t => t.type == tag.name);
        if (!exist) {
          this.tag.type = tag.name;
          this.tag.amount += 1;
          this.tagsInfo.push(this.tag)
          this.pieChartLabels.push(this.tag.type)
          this.tag = { type: '', amount: 1 };
        } else {
          this.tagsInfo.map(tagInf => {
            if (tagInf.type == tag.name) {
              tagInf.amount += 1
            }
          })
        }
      })
    })

    this.tagsInfo.map(u => {
      this.pieChartData.push(u.amount)
    })

  }

  checkEmpty() {
    if (this.users.length == 0) {
      this.pieChartData.push(1)
      this.pieChartLabels.push('NO DATA')
    } else {
      let stateData = false;

      this.users.map(user => {
        if (user.tags.length !== 0) {
          stateData = true;
        }
      })
      if (stateData === false) {
        this.pieChartData.push(1)
        this.pieChartLabels.push('NO DATA')
      }
    }
  }

  checkEmptyElements() {
    if (this.users.length == 0 && this.tags.length == 0) {
      this.user = { type: 'NO DATA', amount: 1};
      this.usersData.push(this.user)
    } else {
      let stateData = false;

      this.users.map(user => {
        if (user.tags.length !== 0) {
          stateData = true;
        }
      })
      if (stateData === false) {
        this.pieChartData.push(1)
        this.pieChartLabels.push('NO DATA')
      }
    }
  }

  // events

  /*   changeLabels(): void {
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
    } */

}
