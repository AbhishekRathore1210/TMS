import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true
    },
    is_admin:{
        type:Boolean,
        default:true
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
        default:'000000'
    },
    otpExpire:{
        type:Date
    }

},{timestamps:true});

const adminUser = mongoose.model('Admin', adminSchema);

export {adminUser};