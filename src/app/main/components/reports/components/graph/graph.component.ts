import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {
updateCharts() {
throw new Error('Method not implemented.');
}
  pieChart: any;
  barChart: any;
  isProgramChartVisible: any;
selectedDepartment: any;
  downloadPDF() {
  throw new Error('Method not implemented.');
  }
  downloadFile(arg0: string) {
  throw new Error('Method not implemented.');
  }
  export(arg0: string) {
  throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit(): void {
    // Mock data for departments
    const departmentData = {
      CEAS: 20,
      CCS: 15,
      CHTM: 10,
      CAHS: 25,
      CBA: 30
    };
    //mock data for gender counts
    const genderData = {
      male: 80,
      female: 120
    };

    // Pie chart
    const pieCanvas = document.getElementById('pieChart');
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: Object.keys(departmentData),
        datasets: [{
          data: Object.values(departmentData),
          backgroundColor: ['rgb(15, 127, 228, 1)', 'orange', 'pink', 'red', 'yellow'], 
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Book Borrowers by Department'
          }
        }
      }
    });
    // Bar chart
    const barCanvas = document.getElementById('barChart');
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Male', 'Female'],
        datasets: [{
          data: Object.values(genderData),
          backgroundColor: ['rgb(15, 172, 228, 1)', 'pink'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: false // Hide the legend
            }
          // title: {
          //   display: true,
          //   text: 'Book Borrowers by gender'
          // }
        }
      }
    });
  }
}