export class CreateCustomerDto {
  name: string;
  documentNum: string;
  dateBirthday: string;
  email: string;
}

export class UpdateCustomerDto {
  name?: string;
  documentNum?: string;
  dateBirthday?: string;
  email?: string;
}
