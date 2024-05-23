import mongoose,{Document,Schema} from "mongoose";

interface Ticket {
    ticketId: Schema.Types.ObjectId;
    status: "TOBEPICKED" | "INPROGRESS" | "INTESTING" | "COMPLETED";
    assignee: string | null;
  }

  interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    created: Date;
    is_admin:boolean;
    Organization?: Schema.Types.ObjectId;
    otpExpire:Date;
    organization_list?: string[];
    ticketCount?: number;
    tickets?: Ticket[];
  }

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
    otpExipre:{
      type:Date,
    },
    dob:{
        type:Date,
    },
    doj:{
        type:Date,
    },
    organization_list:[{
        type:String,
    }],
    ticketCount: {
        type: Number,
        default: 0,
        required: function(this: UserDocument) {
          return this.is_admin==false;
        }
      },
      tickets: [{
        ticketId: {
          type: Schema.Types.ObjectId,
          ref: 'Ticket'
        },
        status: {
          type: String,
          enum: ['TOBEPICKED', 'INPROGRESS', 'INTESTING', 'COMPLETED'],
          default: 'TOBEPICKED'
        },
        assignee: {
          type: String,
          default: null
        }
      }]

}, {timestamps:true});

const orgUser = mongoose.model('OrgUser', orgUserSchema);

export {orgUser};