import { Request, Response } from 'express';

import Issue, { IIssue } from '../models/issues';

import { ObjectId } from 'mongoose';

export const postNewIssue = async (req: Request, res: Response): Promise<void> => {
    const { title, description, priority }: IIssue = req.body;
    const usuario: ObjectId = req.body.usuarioConfirmado._id;

    const issueData = {
        title,
        description,
        priority,
        user: usuario,
        createdAt: new Date(),
    };

    const issue = new Issue(issueData);

    await issue.save();
    }