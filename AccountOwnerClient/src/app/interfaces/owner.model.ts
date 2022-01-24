export interface Owner{
  id: string;
  name: string;
  dateOfBirth: string;
  address: string;
  accounts?: Account[];
}

export interface Account{
  id: string;
  dateCreated: Date;
  accountType: string;
  ownerId?: string;
}

export interface OwnerForCreation {
  name: string;
  dateOfBirth: string;
  address: string;
}
