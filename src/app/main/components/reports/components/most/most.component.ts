import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-most',
  templateUrl: './most.component.html',
  styleUrl: './most.component.scss'
})
export class MostComponent implements OnInit{
  selectedDepartment: string = '';
  selectedSecondFilter: string = '';
  departments: string[] = ['CBA', 'CEAS', 'CCS', 'CHTM', 'CAHS'];
  secondFilterOptions: { [key: string]: string[] } = {
    CBA: ['BSA', 'BSCA', 'BSBA-FM', 'BSBA-HRM', 'BSBA-MKT'],
    CEAS: ['BEEd', 'BECEd', 'BSEd-E', 'BSEd-FIL', 'BSEd-M', 'BSEd-SCI', 'BSEd-SOC', 'BPEd', 'BCAEd', 'BACOM', 'TCP'],
    CCS: ['BSIT', 'BSCS', 'EMC', 'ACT'],
    CHTM: ['BSHM', 'BSTM'],
    CAHS: ['BSN', 'BSM', 'GM']
  };
  
  isProgramChartVisible: any;
  downloadPDF() {
  throw new Error('Method not implemented.');
  }
  downloadFile(arg0: string) {
  throw new Error('Method not implemented.');
  }
  export(arg0: string) {
  throw new Error('Method not implemented.');
  }
  mostChart: any;

  constructor() { }

  ngOnInit(): void {
    // Mock data for Book Borrowers
    const borrowedBooks = [
      { name: 'Book 1', count: 70 },
      { name: 'Book 2', count: 60 },
      { name: 'Book 3', count: 50 },
      { name: 'Book 4', count: 40 },
      { name: 'Book 5', count: 30 },
      { name: 'Book 6', count: 20 },
      { name: 'Book 7', count: 18 },
      { name: 'Book 8', count: 17 },
      { name: 'Book 9', count: 10 },
      { name: 'Book 10', count: 5 },
      // Add more book borrowers here
    ];

    const labels = borrowedBooks.map(book => book.name);
    const counts = borrowedBooks.map(book => book.count);

    const barCanvas = document.getElementById('mostChart');
    this.mostChart = new Chart('mostChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: this.getColorGradient(borrowedBooks.length),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Hide the legend
          }
      },
        indexAxis: 'x',
        scales: {
          y: {
            ticks: {
              stepSize: 1
            }
          }
        }
      },
    });
  }

  getColorGradient(numBars: number): string[] {
    // Generate a gradient of colors based on the number of bars
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#4CAF50', '#3498DB'];
    const gradient = [];
    for (let i = 0; i < numBars; i++) {
      gradient.push(colors[i % colors.length]);
    }
    return gradient;
  }
  onDepartmentChange(): void {
    this.selectedSecondFilter = '';
  }
}
