import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerForCreation } from 'src/app/interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.scss']
})
export class OwnerCreateComponent implements OnInit {
  public errorMessage: string = '';
  public ownerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    dateOfBirth: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  public validateControl = (controlName: string) => {
    if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
      return true;
    return false;
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.ownerForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }

  public executeDatePicker = (event:any) => {
    this.ownerForm.patchValue({ 'dateOfBirth': event });
  }

  public createOwner = (ownerFormValue:any) => {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation = (ownerFormValue:any) => {
    var dob = this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd');
    const owner: OwnerForCreation = {
      name: ownerFormValue.name,
      dateOfBirth: dob ? dob : '',
      address: ownerFormValue.address
    }
    const apiUrl = 'api/owner';
    this.repository.create(apiUrl, owner)
      .subscribe({
        next: res => {
          $('#successModal').modal();
        },
        error: error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        },
        complete: () => {

        }
      }
    )
  }

  public redirectToOwnerList(){
    this.router.navigate(['/owner/list']);
  }
}
