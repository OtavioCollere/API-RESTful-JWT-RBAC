import { UniqueEntityID } from "./unique-entity-id";



export class Entity<EntityProps>{
  private _id : UniqueEntityID
  protected props : EntityProps

  constructor(props : EntityProps, id? : UniqueEntityID) {
    this.props = props,
    this._id = id ?? new UniqueEntityID(id)
  }

  get id() {
    return this._id
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
  
}