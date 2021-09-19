import mongoose from 'mongoose';
export const MetadataAccountStatusTypes = {
    ONLINE: 'online',
    AWAY: 'away'
}
export const MetadataTypes = {
    ACCOUNT: 'account',
    THREAD: 'thread',
    MESSAGE: 'message'
}
const MetadataSchema = new mongoose.Schema({
    type:                       { type: String, enum: MetadataTypes, default: MetadataTypes.ACCOUNT, required: true },
    accountStatus:              { type: String, enum: MetadataAccountStatusTypes, default: MetadataAccountStatusTypes.AWAY },
    avatar:                     { type: String },
    tagline:                    { type: String },
    alias:                      { type: String },
    ip:                         { type: String },
    lastSeen:                   { type: Date },
},{autoCreate: true, read: __DATABASEREADPREFERENCE});

MetadataSchema
    .set('toObject', { virtuals: true })
    .set('toJSON', { virtuals: true })
    .set('timestamps', { currentTime: () => Date.now() })
    .set('collection', 'metadatas');

export const MetadataModel = mongoose.model('Metadata', MetadataSchema);
