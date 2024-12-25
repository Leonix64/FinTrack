import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-transactions-new',
  templateUrl: './transactions-new.component.html',
  styleUrls: ['./transactions-new.component.scss'],
})
export class TransactionsNewComponent implements OnInit {

  transactionForm: FormGroup;
  categories: Category[] = [];
  isLoading: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private TS: TransactionsService,
    private CS: CategoriesService
  ) {
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      categoryId: ['', [Validators.required]],
      date: [new Date().toISOString, [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.CS.getUserCategories().subscribe(
      (res) => {
        this.categories = res;
        this.isLoading = false;
      },
      (err) => {
        console.error(err);
        this.isLoading = false;
      }
    );
  }

  saveTransaction() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched(); // Muestra errores si no han llenado todo
      return;
    }

    const transactionData = this.transactionForm.value;

    this.TS.createTransaction(transactionData).subscribe(
      (res) => {
        console.log('Transaction created', res);
        this.modalCtrl.dismiss(res); // Envia la nueva transacción al componente de listado (padre)
      },
      (err) => {
        console.error('Error creating transaction', err);
      }
    );
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
