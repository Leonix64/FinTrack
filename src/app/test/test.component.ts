import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GeneralTransactionSummary, CategoryBreakdown, MonthlyInsights, SpendingPatterns, UserSpendingComparison, MonthlyRanking, ImpulsiveSpending, CategoryDiversity } from '../interfaces/analytics';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  generalTransactionSummary: GeneralTransactionSummary = {} as GeneralTransactionSummary;
  categoryBreakdown: CategoryBreakdown[] = [];
  monthlyInsights: MonthlyInsights = {} as MonthlyInsights;
  spendingPatterns: SpendingPatterns = {} as SpendingPatterns;
  userSpendingComparison: UserSpendingComparison = {} as UserSpendingComparison;
  monthlyRanking: MonthlyRanking = {} as MonthlyRanking;
  impulsiveSpending: ImpulsiveSpending = {} as ImpulsiveSpending;
  categoryDiversity: CategoryDiversity = {} as CategoryDiversity;

  constructor(
    private AS: AnalyticsService,
  ) { }

  ngOnInit() {
    this.loadGeneralResponses();
  }

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

        console.log('General responses loaded', res);
      },
      (error) => {
        console.error('Error loading general responses', error);
      }
    );
  }
}
