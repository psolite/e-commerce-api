import { IsArray, IsEmail, IsString, Length, MinLength, ValidateNested } from "class-validator"
import { CreateOrderItemDto } from "./create-order-item.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {

    @IsString()
    customerName: string;

    @IsEmail()
    customerEmail: string;

    @IsString()
    customerPhone: string;

    @IsString()
    customerAddress: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];

}
