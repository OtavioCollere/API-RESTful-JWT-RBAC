
export abstract class HashComparer{
  abstract compare(password : string) : Promise<string>
}