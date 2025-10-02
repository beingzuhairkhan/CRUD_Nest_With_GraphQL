import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateProductInput } from "./create-product.dto";
import { IsNotEmpty } from "class-validator";
import { IsMongoId } from "class-validator";

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
    @Field(() => ID)
    @IsNotEmpty()
    @IsMongoId()
    id: string
}
