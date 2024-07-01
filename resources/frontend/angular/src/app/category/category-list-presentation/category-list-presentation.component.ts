import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Category } from '@core/domain-classes/category';
import { CategoryService } from '@core/services/category.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ManageCategoryComponent } from '../manage-category/manage-category.component';
import { Direction } from '@angular/cdk/bidi';
import { CommentDialogComponent } from './comment-dialog.component';

@Component({
  selector: 'app-category-list-presentation',
  templateUrl: './category-list-presentation.component.html',
  styleUrls: ['./category-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListPresentationComponent
  extends BaseComponent
  implements OnInit
{
  @Input() categories: Category[];
  @Output() addEditCategoryHandler: EventEmitter<Category> =
    new EventEmitter<Category>();
  @Output() deleteCategoryHandler: EventEmitter<string> =
    new EventEmitter<string>();

  currentCategory: Category | null = null;
  breadcrumbs: Category[] = [];
  direction: Direction;

  constructor(
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    private cd: ChangeDetectorRef,
    private categoryService: CategoryService,
    private translationService: TranslationService
  ) {
    super();
    this.getLangDir();
  }

  ngOnInit() {
    this.loadCategories();
  }

  getLangDir() {
    this.sub$.sink = this.translationService.lanDir$.subscribe(
      (c: Direction) => (this.direction = c)
    );
  }

  loadCategories() {
    this.sub$.sink = this.categoryService
      .getAllCategories()
      .subscribe((categories) => {
        this.categories = categories.filter((c) => !c.parentId);
        this.currentCategory = null;
        this.breadcrumbs = [];
        this.cd.detectChanges();
      });
  }

  enterCategory(category: Category) {
    this.currentCategory = category;
    this.breadcrumbs.push(category);
    this.loadSubcategories(category.id);
  }

  goBack() {
    this.breadcrumbs.pop();
    const parentCategory = this.breadcrumbs[this.breadcrumbs.length - 1];
    if (parentCategory) {
      this.currentCategory = parentCategory;
      this.loadSubcategories(parentCategory.id);
    } else {
      this.currentCategory = null;
      this.loadCategories();
    }
  }

  loadSubcategories(categoryId: string) {
    this.sub$.sink = this.categoryService
      .getSubCategories(categoryId)
      .subscribe((subCategories) => {
        this.categories = subCategories;
        this.cd.detectChanges();
      });
  }

  openCommentDialog(category: Category, action: 'edit' | 'delete'): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '350px',
      data: { category: category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'edit') {
          this.manageCategory(category, result);
        } else if (action === 'delete') {
          this.deleteCategory(category, result);
        }
      }
    });
  }

  manageCategory(category: Category, comment?: string): void {
    const dialogRef = this.dialog.open(ManageCategoryComponent, {
      width: '350px',
      data: Object.assign({}, category, { comment: comment }),
    });

    this.sub$.sink = dialogRef.afterClosed().subscribe((result: Category) => {
      if (result) {
        this.addEditCategoryHandler.emit(result);
      }
    });
  }

  deleteCategory(category: Category, comment?: string): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE'),
        category.name
      )
      .subscribe((isTrue) => {
        if (isTrue) {
          // You might want to send the comment along with the delete request
          this.deleteCategoryHandler.emit(category.id);
        }
      });
  }

  addSubCategory(category: Category) {
    this.manageCategory({
      id: '',
      description: '',
      name: '',
      parentId: category.id,
    });
  }
}
