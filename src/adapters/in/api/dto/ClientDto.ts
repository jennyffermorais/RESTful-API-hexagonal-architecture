export class CreateClientDto {
    name: string;
    documentNum: string;
    dateBirthday: string;
    email: string;
 }
 
 export class UpdateClientDto {
    name?: string;
    documentNum?: string;
    dateBirthday?: string;
    email?: string;
 }
 