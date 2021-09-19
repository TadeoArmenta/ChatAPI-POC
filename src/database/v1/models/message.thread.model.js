import mongoose from 'mongoose';
export const MessageThreadTypes = {
    GROUP: 'group',
    CONVERSATION: 'conversation',
    CHANNEL: 'channel'
};
const MessageThreadSchema = new mongoose.Schema({
    owner:              { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
    type:               { type: String, enum: MessageThreadTypes, required:true, default: MessageThreadTypes.CONVERSATION },
    metadata:           { type: mongoose.Schema.Types.ObjectId, ref: 'Metadata', required: true},
    participants:       {
                            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],
                            validate: {
                                validator: (v) => Promise.resolve(Array.isArray(v) && v.length >= 2),
                                message: 'Email validation failed'
                            }
                        },
    name:               { type: String},
    roomId:             { type: String, default: null}
},{autoCreate: true, read: __DATABASEREADPREFERENCE});

MessageThreadSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'thread',
});
MessageThreadSchema.methods.getUnreadCount = async function(id) {
    try {
        const count = await this.model('Message').find({thread: this._id, read: {$ne: id }}).count();
        return Promise.resolve(count)
    } catch (error) {
        return Promise.reject(error)
    }
};

MessageThreadSchema
    .set('toObject', { virtuals: true })
    .set('toJSON', { virtuals: true })
    .set('timestamps', { currentTime: () => Date.now() })
    .set('collection', 'messageThreads');

export const MessageThreadModel = mongoose.model('MessageThread', MessageThreadSchema);
