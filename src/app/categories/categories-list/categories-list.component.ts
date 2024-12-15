import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category, CreateCategory, UpdateCategory } from '../../interfaces/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];
  isLoading: boolean = false;

  constructor(
    private CS: CategoriesService,
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.CS.getUserCategories().subscribe(
      (res) => {
        this.categories = res;
        console.log('Categories loaded', this.categories);
        this.isLoading = false;
      },
      (err) => {
        console.error('Error loading categories', err);
        this.isLoading = false;
      }
    );
  }

  createCategory(newCategory: CreateCategory) {
    this.CS.createCategory(newCategory).subscribe(
      (res) => {
        console.log('Category created', res);
        this.categories.push(res); // Agrega la nueva categoria al listado
      },
      (err) => {
        console.error('Error creating category', err);
      }
    );
  }

  updateCategory(updatedCategory: UpdateCategory) {
    this.CS.updateCategory(updatedCategory).subscribe(
      (res) => {
        console.log('Category updated', res);
        const index = this.categories.findIndex(cat => cat.id === updatedCategory.id);
        if (index > -1) {
          this.categories[index] = res; // Actualiza la categoria en el listado
        }
      },
      (err) => {
        console.error('Error updating category', err);
      }
    );
  }

  deleteCategory(categoryId: string) {
    this.CS.deleteCategory(categoryId).subscribe(
      () => {
        console.log('Category deleted', categoryId);
        this.categories = this.categories.filter(cat => cat.id !== categoryId);
      },
      (err) => {
        console.error('Error deleting category', err);
      }
    );
  }
}
