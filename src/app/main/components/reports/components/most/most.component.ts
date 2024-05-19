import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../../../../../services/auth.service';

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
  print() {
    throw new Error('Method not implemented.');
    }
  mostChart: any;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.mostBorrowedBook().subscribe(
      (data: any) => {
        const labels = data.map((item: any) => 'Book ' + item.book_id);
        const counts = data.map((item: any) => item.borrow_count);

        const barCanvas = document.getElementById('mostChart');
        this.mostChart = new Chart('mostChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              data: counts,
              backgroundColor: this.getColorGradient(data.length),
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
      },
      (error) => {
        console.error('Error fetching most borrowed books:', error);
      }
    );
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

