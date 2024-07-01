import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '@core/domain-classes/category';

@Component({
  selector: 'app-comment-dialog',
  template: `
    <h2 mat-dialog-title>Comment on {{ data.category.name }}</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Comment</mat-label>
        <textarea matInput [(ngModel)]="comment" rows="4"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="comment" cdkFocusInitial>
        Save
      </button>
    </mat-dialog-actions>
  `,
})
export class CommentDialogComponent {
  comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
