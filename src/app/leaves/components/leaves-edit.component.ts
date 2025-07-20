import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LeavesService, Leave } from '../services/leaves.service';
import { Router } from '@angular/router';
import { ReturnCode } from '../../core/enums/return-code.enum';

@Component({
    selector: 'app-leaves-edit',
    templateUrl: './leaves-edit.component.html',
    standalone: false
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
    if (id === 0) {
      this.addLeaveRow({
        Id: 0,
        OperateUserId: 1,
        LeaveName: '',
        Description: '',
        LeaveLimitHours: ''
      });
      return;
    }

    // 情境 2: 取得資料 (含 ReturnCode 處理)
    this.leavesService.getLeaveById(id).subscribe(result => {
      if (result.ReturnCode === ReturnCode.OperationSuccessful && result.data) {
        this.addLeaveRow(result.data);
      } else if (result.ReturnCode === ReturnCode.DataNotFound) {
        alert('查無資料，將返回列表頁');
        this.router.navigate(['/leaves'], {
          queryParams: { Page: 1, PageLimit: 10 }
        });
      } else {
        alert('取得資料失敗');
      }
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
