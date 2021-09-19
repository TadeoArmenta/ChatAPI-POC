import { AccountService } from "@modules/api/v1/services/accounts.services";
import { MessageThreadModel } from "@database/v1/models";

export class ThreadServices {
    static async getConversations (userId) {
        const user = await AccountService.requestAccount(userId);
        return await user.populate('conversations');
    }
    static async getConversation(id){
        return await MessageThreadModel.findById(id).exec();
    }
    static async deleteConversation(id){
        return await MessageThreadModel.findByIdAndRemove(id).exec();
    }
}
