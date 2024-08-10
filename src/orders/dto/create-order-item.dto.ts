import { IsInt, IsNumber } from "class-validator";

export class CreateOrderItemDto {
    @IsInt()
    productId: number;

    @IsInt()
    quantity: number;
}
