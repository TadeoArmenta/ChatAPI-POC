import { ThreadServices } from "@modules/api/v1/services";
import { ObjectId } from "mongodb";
import { BadRequestException } from "@utils";

export class ThreadsController {
    // CRUD
    static async getConversation(req,res){
        try {
            const { id } = req.params;
            const conversations = ThreadServices.getConversation(id)
            return res.status(200).json(conversations);
        } catch (e) {
            return res.status(e.status|| 409).json(e);
        }
    }
    static async deleteConversation(req,res){
        try {
            const { id } = req.params;
            if (!id || !ObjectId.isValid(id)) {
                throw new BadRequestException('Invalid ID');
            }
            const data = await ThreadServices.deleteConversation(id);
            return res.status(204).json(data);
        } catch (e) {
            return res.status(e.status|| 409).json(e);
        }
    }

    // DATA
    static async getThreadMessages(req,res){
        try {
            const { id, sinceMoment } = req.params;
            if (!id || !ObjectId.isValid(id)) {
                throw new BadRequestException('Invalid ID');
            }
            if (sinceMoment) {
                const con = await ThreadServices.getConversation(id);
                const date = new Date(sinceMoment);
                await con.populate({
                    path: 'messages',
                    limit: 100,
                    sort: { createdAt: -1},
                    match: { createdAt: { $gte: date } },
                    select: '-__v'
                })
                return res.status(200).json(con.messages);
            }
            const con = await ThreadServices.getConversation(id);
            await con.populate({
                path: 'messages',
                limit: 100,
                sort: { createdAt: -1 },
                select: '-__v'
            })
            return res.status(200).json(con.messages);
        } catch (e) {
            return res.status(409).json(e);
        }
    }
}
