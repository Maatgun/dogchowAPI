"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerified = void 0;
const isVerified = (req, res, next) => {
    const { verified } = req.body.usuarioConfirmado;
    if (!verified) {
        res.status(401).json({
            msj: "Usuario no verificado",
        });
        return;
    }
    next();
};
exports.isVerified = isVerified;
