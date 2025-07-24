import { ProductsRepository } from "../../src/domain/application/repositories/products-repository";
import { Product } from "../../src/domain/enterprise/entities/product";

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = [];

  async findBySlug(slug: string): Promise<Product | null> {
    const product = this.items.find(item => item.slug === slug);
    return product ?? null;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id);

    if (!product) return null;

    return product;
  }

  async create(product: Product): Promise<Product> {
    this.items.push(product);
    return product;
  }

  async delete(product: Product): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== product.id.toString());
  }

  async getAll(query: string, page: number): Promise<Product[]> {
    const pageSize = 20;

    // Filtra por nome que contenha o `query` (case insensitive)
    const filtered = this.items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    return paginated;
  }
}
