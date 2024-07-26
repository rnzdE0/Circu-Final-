import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../../../../../services/auth.service';
import html2canvas from 'html2canvas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent implements OnInit {
  displayedColumns: string[] = ['Patron', 'Name', 'ID', 'Department', 'Program', 'Borrow Count'];
  selectedDepartment: string = '';
  selectedProgram: string = '';
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

  isProgramChartVisible: boolean = false;
  topChart: any;
  isLoading: boolean = true;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private authservice: AuthService) { }

  downloadPNG(): void {
    const chartCanvas = document.getElementById('topChart') as HTMLCanvasElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Failed to get 2D context');
      return;
    }

    canvas.width = chartCanvas.width;
    canvas.height = chartCanvas.height;

    // Draw a white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the chart on top of the white background
    context.drawImage(chartCanvas, 0, 0);

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'top10_borrowers_chart.png';
    a.click();
  }

  async downloadPDF(): Promise<void> {
    const chartCanvas = document.getElementById('topChart') as HTMLCanvasElement;
    const pdf = new jsPDF('portrait', 'px', 'a4');

    // Add logos and header
    const logoLeft = await this.getLogoLeft();
  const logoRight = await this.getLogoRight();
  pdf.addImage(logoLeft, 'PNG', 50, 15, 60, 60); // Adjusted positions for portrait mode
  pdf.addImage(logoRight, 'PNG', pdf.internal.pageSize.getWidth() - 105, 15.7, 59, 59); // Adjusted positions for portrait mode
  pdf.setTextColor(0);
  pdf.setFontSize(8);
  pdf.text('Republic of the Philippines', pdf.internal.pageSize.getWidth() / 2, 25, { align: 'center' });
  pdf.text('City of Olongapo', pdf.internal.pageSize.getWidth() / 2, 35, { align: 'center' });
  pdf.setFontSize(10);
  pdf.text('Gordon College', pdf.internal.pageSize.getWidth() / 2, 45, { align: 'center' });
  pdf.setFontSize(8);
  pdf.text('Olongapo City Sports Complex, Donor St, East Tapinac, Olongapo City', pdf.internal.pageSize.getWidth() / 2, 55, { align: 'center' });
  pdf.text('Tel. No:(047) 224-2089 loc. 401', pdf.internal.pageSize.getWidth() / 2, 65, { align: 'center' });
  pdf.setFontSize(10);
  pdf.text('TOP 10 BOOK BORROWERS', pdf.internal.pageSize.getWidth() / 2, 100, { align: 'center' });
  pdf.setFontSize(8);
  pdf.text('As of: MM/DD/YY 00:00:00 AM', pdf.internal.pageSize.getWidth() / 2, 115, { align: 'center' });

    // Calculate center position for charts on A4 page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const chartWidth = 400; // Width of the chart in points
    const chartHeight = 300; // Height of the chart in points
    const chartMarginX = (pdf.internal.pageSize.getWidth() - chartWidth) / 2; // Center horizontally
    const chartMarginY = 100; // Start below header
  

    // // Adjust dimensions based on scale factor
    // const targetWidth = chartWidth * scaleFactor;
    // const targetHeight = chartHeight * scaleFactor;
    // const chartMarginX = (pdfWidth - targetWidth) / 2;
    // const chartMarginY = (pdfHeight - targetHeight) / 2 + 10;

    // // Capture chart canvas as image
    // const chartImgData = await html2canvas(chartCanvas, { scale: scaleFactor }).then(canvas => canvas.toDataURL('image/png'));

    // // Add chart image to PDF
    // pdf.addImage(chartImgData, 'PNG', chartMarginX, chartMarginY, targetWidth, targetHeight);

    // Save PDF
    pdf.save('Top10-BookBorrowers.pdf');
  }

  private async getLogoLeft(): Promise<string> {
    return '../assets/img/gc.png';
  }

  private async getLogoRight(): Promise<string> {
    return '../assets/img/gclibrary.png';
  }
 
  ngOnInit(): void {
    this.applyFilters(); // Initial load
  }

  onDepartmentChange() {
    this.selectedProgram = ''; // Reset the selected program when department changes
    this.isProgramChartVisible = this.selectedDepartment !== '';
  }

  applyFilters(): void {
    let params = new HttpParams();

    if (this.selectedDepartment) {
      params = params.set('department', this.selectedDepartment);
    }
    if (this.selectedProgram) {
      params = params.set('program', this.selectedProgram);
    }
    if (this.startDate) {
      params = params.set('date_from', this.startDate);
    }
    if (this.endDate) {
      params = params.set('date_to', this.endDate);
    }

    this.authservice.topBorrowers(params).subscribe(
      (data: any) => {
        this.renderChart(data);
        this.dataSource.data = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching top borrowers:', error);
        this.isLoading = false;
      }
    );
  }

  renderChart(data: any): void {
    const labels = data.map((item: any) => `${item.first_name} ${item.last_name}`);
    const counts = data.map((item: any) => item.borrow_count);

    if (this.topChart) {
      this.topChart.destroy();
    }

    const barCanvas = document.getElementById('topChart') as HTMLCanvasElement;
    this.topChart = new Chart(barCanvas, {
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
      }
    });
  }

  getColorGradient(length: number): string[] {
    // Generate a gradient of colors based on the number of items
    return Array(length).fill('rgba(75, 192, 192, 0.6)');
  }


  // ngOnInit(): void {
  //   this.authservice.topBorrowers().subscribe(
  //     (data: any) => {
  //       const labels = data.map((item: any) => '' + item.last_name);
  //       const counts = data.map((item: any) => item.borrow_count);

  //       const barCanvas = document.getElementById('topChart');
  //       this.topChart = new Chart('topChart', {
  //         type: 'bar',
  //         data: {
  //           labels: labels,
  //           datasets: [{
  //             data: counts,
  //             backgroundColor: this.getColorGradient(data.length),
  //             borderWidth: 1
  //           }]
  //         },
  //         options: {
  //           responsive: true,
  //           plugins: {
  //             legend: {
  //               display: false // Hide the legend
  //             }
  //           },
  //           indexAxis: 'x',
  //           scales: {
  //             y: {
  //               ticks: {
  //                 stepSize: 1
  //               }
  //             }
  //           }
  //         },
  //       });
  //     },
  //     (error) => {
  //       console.error('Error fetching most borrowed books:', error);
  //     }
  //   );
  // }

  // getColorGradient(numBars: number): string[] {
  //   // Generate a gradient of colors based on the number of bars
  //   const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#4CAF50', '#3498DB'];
  //   const gradient = [];
  //   for (let i = 0; i < numBars; i++) {
  //     gradient.push(colors[i % colors.length]);
  //   }
  //   return gradient;
  // }
  // onDepartmentChange(): void {
  //   this.selectedSecondFilter = '';
  // }
}
