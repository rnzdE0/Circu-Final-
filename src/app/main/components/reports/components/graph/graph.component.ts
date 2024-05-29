import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../../../../../services/auth.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {
  selectedDepartment: string = '';
  selectedSecondFilter: string = '';
  startDate: string = '';
  endDate: string = '';
  departments: string[] = ['CBA', 'CEAS', 'CCS', 'CHTM', 'CAHS'];
  secondFilterOptions: { [key: string]: string[] } = {
    CBA: ['BSA', 'BSCA', 'BSBA-FM', 'BSBA-HRM', 'BSBA-MKT'],
    CEAS: ['BEEd', 'BECEd', 'BSEd-E', 'BSEd-FIL', 'BSEd-M', 'BSEd-SCI', 'BSEd-SOC', 'BPEd', 'BCAEd', 'BACOM', 'TCP'],
    CCS: ['BSIT', 'BSCS', 'EMC', 'ACT'],
    CHTM: ['BSHM', 'BSTM'],
    CAHS: ['BSN', 'BSM', 'GM']
  };
  
  pieChart: any;
  barChart: any;
  isProgramChartVisible: any;
  // downloadPDF() {
  // throw new Error('Method not implemented.');
  // }
  // downloadFile(arg0: string) {
  // throw new Error('Method not implemented.');
  // }
  // export(arg0: string) {
  // throw new Error('Method not implemented.');
  // }

  constructor(private authService: AuthService) { }

  async downloadPNG(): Promise<void> {
    const pieCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    await new Promise(resolve => setTimeout(resolve, 100));
  
    if (!context) {
      console.error('Failed to get 2D context');
      return;
    }
  
    // Set canvas dimensions
    canvas.width = pieCanvas.width + barCanvas.width;
    canvas.height = Math.max(pieCanvas.height, barCanvas.height);
  
    // Fill canvas with white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw pie chart on canvas
    context.drawImage(pieCanvas, 0, 0);
  
    // Draw bar chart on canvas next to pie chart
    context.drawImage(barCanvas, pieCanvas.width, 0);
  
    // Trigger download
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'borrowers_report.png';
    a.click();
  }
  departmentData: { [key: string]: number } = {};
  genderData: { [key: string]: number } = {};

  ngOnInit(): void{
    this.fetchDataAndRenderCharts();
  }

  fetchDataAndRenderCharts(): void {
    this.authService.getBorrowersReport().subscribe(
      (data: any) => {
        console.log('Received data from backend:', data);
        this.departmentData = data.borrowersByDepartment;
        this.genderData = data.borrowersByGender;
        this.renderCharts();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  renderCharts(): void {
    // Pie chart
    const pieCanvas = document.getElementById('pieChart');
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.departmentData),
        datasets: [{
          data: Object.values(this.departmentData),
          backgroundColor: ['rgb(15, 127, 228, 1)', 'orange', 'pink', 'red', 'yellow'], 
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Book Borrowers by Department',
            font: {
              weight: 'bold' // Make the text bold
            }
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
          data: Object.values(this.genderData),
          backgroundColor: ['rgb(15, 172, 228, 1)', 'pink'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: false // Hide the legend
            },
            title: {
            display: true,
            text: 'Book Borrowers by Gender',
            font: {
              weight: 'bold' // Make the text bold
            }
          }
        }
      }
    });
  }
  onDepartmentChange(): void {
    this.selectedSecondFilter = '';
  }
}

//edited out

// ngOnInit(): void {
    
  //   // Mock data for departments
  //   const departmentData = {
  //     CEAS: 20,
  //     CCS: 15,
  //     CHTM: 10,
  //     CAHS: 25,
  //     CBA: 30
  //   };
  //   //mock data for gender counts
  //   const genderData = {
  //     male: 80,
  //     female: 120
  //   };

  //   // Pie chart
  //   const pieCanvas = document.getElementById('pieChart');
  //   this.pieChart = new Chart('pieChart', {
  //     type: 'pie',
  //     data: {
  //       labels: Object.keys(departmentData),
  //       datasets: [{
  //         data: Object.values(departmentData),
  //         backgroundColor: ['rgb(15, 127, 228, 1)', 'orange', 'pink', 'red', 'yellow'], 
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: 'Book Borrowers by Department',
  //           font: {
  //             weight: 'bold' // Make the text bold
  //           }
  //         }
  //       }
  //     }
  //   });