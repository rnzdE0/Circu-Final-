import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import { AuthService } from '../../../../../services/auth.service';
import html2canvas from 'html2canvas';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-most',
  templateUrl: './most.component.html',
  styleUrl: './most.component.scss'
})
export class MostComponent implements OnInit{
  displayedColumns: string[] = ['Accession Number', 'Location', 'Book Title', 'Publisher', 'Date Published', 'Borrow Count'];
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
  isLoading= true;
  dataSource= new MatTableDataSource;

  // downloadPDF() {
  // throw new Error('Method not implemented.');
  // }
  // downloadFile(arg0: string) {
  // throw new Error('Method not implemented.');
  // }
  // export(arg0: string) {
  // throw new Error('Method not implemented.');
  // }
  // print() {
  //   throw new Error('Method not implemented.');
  //   }
  mostChart: any;

  constructor(private authservice: AuthService) { }

  // png download
  downloadPNG(): void {
    const chartCanvas = document.getElementById('mostChart') as HTMLCanvasElement;
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
    a.download = 'most_borrowed_books_chart.png';
    a.click();
  }

  // Function to download chart as PDF
  async downloadPDF(): Promise<void> {
    const chartCanvas = document.getElementById('mostChart') as HTMLCanvasElement;
    const pdf = new jsPDF('portrait', 'px', 'a4');
  
    // Add logos and header
    const logoLeft = await this.getLogoLeft();
    const logoRight = await this.getLogoRight();
    pdf.addImage(logoLeft, 'PNG', 50, 15, 60, 60);
    pdf.addImage(logoRight, 'PNG', pdf.internal.pageSize.getWidth() - 105, 15.7, 59, 59);
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
    pdf.text('MOST BORROWED BOOKS', pdf.internal.pageSize.getWidth() / 2, 100, { align: 'center' });
    pdf.setFontSize(8);
    pdf.text('As of: MM/DD/YY 00:00:00 AM', pdf.internal.pageSize.getWidth() / 2, 115, { align: 'center' });
  
    // Calculate dimensions and margins for the chart
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    // const chartWidth = chartCanvas.width;
    // const chartHeight = chartCanvas.height;
    const chartWidth = 300;
    const chartHeight = 150; 
  
    // Determine scale to fit chart within A4 page
    const scaleFactor = Math.min((pdfWidth - 40) / chartWidth, (pdfHeight - 100) / chartHeight);
  
    // Adjust dimensions based on scale factor
    const targetWidth = chartWidth * scaleFactor;
    const targetHeight = chartHeight * scaleFactor;
    const chartMarginX = (pdfWidth - targetWidth) / 2;
    const chartMarginY = (pdfHeight - targetHeight) / 2 + 10;
  
    // Capture chart canvas as image
    const chartImgData = await html2canvas(chartCanvas, { scale: scaleFactor }).then(canvas => canvas.toDataURL('image/png'));
  
    // Add chart image to PDF
    pdf.addImage(chartImgData, 'PNG', chartMarginX, chartMarginY, targetWidth, targetHeight);
  
    // Save PDF
    pdf.save('Most-Borrowed-Books.pdf');
  }
  

  private async getLogoLeft(): Promise<string> {
    return '../assets/img/gc.png';
  }

  private async getLogoRight(): Promise<string> {
    return '../assets/img/gclibrary.png';
  }


  ngOnInit(): void {
    this.authservice.mostBorrowedBook().subscribe(
      (data: any) => {
        const labels = data.map((item: any) => 'Book ' + item.book_id);
        const counts = data.map((item: any) => item.borrow_count);

        const maxEntries = 10;
        const limitedLabels = labels.slice(0, maxEntries);
        const limitedCounts = counts.slice(0, maxEntries);

        const barCanvas = document.getElementById('mostChart');
        this.isLoading = false;
        this.mostChart = new Chart('mostChart', {
          type: 'bar',
           data: {
            labels: limitedLabels, // Use limited labels here
            datasets: [{
                data: limitedCounts, // Use limited counts here
                backgroundColor: this.getColorGradient(limitedCounts.length), // Adjust based on limited data
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

