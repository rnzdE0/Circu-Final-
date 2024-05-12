import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';




@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent implements OnInit{
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
  // for printing
print() {
throw new Error('Method not implemented.');
}
  topChart: any;

  constructor() { }

  ngOnInit(): void {
    // Mock data for Book Borrowers
    const topBookBorrowers = [
      { name: 'Borrower 1', count: 90 },
      { name: 'Borrower 2', count: 85 },
      { name: 'Borrower 1', count: 70 },
      { name: 'Borrower 2', count: 65 },
      { name: 'Borrower 1', count: 50 },
      { name: 'Borrower 2', count: 45 },
      { name: 'Borrower 1', count: 30 },
      { name: 'Borrower 2', count: 25 },
      { name: 'Borrower 1', count: 10 },
      { name: 'Borrower 2', count: 5 },
      // Add more book borrowers here
    ];

    const labels = topBookBorrowers.map(borrower => borrower.name);
    const counts = topBookBorrowers.map(borrower => borrower.count);

    const barCanvas = document.getElementById('topChart');
    this.topChart = new Chart('topChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: this.getColorGradient(topBookBorrowers.length),
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
      }
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
