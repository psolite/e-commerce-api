import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    const createProduct = this.productRepo.create({
      ...createProductDto
    })
    try {
      const product = instanceToPlain(await this.productRepo.save(createProduct));

      return { status: HttpStatus.OK, data: product }
    } catch (error) {
      console.log(error)
      throw new BadRequestException()
    }
  }

  async findAll() {
    try {
      return instanceToPlain(await this.productRepo.find());
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findOne(id: number) {

    const product = await this.productRepo.findOne({
      where: { id }
    });
    if (!product) {
      throw new BadRequestException("Product Does not exist")
    }
    try {
      return instanceToPlain(product)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id)
    try {
      console.log(updateProductDto)
      await this.productRepo.update(id, {
        ...updateProductDto
      })
      
      return { status: HttpStatus.OK, data: product }
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: number) {
    const product = await this.findOne(id)
    try {
      await this.productRepo.delete(id)
      return { status: HttpStatus.OK, data: product }
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
