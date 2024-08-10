import { IsDecimal, IsNotEmpty, IsNumber } from "class-validator"

export class CreateProductDto {

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    description: string

    @IsDecimal()
    price: number

    @IsNumber()
    quantity: number
}
