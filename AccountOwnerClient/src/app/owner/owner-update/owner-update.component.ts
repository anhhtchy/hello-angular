import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.scss']
})
export class OwnerUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public owner: Owner = {
    id: '',
    name: '',
    dateOfBirth: '',
    address: '',
    accounts: [],
  };
  public ownerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    dateOfBirth: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

  }
  private getOwnerById = () => {
    let ownerId: string = this.activeRoute.snapshot.params['id'];
    let dob = this.datePipe.transform(this.owner.dateOfBirth, 'MM/dd/yyyy');
    let ownerByIdUrl: string = `api/owner/${ownerId}`;
    this.repository.getData(ownerByIdUrl)
      .subscribe({
        next: res => {
          this.owner = res as Owner;
          this.ownerForm.patchValue(this.owner);
          $('#dateOfBirth').val(dob ? dob : '');
        },
        error: (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      });
  }

  public validateControl = (controlName: string) => {
    if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError = (controlName: string, errorName: string)  => {
    if (this.ownerForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public executeDatePicker = (event:any) => {
    this.ownerForm.patchValue({ 'dateOfBirth': event });
  }

  public redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
  }

  public updateOwner = (ownerFormValue:any) => {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  }

  private executeOwnerUpdate = (ownerFormValue:any) => {
    const date = new Date(ownerFormValue.dateOfBirth);
    let dob = this.datePipe.transform(date, "yyyy-MM-dd");
    this.owner.name = ownerFormValue.name;
    this.owner.dateOfBirth = dob ? dob : '';
    this.owner.address = ownerFormValue.address;

    let apiUrl = `api/owner/${this.owner.id}`;
    this.repository.update(apiUrl, this.owner)
      .subscribe({
        next: res => {
          $('#successModal').modal();
        },
        error: error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      }
    )
  }
}
