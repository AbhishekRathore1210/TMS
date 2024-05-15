import mongoose from "mongoose";

const orgUserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email :{
        type:String,
        unique:true,
        required:true
    },
    org :{
        type:String,
        required: true
    },
    is_admin:{
        type:Boolean,
        default:false,
    },
    is_verified:{
        type:Boolean,
        default:false,
    },
    otp:{
        type:String,
        default:'000000',
    },
    // dob:{
    //     type:Date,
    // },
    // doj:{
    //     type:Date,
    // },
    organization_list:[{
        type:String,
    }]

}, {timestamps:true});

const orgUser = mongoose.model('OrgUser', orgUserSchema);

export {orgUser};