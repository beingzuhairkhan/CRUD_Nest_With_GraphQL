import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';
import { CreateProductInput } from '../dto/create-product.dto';
import { UpdateProductInput } from '../dto/update-product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  /** Fetch all products */
  @Query(() => [Product], { name: 'getAllProducts' })
  async findAll() {
    return this.productService.findAllProducts();
  }

  /** Fetch single product by ID */
  @Query(() => Product, { name: 'getProductById' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.productService.findProductById(id);
  }

  /** Create a new product */
  @Mutation(() => Product)
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.createProduct(input);
  }

  /** Update a product */
  @Mutation(() => Product)
  async updateProduct(
    // @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.productService.updateProductById( input);
  }

  /** Delete a product */
  @Mutation(() => Boolean)
  async deleteProduct(@Args('id', { type: () => ID }) id: string) {
    return this.productService.deleteProduct(id);
  }
}
