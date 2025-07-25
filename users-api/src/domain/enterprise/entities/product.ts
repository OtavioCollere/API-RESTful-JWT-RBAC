import { Entity } from "../../../core/entities/entity";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";

export interface ProductProps {
  name: string;
  price: number;
  quantity: number;
  slug : string
  createdBy : UniqueEntityID
  editedBy? : UniqueEntityID
  updatedAt?: Date;
  createdAt?: Date;
}

export class Product extends Entity<ProductProps> {
  public static create(props: Optional<ProductProps, 'createdAt' | 'updatedAt' | 'editedBy' | 'slug'>, id?: UniqueEntityID) {

    const product = new Product({
      ...props,
      slug: props.slug ?? this.slugify(props.name),
      createdAt: props.createdAt ?? new Date(),
    }, id);

    return product;
  }
  

  // Getters
  get createdBy() {
    return this.props.createdBy
  }

  get name(): string {
    return this.props.name;
  }

  get slug() {
    return this.props.slug
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
  set name(value: string)  {
    this.props.name = value;
    this.touch();
  }

  set price(value: number) {
    this.props.price = value;
    this.touch();
  }

  set quantity(value: number) {
    this.props.quantity = value;
    this.touch();
  }

  public static slugify(text: string): string {
    return text
      .normalize('NFD')                     // separa acentos das letras
      .replace(/[\u0300-\u036f]/g, '')      // remove os acentos
      .toLowerCase()                        // tudo minúsculo
      .trim()                               // remove espaços nas bordas
      .replace(/[^a-z0-9\s-]/g, '')         // remove caracteres especiais
      .replace(/\s+/g, '-')                 // substitui espaço por hífen
      .replace(/-+/g, '-')                  // colapsa múltiplos hífens
  }

  // Atualiza o updatedAt
  touch(): void {
    this.props.updatedAt = new Date();
  }
}
