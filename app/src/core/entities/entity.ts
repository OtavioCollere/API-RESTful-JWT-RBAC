import { UniqueEntityID } from "./unique-entity-id";

export class Entity<EntityProps> {
  protected props : EntityProps
  private _id : UniqueEntityID 

  constructor(props : EntityProps, id?: string) {
    this.props = props;
    this._id = new UniqueEntityID(id)
  }
}