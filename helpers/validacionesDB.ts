import Usuario, { IUsuario } from "../models/usuario";

export const existingMail = async (mail: string): Promise<void> => {
    const foundUser: IUsuario | null = await Usuario.findOne({ mail });
    if (foundUser) throw new Error(`El correo electrónico ${mail} ya está registrado`);
};