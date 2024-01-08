import { Model, Schema, model } from 'mongoose';
import { Types } from 'mongoose';

export interface IIssue {
    title: string;
    description: string;
    priority: Number;
    user: Types.ObjectId;
    createdAt: Date;
}

const IssuesSchema = new Schema<IIssue>({
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },

    priority: {
        type: Number,
        required: [true, 'La prioridad es obligatoria']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Issue: Model<IIssue> = model('Issue', IssuesSchema);

export default Issue;