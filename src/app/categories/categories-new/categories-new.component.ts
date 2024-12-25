import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { CreateCategory } from 'src/app/interfaces/category';

@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.scss'],
})
export class CategoriesNewComponent implements OnInit {
  categoryForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private CS: CategoriesService,
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      color: ['#000000', [Validators.required]],
    });
  }

  ngOnInit() { }

  async dismissModal() {
    if (!this.isLoading) {
      await this.modalCtrl.dismiss();
    }
  }

  submitCategory() {
    if (this.categoryForm.valid) {
      this.isLoading = true;
      const newCategory: CreateCategory = this.categoryForm.value;
      this.CS.createCategory(newCategory).subscribe(
        (res) => {
          console.log('Category created', res);
          this.isLoading = false;
          this.categoryForm.reset({ color: '#000000' });
          this.modalCtrl.dismiss(res);
        },
        (err) => {
          console.error('Error creating category', err);
          this.isLoading = false;
        }
      );
    }
  }
}
