import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent implements OnInit {
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
    private router: Router,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getOwnerDetails();
  }

  getOwnerDetails = () => {
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
}
