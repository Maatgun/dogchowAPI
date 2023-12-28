import Usuario, {IUsuario} from "../models/usuario";
import { sendEmail } from "../mailer/mailer";

export const emailExiste = async (email: string): Promise<void> => {
    const emailExiste : IUsuario | null = await Usuario.findOne({email});
    
    if (emailExiste && emailExiste.verified) {
        throw new Error(`El email ${email} ya está registrado`);
    } 

    if (emailExiste && !emailExiste.verified) {
        await sendEmail(email, emailExiste.code as string);
        throw new Error(`El email ${email} ya está registrado pero no está verificado. Se ha enviado un nuevo código de verificación a ${email}`);
    } 

}   