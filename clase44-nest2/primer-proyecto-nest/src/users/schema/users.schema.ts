import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

// schema -> model -> db 
// interface o type
export type UserDocument = HydratedDocument<User> // mongose .lean() -> handlebars

@Schema()
export class User {
    @Prop()
    first_name: string    
    @Prop()
    last_name:string
    @Prop()
    email:string 
}

export const UserSchema = SchemaFactory.createForClass(User)

// new Schema({

// })