import mongoose from 'mongoose';

export const MessageTypes = {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video'
};
const MessageSchema = new mongoose.Schema({
	sentBy:             {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required:true},
	thread:             {type: mongoose.Schema.Types.ObjectId, ref: 'MessageThread', required:true},
    type:               {type: String, enum: MessageTypes, default: MessageTypes.TEXT, required:true },
	message:            {type: String},
    read:               [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],
    is_deleted:         [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
},{autoCreate: true, read: __DATABASEREADPREFERENCE});


MessageSchema.set('toObject', { virtuals: true });
MessageSchema.set('toJSON', { virtuals: true });
MessageSchema.set('timestamps', { currentTime: () => Date.now() });
MessageSchema.set('collection', 'messages');

export const MessageModel = mongoose.model('Message', MessageSchema);
