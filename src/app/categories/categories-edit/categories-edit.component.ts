import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { UpdateCategory } from 'src/app/interfaces/category';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {

  editForm!: FormGroup;
  categoryId!: string; // ID de la categoria a editar
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private CS: CategoriesService,
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.loadCategory();
  }

  // Cargar la categoria
  private loadCategory() {
    this.isLoading = true;
    this.CS.getUserCategories().subscribe(
      (categories) => {
        const category = categories.find((cat) => cat.id === this.categoryId);
        if (category) {
          this.editForm.patchValue(category);
        }
        this.isLoading = false;
      }
    );
  }

  // Actualizar categoria (Guardar cambios, al menos eso deberia hacer)
  saveChanges() {
    if (this.editForm.valid) {
      const updateCategory: UpdateCategory = {
        id: this.categoryId,
        ...this.editForm.value,
      };

      this.CS.updateCategory(updateCategory).subscribe(
        () => {
          console.log('Category updated successfully');
          this.router.navigate(['/categories']);
        },
        (err) => {
          console.error('Error updating category', err);
        }
      )
    }
  }
}
