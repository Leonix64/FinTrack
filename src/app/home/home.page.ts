import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AnimationController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AnalyticsService } from '../services/analytics.service';
import { GeneralTransactionSummary, CategoryBreakdown, MonthlyInsights, SpendingPatterns, UserSpendingComparison, MonthlyRanking, ImpulsiveSpending, CategoryDiversity } from '../interfaces/analytics';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('categoryChart') categoryChart!: ElementRef;
  @ViewChild('monthlyChart') monthlyChart!: ElementRef;
  @ViewChild('impulsiveChart') impulsiveChart!: ElementRef;

  generalTransactionSummary: GeneralTransactionSummary = {} as GeneralTransactionSummary;
  categoryBreakdown: CategoryBreakdown[] = [];
  monthlyInsights: MonthlyInsights = {} as MonthlyInsights;
  spendingPatterns: SpendingPatterns = {} as SpendingPatterns;
  userSpendingComparison: UserSpendingComparison = {} as UserSpendingComparison;
  monthlyRanking: MonthlyRanking = {} as MonthlyRanking;
  impulsiveSpending: ImpulsiveSpending = {} as ImpulsiveSpending;
  categoryDiversity: CategoryDiversity = {} as CategoryDiversity;

  private charts: Chart[] = [];

  constructor(
    private AS: AnalyticsService,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.loadGeneralResponses();
  }

  // Punto unificado para la entrega de datos generales
  loadGeneralResponses() {
    const headers = this.AS.getHeaders();

    forkJoin({
      generalTransactionSummary: this.AS.transactionSummary(),
      categoryBreakdown: this.AS.categoryBreakdown(),
      monthlyInsights: this.AS.monthlyInsights(),
      spendingPatterns: this.AS.spendingPatterns(),
      userSpendingComparison: this.AS.userComparison(),
      monthlyRanking: this.AS.monthlyRanking(),
      impulsiveSpending: this.AS.impulsiveSpending(),
      categoryDiversity: this.AS.categoryDiversity()
    }).subscribe(
      (res) => {
        this.generalTransactionSummary = res.generalTransactionSummary;
        this.categoryBreakdown = res.categoryBreakdown;
        this.monthlyInsights = res.monthlyInsights;
        this.spendingPatterns = res.spendingPatterns;
        this.userSpendingComparison = res.userSpendingComparison;
        this.monthlyRanking = res.monthlyRanking;
        this.impulsiveSpending = res.impulsiveSpending;
        this.categoryDiversity = res.categoryDiversity;

        this.initializeCharts();

        console.log('General responses loaded', res);
      },
      (error) => {
        console.error('Error loading general responses', error);
      }
    );
  }

  async ionViewDidEnter() {
    const cards = document.querySelectorAll('ion-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        const animation = this.animationCtrl.create()
          .addElement(card)
          .duration(500)
          .fromTo('opacity', '0', '1')
          .fromTo('transform', 'translateY(20px)', 'translateY(0)');
        animation.play();
      }, index * 200);
    });
  }

  private initializeCharts() {
    this.charts.forEach(chart => chart.destroy());
    this.charts = [];

    // Configuración de la gráfica mensual (Line)
    const monthlyCtx = this.monthlyChart.nativeElement.getContext('2d');
    const monthlyData = Object.entries(this.monthlyInsights).map(([month, data]) => ({
      month,
      total: data.total
    }));

    this.charts.push(new Chart(monthlyCtx, {
      type: 'line',
      data: {
        labels: monthlyData.map(d => d.month),
        datasets: [{
          label: 'Gastos Mensuales',
          data: monthlyData.map(d => d.total),
          borderColor: '#3880FF',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(56, 128, 255, 0.1)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    }));

    // Configuración de la gráfica de categorías (Donut)
    const categoryCtx = this.categoryChart.nativeElement.getContext('2d');
    this.charts.push(new Chart(categoryCtx, {
      type: 'doughnut',
      data: {
        labels: this.categoryBreakdown.map(cat => cat.name),
        datasets: [{
          data: this.categoryBreakdown.map(cat => cat.total),
          backgroundColor: this.categoryBreakdown.map(cat => cat.color)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            align: 'center'
          }
        },
        layout: {
          padding: 20
        }
      }
    }));

    // Configuración del gauge de impulsividad
    const impulsiveCtx = this.impulsiveChart.nativeElement.getContext('2d');
    const total = this.impulsiveSpending.impulsiveCount + this.impulsiveSpending.nonImpulsiveCount;
    const impulsivePercentage = (this.impulsiveSpending.impulsiveCount / total) * 100;

    this.charts.push(new Chart(impulsiveCtx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [impulsivePercentage, 100 - impulsivePercentage],
          backgroundColor: ['#ff4961', '#2dd36f'],
          circumference: 180,
          rotation: 270,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        layout: {
          padding: 10
        }
      }
    }));
  }
}