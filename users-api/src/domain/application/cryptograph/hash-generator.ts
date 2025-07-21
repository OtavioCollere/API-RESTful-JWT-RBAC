
export abstract class HashGenerator{
  abstract hash(password : string, salt : number) : Promise<string>
}