"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewIssue = void 0;
const issues_1 = __importDefault(require("../models/issues"));
const postNewIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    const usuario = req.body.usuarioConfirmado._id;
    const issueData = {
        title,
        description,
        priority,
        user: usuario,
        createdAt: new Date(),
    };
    const issue = new issues_1.default(issueData);
    yield issue.save();
});
exports.postNewIssue = postNewIssue;
