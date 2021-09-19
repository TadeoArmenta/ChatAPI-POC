import { ObjectId } from 'mongodb';
import { AccountService, ThreadServices } from '@modules/api/v1/services';
import { BadRequestException } from '@utils';

export class AccountController {
    // CRUD
    static async createAccount(req,res){
        try {
            const nUser = req.body;
            const user = await AccountService.createAccount(nUser);
            const rUser = await AccountService.requestAccount(user._id)
            return res.status(201).json(rUser);
        } catch (e) {
            console.log(e)
            return res.status(e.status|| 409).json(e);
        }
    }
    static async requestAccount(req,res){
        try {
            const { id } = req.params;
            if (!id || !ObjectId.isValid(id)) {
                throw new BadRequestException('Invalid ID');
            }
            const user = await AccountService.requestAccount(id);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(e.status|| 409).json(e);
        }
    }
    static async requestAccountList(req,res){
        try {
            const list = await AccountService.requestAccountList();
            return res.status(200).json(list);
        } catch (e) {
            return res.status(e.status|| 409).json(e);
        }
    }
    static async updateAccount(req,res){
        try {
            const { id } = req.params;
            if (!id || !ObjectId.isValid(id)) {
                throw new BadRequestException('Invalid ID');
            }
            const user = await AccountService.updateAccount(id, req.body);
            if (!user) return res.status(200).json({error: true, msg: "Upps!! Error happened"});
            const rUser = await AccountService.requestAccount(user._id)
                .populate('unread')
                .exec();
            return res.status(200).json(rUser);
        } catch (e) {
            return res.status(409).json(e);
        }
    }
    static async deleteAccount(req,res){
        try {
            const { id } = req.params;
            if (!id || !ObjectId.isValid(id)) {
                throw new BadRequestException('Invalid ID');
            }
            const data = await AccountService.deleteAccount(id);
            return res.status(204).json(data);
        } catch (e) {
            return res.status(409).json(e);
        }
    }

    // DATA
    static async getConversations(req,res){
        try {
            const { userId } = req.params;
            if (!userId || !ObjectId.isValid(userId)) {
                throw new BadRequestException('Invalid ID');
            }
            const conversations = ThreadServices.getConversations(userId)
            return res.status(200).json(conversations);
        } catch (e) {
            return res.status(e.status|| 409).json(e);
        }
    }
}
