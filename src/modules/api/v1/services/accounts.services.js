import {AccountModel, MetadataModel, MetadataTypes} from '@database/v1/models';
import {NotFoundException} from "@utils";

export class AccountService {
    //Accounts CRUD
    static async createAccount (data) {
        const nAccountObject = new AccountModel(data);
        const nAccount = await AccountModel.register(nAccountObject,data.password);
        const nMeta = await new MetadataModel({
            type: MetadataTypes.ACCOUNT
        }).save();
        return AccountModel
            .findByIdAndUpdate(nAccount,{$set:{metadata: nMeta}}, {new:true})
    }
    static async requestAccount (id) {
        const document = await AccountModel.findById(id)
            .populate('metadata').exec();
        if (!document) throw new NotFoundException();
        document.unread = await document.getUnreadCount();
        return document;
    }
    static async requestAccountList () {
        const document = await AccountModel.find().populate('metadata').lean();
        if (!document) throw new NotFoundException();
        return document;
    }
    static async updateAccount (id,data){
        if (!data.password) {
            return await AccountModel.findByIdAndUpdate(id, data, {new: true}).exec();
        } else {
            let user = await AccountModel.findById(id);
            await user.setPassword(data.password);
            await user.save();
            user = await AccountModel.findByIdAndUpdate(id,data, {new: true});
            return user;
        }
    }
    static async deleteAccount (id){
        return await AccountModel.findByIdAndRemove(id).exec();
    }
}
