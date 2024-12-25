import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { UpdateTransaction } from 'src/app/interfaces/transaction';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-transactions-edit',
  templateUrl: './transactions-edit.component.html',
  styleUrls: ['./transactions-edit.component.scss'],
})
export class TransactionsEditComponent implements OnInit {

  updateTransactionForm: FormGroup;
  categories: Category[] = [];
  transactionId: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private TS: TransactionsService,
    private CS: CategoriesService
  ) {
    this.updateTransactionForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: [null, Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.transactionId = this.route.snapshot.paramMap.get('id');
    if (this.transactionId) {
      this.loadTransactionDetails(this.transactionId);
    }
    this.loadCategories();
  }

  loadTransactionDetails(transactionId: string) {
    this.isLoading = true;
    this.TS.getUserTransactions().subscribe(
      (transactions) => {
        const transaction = transactions.find(t => t.id === transactionId);
        if (transaction) {
          this.updateTransactionForm.patchValue({
            amount: transaction.amount,
            description: transaction.description,
            categoryId: transaction.categoryId,
            date: transaction.date,
          });
        }
        this.isLoading = false;
      },
      (err) => {
        console.error('Error fetching transaction', err);
        this.isLoading = false;
      }
    );
  }

  loadCategories() {
    this.CS.getUserCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (err) => {
        console.error('Error loading categories', err);
      }
    );
  }

  updateTransaction() {
    if (!this.transactionId) return;
    if (this.updateTransactionForm.invalid) {
      console.error('Invalid form');
      return;
    }

    const updateTransaction: UpdateTransaction = {
      ...this.updateTransactionForm.value,
      id: this.transactionId,
    };

    this.TS.updateTransaction(updateTransaction).subscribe(
      () => {
        console.log('Transaction updated successfully');
        this.router.navigate(['/transactions/list']);
      },
      (err) => {
        console.error('Error updating transaction', err);
      }
    );
  }

  cancelUpdate() {
    this.router.navigate(['/transactions/list']);
  }
}
