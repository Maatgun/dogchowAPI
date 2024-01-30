import Usuario, { IUser } from "../models/usuario";

export const existingMail = async (mail: string): Promise<void> => {
    const foundUser: IUser | null = await Usuario.findOne({ mail });
    if (foundUser) throw new Error(`El correo electrónico ${mail} ya está registrado`);
};