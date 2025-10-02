import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './model/product.model';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.dto';
import { UpdateProductInput } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    /**
    * Creates a new Product in the database.
    *
    * @param input - Product data (name, price, stock)
    * @returns The created Product document
    * @throws BadRequestException if input is invalid or creation fails
    */
    async createProduct(input: CreateProductInput): Promise<ProductDocument> {
        try {
            if (!input) {
                throw new BadRequestException("Input data is required");
            }
            const createdProduct = await this.productModel.create(input)
            return createdProduct;
        } catch (error) {
            throw new BadRequestException("Failed to Create product")
        }
    }


    /**
    * Fetches all products from the database, sorted by creation date descending.
    *
    * @returns Array of Product documents
    * @throws BadRequestException if fetching fails
    */
    async findAllProducts(): Promise<ProductDocument[]> {
        try {
            const allProducts = await this.productModel.find().sort({ createdAt: -1 }).exec();
            return allProducts;

        } catch (error) {
            throw new BadRequestException("Failed to fetch product")
        }
    }

    /**
    * Fetches a single product by its ID.
    *
    * @param id - Product ID (MongoDB ObjectId)
    * @returns The Product document
    * @throws BadRequestException if ID is missing or invalid
    * @throws NotFoundException if product does not exist
    */

    async findProductById(id: string): Promise<ProductDocument> {
        try {
            if (!id) throw new BadRequestException("Product ID is required");
            if (!isValidObjectId(id)) throw new BadRequestException("Invalid Product ID");

            const productById = await this.productModel.findById(id).exec()
            if (!productById) {
                throw new NotFoundException(" Product is Not Found");
            }
            return productById;

        } catch (error) {
            throw new BadRequestException("Failed to fetch product");
        }
    }

    /**
    * Updates a product by its ID with the provided data.
    *
    * @param id - The product's MongoDB ID
    * @param input - Fields to update
    * @returns The updated Product document
    * @throws BadRequestException if ID is missing or invalid
    * @throws NotFoundException if product does not exist
    */
    async updateProductById(input: UpdateProductInput): Promise<ProductDocument> {
        try {
            const product = await this.productModel.findById(input.id).exec();
            if (!product) throw new NotFoundException("Product not found");

              const { id: _, ...updateData } = input;

               Object.assign(product, updateData);

            const updatedProduct = await product.save();

            return updatedProduct;
        } catch (error) {
            throw new BadRequestException("Failed to update product");
        }
    }


    /**
    * Deletes a product by its ID.
    *
    * @param id - The product's MongoDB ID
    * @returns true if deletion is successful
    * @throws BadRequestException if ID is missing or invalid
    * @throws NotFoundException if product does not exist
    */
    async deleteProduct(id: string): Promise<boolean> {
        try {
            if (!id) throw new BadRequestException("Product ID is required");
            if (!isValidObjectId(id)) throw new BadRequestException("Invalid Product ID");

            // Find the product first
            const product = await this.productModel.findById(id).exec();
            if (!product) throw new NotFoundException("Product not found");

            // Delete the product
            await this.productModel.deleteOne({ _id: id }).exec();

            return true;
        } catch (error) {
            throw new BadRequestException("Failed to delete product");
        }
    }


}
