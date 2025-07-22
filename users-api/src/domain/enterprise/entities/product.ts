import { Entity } from "../../../core/entities/entity";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";

interface ProductProps {
  name: string;
  price: number;
  quantity: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export class Product extends Entity<ProductProps> {
  public static create(props: Optional<ProductProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID) {
    const product = new Product({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);

    return product;
  }

  // Getters
  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  // Setters
  setName(value: string): void {
    this.props.name = value;
    this.touch();
  }

  setPrice(value: number): void {
    this.props.price = value;
    this.touch();
  }

  setQuantity(value: number): void {
    this.props.quantity = value;
    this.touch();
  }

  // Atualiza o updatedAt
  touch(): void {
    this.props.updatedAt = new Date();
  }
}
