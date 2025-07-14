import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LeavesService } from './leaves.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaves-edit',
  templateUrl: './leaves-edit.component.html'
})
export class LeavesEditComponent implements OnInit {
  form: FormGroup;
  get leavesArray(): FormArray {
    return this.form.get('leaves') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private leavesService: LeavesService,
    private router: Router   
  ) {
    this.form = this.fb.group({
      leaves: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.leavesService.getLeaveById(id).subscribe(leave => {
      this.addLeaveRow(leave);
    });
  }

  addLeaveRow(data: any) {
    this.leavesArray.push(this.fb.group({
      Id: [data?.Id],
      UserId: [data?.OperateUserId],
      LeaveName: [data?.LeaveName || '', Validators.required],
      Description: [data?.Description || '', Validators.required],
      LeaveLimitHours: [
        data?.LeaveLimitHours || '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]
      ]
    }));
  }

  save(): void {
    if (this.form.valid) {
      const payload = this.leavesArray.at(0).value;
      this.leavesService.updateLeave(payload).subscribe(() => {
        this.router.navigate(['/leaves'], {
            queryParams: { Page: 1, PageLimit: 10 }
        });
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  hasError(index: number, controlName: string): boolean {
    const control = (this.leavesArray.at(index) as FormGroup).get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
