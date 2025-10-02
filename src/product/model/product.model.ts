import { Prop , Schema , SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ObjectType , Field , ID, Float, Int } from "@nestjs/graphql";

@Schema({timestamps:true})
@ObjectType()

export class Product  {
    @Field(() => ID)
    readonly _id : Types.ObjectId;

    @Field()
    @Prop({required:true , minLength:3})
    name:string;

    @Field(() => Float)
    @Prop({required:true , min:0})
    price:number;

    @Field(() => Int)
    @Prop({required:true , min:0})
    stock:number;

}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);