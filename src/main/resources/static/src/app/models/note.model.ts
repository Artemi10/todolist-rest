

export class Note{
   public id: number;
   public content: string;
   public expirationDate: number;
   public status: string;

  constructor(id: number, content: string, expirationDate: number, status: string) {
    this.id = id;
    this.content = content;
    this.expirationDate = expirationDate;
    this.status = status;
  }
}
