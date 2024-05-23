import mongoose, { Document, Schema } from 'mongoose';

interface Comment {
  user: Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface HistoryLog {
  userName: string;
  fieldName: string;
  oldValue: string | Date | undefined;
  newValue: string;
}

interface TicketDocument extends Document {
  type: 'Story' | 'Task' | 'Bug';
  key: string;
  summary: string;
  description: string;
  assignee: string;
  reporter: string;
  status: 'TOBEPICKED' | 'INPROGRESS' | 'INTESTING' | 'COMPLETED';
  createdDate: Date;
  updatedDate: Date;
  organization:string;
  dueDate?: Date;
  files: { name: string; url: string }[];
  history: HistoryLog[];
  comments: Comment[];
}

const commentSchema = new Schema<Comment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const historyLogSchema = new Schema<HistoryLog>({
  userName: {
    type: String,
    required: true
  },
  fieldName: {
    type: String,
    required: true
  },
  oldValue: {
    type: String,
    required: true
  },
  newValue: {
    type: String,
    required: true
  }
});

const ticketSchema = new Schema<TicketDocument>({
  type: {
    type: String,
    enum: ['Story', 'Task', 'Bug','bug','task','story'
    ],
    required: true
  },
  key: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organization:{
    type:String,
  },
  assignee: {
    type: String, 
    required: true
  },
  reporter: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['TOBEPICKED', 'INPROGRESS', 'INTESTING', 'COMPLETED'],
    required: true,
    default: 'TOBEPICKED'
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date
  },
  files: [
    {
      name: { type: String },
      url: { type: String }
    }
  ], 
  history: [historyLogSchema] ,
  comments: [commentSchema] 
});

const Ticket = mongoose.model<TicketDocument>('Ticket', ticketSchema);

export default Ticket;