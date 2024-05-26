import mongoose, { Types } from 'mongoose'
import { boolean } from 'zod';


const UserSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId,ref:'orgUser', required: true },
    email: { type: String, required: true }
  });

interface User {
    name: string;
    userId: Types.ObjectId;
    email: string;
  }

interface MainDocument extends Document {
    name: string;
    is_active: boolean;
    user_list: Types.DocumentArray<User>;
}

const orgSchema = new mongoose.Schema<MainDocument>({
    name: { type: String, required: true },
    is_active: { type: Boolean ,default:true},
    user_list: { type: [UserSchema], required: true }
  });

// const orgSchema = new mongoose.Schema<MainDocument>({
//     name:{
//         type:String,
//         required:true
//     },
//     is_active:{
//         type:Boolean,
//         default:true
//     },
//     user_list:[{
//         userId:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'orgUser',
//             required:true
//         },
//         name:{
//             type:String,
//             required:true
//         },
//         email:{
//             type:String,
//             required:true
//         }
//     }]
// })


const Organization = mongoose.model<MainDocument>('Organization', orgSchema);

export {Organization};


