import { EntityCreationError } from "../../exceptions/entity";

export class CreateCustomerEntity {
  name: string;
  documentNum: string;
  dateBirthday: string;
  email: string;

  constructor(name: string, documentNum: string, dateBirthday: string, email: string) {
    if (name.trim() === "" || documentNum.trim() === "" || dateBirthday.trim() === "" || email.trim() === "" ) {
        throw EntityCreationError("Campo nao preenchido");
      }

      if (documentNum.length < 11) {
        throw EntityCreationError("Número mínimo de documento invalido");
      }
  
      if (new Date(dateBirthday) > new Date()) {
        throw EntityCreationError("Data de nascimento invalida");
      }
      
    this.name = name;
    this.documentNum = documentNum;
    this.dateBirthday = dateBirthday;
    this.email = email;
  }
}
