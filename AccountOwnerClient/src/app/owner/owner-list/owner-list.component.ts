import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss']
})
export class OwnerListComponent implements OnInit {
  public owners: Owner[] = [];
  public errorMessage: string = '';

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllOwners();
  }

  public getAllOwners = () => {
    let apiAddress: string = "api/owner";
    this.repository.getData(apiAddress)
    .subscribe({
      next: res => {
        this.owners = res as Owner[];
      },
      error: error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      },
      complete: () => {

      }
    });
  }

  public getOwnerDetails = (id:string) => {
    const detailsUrl: string = `/owner/details/${id}`;
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage = (id:string) => {
    const updateUrl: string = `/owner/update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDeletePage = (id:string) => {
    const deleteUrl: string = `/owner/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }
}
