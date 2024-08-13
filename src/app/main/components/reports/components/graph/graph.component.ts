import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private authService: AuthService, private http: HttpClient) { }

  //png download
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

  async downloadPDF(): Promise<void> {
    const pieCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;

    const pdf = new jsPDF('portrait', 'px', 'a4'); // Set PDF orientation and size to A4

    // Header Design
    const logoLeft = await this.getLogoLeft(); 
    const logoRight = await this.getLogoRight();

    // Orange background rectangle
    // pdf.setFillColor(255, 165, 0); // Orange color
    // pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 50, 'F'); // Orange rectangle for header

    //Add logos
    pdf.addImage(logoLeft, 'PNG', 50, 15, 60, 60); // Adjust coordinates and dimensions as needed
    pdf.addImage(logoRight, 'PNG', pdf.internal.pageSize.getWidth() - 105, 15.7, 60, 60); // Adjust coordinates and dimensions as needed

    // Text in the middle
    pdf.setTextColor(0); // Black text color
    pdf.setFontSize(8); // Font size for header text
    pdf.text('Republic of the Philippines', pdf.internal.pageSize.getWidth() / 2, 25, { align: 'center' });
    pdf.text('City of Olongapo', pdf.internal.pageSize.getWidth() / 2, 35, { align: 'center' });
    pdf.setFontSize(10); // Larger font size for institution name
    pdf.text('Gordon College', pdf.internal.pageSize.getWidth() / 2, 45, { align: 'center' });
    pdf.setFontSize(8);
    pdf.text('Olongapo City Sports Complex, Donor St, East Tapinac, Olongapo City', pdf.internal.pageSize.getWidth() / 2, 55, { align: 'center' });
    pdf.text('Tel. No:(047) 224-2089 loc. 401', pdf.internal.pageSize.getWidth() / 2, 65, { align: 'center' });
    pdf.setFontSize(10);
    pdf.text('TOP BOOK BORROWERS BY DEPARTMENT AND GENDER', pdf.internal.pageSize.getWidth() / 2, 100, { align: 'center' });
    pdf.setFontSize(8);
    // pdf.text('As of: MM/DD/YY 00:00:00 AM', pdf.internal.pageSize.getWidth() / 2, 115, { align: 'center' });

    // Add filters
    pdf.text(`Department: ${this.selectedDepartment || 'All'}`, pdf.internal.pageSize.getWidth() / 2, 115, { align: 'center' });
    pdf.text(`Program: ${this.selectedSecondFilter || 'All'}`, pdf.internal.pageSize.getWidth() / 2, 125, { align: 'center' });
    pdf.text(`Date Range: ${this.startDate || 'N/A'} - ${this.endDate || 'N/A'}`, pdf.internal.pageSize.getWidth() / 2, 135, { align: 'center' });

    // Calculate center position for charts on A4 page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const chartWidth = 200;
    const chartHeight = 180; 
    const chartMarginX = (pdfWidth - chartWidth * 2) / 2; // Center horizontally
    const chartMarginY = (pdfHeight - chartHeight) / 2 + 10; // Start below header, adjust vertical position

    // Position for pie chart
    const pieCanvasImg = await html2canvas(pieCanvas);
    const pieImgData = pieCanvasImg.toDataURL('image/png');
    pdf.addImage(pieImgData, 'PNG', chartMarginX, chartMarginY, chartWidth, chartHeight);

    // Position for bar chart
    const barCanvasImg = await html2canvas(barCanvas);
    const barImgData = barCanvasImg.toDataURL('image/png');
    pdf.addImage(barImgData, 'PNG', chartMarginX + chartWidth, chartMarginY, chartWidth, chartHeight);

    // Save PDF with specified filename
    pdf.save('TopBorrowers-Department-Gender.pdf');
  }

  private async getLogoLeft(): Promise<string> {
    return '../assets/img/gc.png'; 
  }

  private async getLogoRight(): Promise<string> {
    return '../assets/img/gclibrary.png'; 
  }

  departmentData: { [key: string]: number } = {};
  genderData: { [key: string]: number } = {};

  ngOnInit(): void{
    this.fetchDataAndRenderCharts();
  }

  onFilterChange(): void {
    this.fetchDataAndRenderCharts();
  }


  fetchDataAndRenderCharts(): void {
    const params = new HttpParams()
      .set('department', this.selectedDepartment || '')
      .set('program', this.selectedSecondFilter || '')
      .set('date_from', this.startDate || '')
      .set('date_to', this.endDate || '');

    this.authService.getBorrowersReport(params).subscribe(
      (data: any) => {
        console.log('Received data from backend:', data);
        // Assuming data contains departmentData and genderData
        this.departmentData = data.departmentCount;
        this.genderData = data.genderCount;
        this.renderCharts();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  renderCharts(): void {
    // Destroy existing pie chart if it exists
    if (this.pieChart) {
        this.pieChart.destroy();
    }

    // Create new pie chart
    const pieCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
    
    // Define the color mapping for departments
    const colorMapping: Record<string, string> = {
        "CAHS": 'red',
        "CHTM": 'pink',
        "CBA": 'yellow',
        "CCS": 'orange',
        "CEAS": 'rgb(15, 127, 228, 1)' // blue
    };

    // Extract colors based on the departmentData keys
    const backgroundColors = Object.keys(this.departmentData).map(department => colorMapping[department]);

    this.pieChart = new Chart(pieCanvas, {
        type: 'pie',
        data: {
            labels: Object.keys(this.departmentData),
            datasets: [{
                data: Object.values(this.departmentData),
                backgroundColor: backgroundColors
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
                        weight: 'bold'
                    }
                }
            }
        }
    });



    // Destroy existing bar chart if it exists
    if (this.barChart) {
      this.barChart.destroy();
    }

    // Create new bar chart
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    this.barChart = new Chart(barCanvas, {
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
            display: false
          },
          title: {
            display: true,
            text: 'Book Borrowers by Gender',
            font: {
              weight: 'bold'
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



   // fetchDataAndRenderCharts(): void {
  //   this.authService.getBorrowersReport().subscribe(
  //     (data: any) => {
  //       console.log('Received data from backend:', data);
  //       this.departmentData = data.programsCount;
  //       this.genderData = data.genderCount;
  //       this.renderCharts();
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

    // renderCharts(): void {
  //   // Pie chart || department borrowers count
  //   const pieCanvas = document.getElementById('pieChart');
  //   this.pieChart = new Chart('pieChart', {
  //     type: 'pie',
  //     data: {
  //       labels: Object.keys(this.departmentData),
  //       datasets: [{
  //         data: Object.values(this.departmentData),
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

  //   // Bar chart || Gender Borrow Count
  //   const barCanvas = document.getElementById('barChart');
  //   this.barChart = new Chart('barChart', {
  //     type: 'bar',
  //     data: {
  //       labels: ['Male', 'Female'],
  //       datasets: [{
  //         data: Object.values(this.genderData),
  //         backgroundColor: ['rgb(15, 172, 228, 1)', 'pink'],
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //           legend: {
  //             display: false // Hide the legend
  //           },
  //           title: {
  //           display: true,
  //           text: 'Book Borrowers by Gender',
  //           font: {
  //             weight: 'bold' // Make the text bold
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

  // renderCharts(): void {
  //   if (this.pieChart) {
  //     this.pieChart.destroy();
  //   }

  //   // Create new pie chart
  //   const pieCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
  //   this.pieChart = new Chart(pieCanvas, {
  //     type: 'pie',
  //     data: {
  //       labels: Object.keys(this.departmentData),
  //       datasets: [{
  //         data: Object.values(this.departmentData),
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
  //             weight: 'bold'
  //           }
  //         }
  //       }
  //     }
  //   });
