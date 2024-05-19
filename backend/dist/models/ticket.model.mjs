import mongoose, { Schema } from 'mongoose';
const commentSchema = new Schema({
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
        default: Date.now
    }
});
const historyLogSchema = new Schema({
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
const ticketSchema = new Schema({
    type: {
        type: String,
        enum: ['Story', 'Task', 'Bug', 'bug', 'task', 'story'
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
    history: [historyLogSchema],
    comments: [commentSchema]
});
const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
//# sourceMappingURL=ticket.model.mjs.map