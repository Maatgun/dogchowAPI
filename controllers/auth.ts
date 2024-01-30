import { Request, Response } from "express";
import Usuario, {IUsuario} from "../models/usuario";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import  generarJWT  from "../helpers/generarJWT";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, password, rol } : IUsuario = req.body;
    
    const usuario = new Usuario({ nombre, email, password, rol});

    // Encriptar contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    const adminKey = req.headers["admin-key"];
    
    if (adminKey === process.env.KEYFORADMIN) {
        usuario.rol = ROLES.admin;
    }

    const newCode = randomstring.generate(6);
    usuario.code = newCode;

    await usuario.save();

    await sendEmail(email, newCode);

    res.status(201).json({
        usuario
    });
};

export const login = async(req: Request, res: Response): Promise<void> => {  
const { email, password } : IUsuario = req.body;

    try {
         
        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            res.status(400).json({
                msj: 'No existe un usuario con ese email'
            });
            return;
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            res.status(400).json({
                msj: 'Contraseña incorrecta'
            });
            return;
        }

        console.log(usuario._id);
        console.log(usuario.id);
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {   
        console.log(error);
        res.status(500).json({
            msj: 'Error interno'
        })

}
}

export const verifyUser = async(req: Request, res: Response): Promise<void> => {
     const { email, code } =  req.body; 
    
    try {

        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            res.status(400).json({
                msj: 'No existe un usuario con ese email'
            });
            return;
        }

        if (usuario.verified) {
            res.status(400).json({
                msj: 'El usuario ya está correctamente verificado'
            });
            return;
        }
         
        if (usuario.code !== code) {
            res.status(401).json({
                msj: 'Código incorrecto'
            });
            return;
        } 

        res.status(200).json({
            msj: 'Usuario verificado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Error interno'
        })
    }
}