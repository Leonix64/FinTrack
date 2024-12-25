import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { TransactionsNewComponent } from '../transactions-new/transactions-new.component';
import { Transaction } from 'src/app/interfaces/transaction';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {

  transactions: Transaction[] = [];
  categories: Category[] = [];
  isLoading: boolean = false;

  constructor(
    private TS: TransactionsService,
    private CS: CategoriesService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.loadTransactions();
    this.loadCategories();
  }

  loadTransactions() {
    this.isLoading = true;
    this.TS.getUserTransactions().subscribe(
      (res) => {
        this.transactions = res;
        console.log('Transactions loaded', this.transactions);
        this.isLoading = false;
      },
      (err) => {
        console.error('Error fetching transactions', err);
        this.isLoading = false;
      }
    );
  }

  loadCategories() {
    this.CS.getUserCategories().subscribe(
      (res) => {
        this.categories = res;
        console.log('Categories loaded', this.categories);
      },
      (err) => {
        console.error('Error loading categories', err);
      }
    );
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#ccc'; // Color por defecto si no se encuentra
  }

  async createTransactionmodal() {
    const modal = await this.modalController.create({
      component: TransactionsNewComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      // Agrega la nueva transacción al listado
      this.transactions.push(data);
    }
  }

  deleteTransaction(transactionId: string) {
    this.TS.deleteTransaction(transactionId).subscribe(
      () => {
        console.log('Transaction deleted');
        this.transactions = this.transactions.filter(tra => tra.id !== transactionId);
      },
      (err) => {
        console.error('Error deleting transaction', err);
      }
    );
  }
}
