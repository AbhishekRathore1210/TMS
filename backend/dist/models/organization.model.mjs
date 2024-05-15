import mongoose from 'mongoose';
const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    user_list: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'orgUser',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        }]
});
const Organization = mongoose.model('Organization', orgSchema);
export { Organization };
//# sourceMappingURL=organization.model.mjs.map