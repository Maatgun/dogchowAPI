import { Router } from 'express';
import { register, login, verifyUser } from '../controllers/auth';
import { check } from 'express-validator';
import { emailExiste } from '../helpers/validacionesDB';
import { recolectarErrores } from '../middlewares/recolectarErrores';


const router = Router();

router.post('/register',[
    //middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    //validacion custom 
    check('email').custom(emailExiste),
    //middleware custom
    recolectarErrores,

], register);

router.post('/login',[
    //middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    //middleware custom
    recolectarErrores,

], login);

router.patch('/verify',[
    //middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('code', 'El código es obligatorio').not().isEmpty(),
    recolectarErrores,
    //middleware custom
    recolectarErrores,

], verifyUser);

export default router;