import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit{
  constructor() {}

    ngOnInit(): void {
      this.RenderChart('bar', 'barchart');
      this.RenderChart('pie', 'piechart');
      this.RenderChart('line', 'linechart');
    }

    RenderChart(type:any, id:any) {
      const ctx = document.getElementById(type);

      new Chart(id, {
        type: type,
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
            label: 'Male of Borrowers',
            data: [11, 19, 13, 53, 23, 34, 38, 21, 35, 67, 26, 15],
            borderWidth: 1
            },
            {
              label: 'Female of Borrowers',
              data: [32, 20, 32, 15, 32, 34, 16, 65, 12, 32 ,12, 34],
              borderWidth: 1
              },
        ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}
}