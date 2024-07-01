import { Component, OnInit, Inject } from '@angular/core';
import { DashboradService } from '../dashboard.service';

@Component({
  selector: 'app-document-by-category-chart',
  templateUrl: './document-by-category-chart.component.html',
  styleUrls: ['./document-by-category-chart.component.scss'],
})
export class DocumentByCategoryChartComponent implements OnInit {
  single: any[] = [];
  view: [number, number] = [700, 400]; // Example: width = 700, height = 400
  Fullview: [number, number] = [1500, 600]; // Example: width = 700, height = 400

  data: any[] = [
    {
      name: 'Users',
      series: [
        { name: 'January (2021)', value: 50 },
        { name: 'February (2021)', value: 65 },
        { name: 'March (2021)', value: 55 },
        { name: 'April (2021)', value: 85 },
        { name: 'May (2021)', value: 75 },
        { name: 'June (2021)', value: 95 },
        { name: 'July (2021)', value: 110 },
        { name: 'August (2021)', value: 130 },
        { name: 'September (2021)', value: 120 },
        { name: 'October (2021)', value: 145 },
        { name: 'November (2021)', value: 135 },
        { name: 'December (2021)', value: 155 },
        { name: 'January (2022)', value: 140 },
        { name: 'February (2022)', value: 175 },
        { name: 'March (2022)', value: 160 },
        { name: 'April (2022)', value: 195 },
        { name: 'May (2022)', value: 185 },
        { name: 'June (2022)', value: 210 },
        { name: 'July (2022)', value: 225 },
        { name: 'August (2022)', value: 235 },
        { name: 'September (2022)', value: 245 },
        { name: 'October (2022)', value: 255 },
        { name: 'November (2022)', value: 265 },
        { name: 'December (2022)', value: 275 },
      ],
    },
  ];

  Docdata: any[] = [
    {
      name: 'No Of Docoments',
      series: [
        { name: 'January (2021)', value: 251 },
        { name: 'February (2021)', value: 265 },
        { name: 'March (2021)', value: 255 },
        { name: 'April (2021)', value: 285 },
        { name: 'May (2021)', value: 275 },
        { name: 'June (2021)', value: 295 },
        { name: 'July (2021)', value: 310 },
        { name: 'August (2021)', value: 330 },
        { name: 'September (2021)', value: 320 },
        { name: 'October (2021)', value: 345 },
        { name: 'November (2021)', value: 335 },
        { name: 'December (2021)', value: 355 },
        { name: 'January (2022)', value: 340 },
        { name: 'February (2022)', value: 375 },
        { name: 'March (2022)', value: 360 },
        { name: 'April (2022)', value: 395 },
        { name: 'May (2022)', value: 385 },
        { name: 'June (2022)', value: 410 },
        { name: 'July (2022)', value: 425 },
        { name: 'August (2022)', value: 435 },
        { name: 'September (2022)', value: 445 },
        { name: 'October (2022)', value: 455 },
        { name: 'November (2022)', value: 465 },
        { name: 'December (2022)', value: 475 },
        { name: 'January (2023)', value: 480 },
        { name: 'February (2023)', value: 490 },
        { name: 'March (2023)', value: 500 },
        { name: 'April (2023)', value: 510 },
        { name: 'May (2023)', value: 520 },
        { name: 'June (2023)', value: 530 },
        { name: 'July (2023)', value: 540 },
        { name: 'August (2023)', value: 550 },
        { name: 'September (2023)', value: 560 },
        { name: 'October (2023)', value: 570 },
        { name: 'November (2023)', value: 580 },
        { name: 'December (2023)', value: 590 },
      ],
    },
  ];

  // Sample data
  sampleData: any[] = [
    {
      name: 'HR',
      value: 35,
    },
    {
      name: 'Finance',
      value: 55,
    },
    {
      name: 'IT',
      value: 45,
    },
    {
      name: 'Marketing',
      value: 25,
    },
    {
      name: 'Sales',
      value: 40,
    },
    {
      name: 'Operations',
      value: 50,
    },
    {
      name: 'Legal',
      value: 30,
    },
    {
      name: 'Customer Support',
      value: 60,
    },
    {
      name: 'R&D',
      value: 70,
    },
    {
      name: 'Procurement',
      value: 20,
    },
    {
      name: 'Logistics',
      value: 45,
    },
    {
      name: 'Administration',
      value: 55,
    },
  ];
  // Chart options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Number of Users';

  constructor(
    @Inject(DashboradService) private dashboardService: DashboradService
  ) {}

  ngOnInit(): void {
    this.getDocumentCategoryChartData();
  }

  getDocumentCategoryChartData() {
    this.dashboardService.getDocumentByCategory().subscribe((data) => {
      this.single = data.map((c) => {
        return {
          name: c.categoryName,
          value: c.documentCount,
        };
      });
    });
  }
}
