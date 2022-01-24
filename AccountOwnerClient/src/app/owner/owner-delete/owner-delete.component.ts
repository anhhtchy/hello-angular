import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-owner-delete',
  templateUrl: './owner-delete.component.html',
  styleUrls: ['./owner-delete.component.scss']
})
export class OwnerDeleteComponent implements OnInit {
  public owner: Owner = {
    id: '',
    name: '',
    dateOfBirth: '',
    address: '',
    accounts: []
  };
  public errorMessage: string = '';

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOwnerById();
  }

  private getOwnerById = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/owner/${id}/account`;
    this.repository.getData(apiUrl)
      .subscribe({
        next: res => {
          this.owner = res as Owner;
        },
        error: error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        },
        complete: () => {

        }
      });
  }

  public deleteOwner = () => {
    const deleteUrl: string = `api/owner/${this.owner.id}`;
    this.repository.delete(deleteUrl)
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
      })
  }

  public redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
  }
}
