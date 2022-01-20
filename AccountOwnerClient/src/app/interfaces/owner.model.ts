export interface Owner{
  id: string;
  name: string;
  dateOfBirth: Date;
  address: string;
  accounts?: Account[];
}

export interface Account{
  id: string;
  dateCreated: Date;
  accountType: string;
  ownerId?: string;
}
