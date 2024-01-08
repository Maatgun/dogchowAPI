import { Router } from 'express';
import { postNewIssue } from '../controllers/issues';
import validarJwt from '../middlewares/validarJwt';
import { isAdmin } from '../middlewares/validarRol';
import { check } from 'express-validator';
import { recolectarErrores } from '../middlewares/recolectarErrores';

const router = Router();

router.post('/',[ validarJwt, isAdmin,
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('priority', 'La prioridad es obligatoria').not().isEmpty(),
    recolectarErrores

] ,postNewIssue);

export default router;