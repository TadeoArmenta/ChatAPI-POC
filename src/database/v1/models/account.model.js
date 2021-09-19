// eslint-disable-next-line no-unused-vars
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export const AccountTypes = {
    USER: "user",
    STAFF: "staff",
};

const AccountSchema = new mongoose.Schema({
    username:                   { type: String, unique:true, required: true, index: true },
    type:                       { type: String, enum: AccountTypes, default: AccountTypes.USER, required:true },
    socketSession:              {
                                    type: String,
                                    default: null,
                                    index: {
                                        unique: true,
                                        partialFilterExpression: { socketSession: { $type: 'string' } },
                                    },
                                },
    metadata:                   { type: mongoose.Schema.Types.ObjectId, ref: 'Metadata' },
    fullName:                   { type: String, default: null },
    email:                      { type: String, default: null },
    phone:                      { type: String, default: null },
    suspended:                  { type: Boolean, default: false },
    resetPasswordToken:         { type: String, default: null },
    resetPasswordExpires:       { type: Date },
},{autoCreate: true, read: __DATABASEREADPREFERENCE});

// virtuals
AccountSchema.virtual('conversations', {
    ref: 'MessageThread',
    localField: '_id',
    foreignField: 'participants',
});
AccountSchema.virtual('unread')
    .get(function () {
        return this._uc || 0
    })
    .set(function (v) {
        this._uc = v
    });
// Methods
AccountSchema.methods.getUnreadCount = async function() {
    try {
        const conversations = await this.model('MessageThread').find({participants:{$in: [this._id]}}).exec();
        const count = conversations.reduce(async(sum, obj)=>{return sum + await obj.getUnreadCount(this._id)},0)
        return Promise.resolve(count)
    } catch (error) {
        return Promise.reject(error)
    }
};
// Config
AccountSchema
    .set('toObject', { virtuals: true })
    .set('toJSON', { virtuals: true })
    .set('timestamps', { currentTime: () => Date.now() })
    .set('collection', 'accounts');

// Plugins
AccountSchema.plugin(passportLocalMongoose);

export const AccountModel = mongoose.model('Account', AccountSchema);
