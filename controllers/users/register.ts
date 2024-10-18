import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { iuserDocument, User } from "../../types/models/userSchema";

export default async (
    req: Request<any, any, IUser>,
    res: Response
) => {
    try {
        const dto = await encryption(req.body);  // pipe that convert the password to hash
        const doc = await create(dto)
        res.status(201).json(doc.id)
    } catch(err) {
        const error = err as AppResError
        console.error(err);
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}

const encryption = async (dto: IUser): Promise<IUser> => {
    const cycles = process.env.BCRYPT_CYCLES
    if (!cycles) throw new AppResError(500, "SERVER-ERROR: cycle env var not found")
    dto.password = await bcrypt.hash(dto.password, +cycles)
    return dto;
}

const create = async (dto: IUser): Promise<iuserDocument> => {
    const newUser = new User({
        ...dto
    });
    const creation = await newUser.save();
    return creation;
}