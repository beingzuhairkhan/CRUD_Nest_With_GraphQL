import { InputType, Field, Float, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class CreateProductInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @Field(() => Float)
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price: number;

    @Field(() => Int)
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    stock: number;
}
