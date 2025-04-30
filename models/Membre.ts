import mongoose, { Schema, Document } from 'mongoose';

export interface IMembre extends Document {
    name: string;
    prenom: string;
    email: string;
    password: string;
    role: string;
    profilePhoto?: string;
}

const membreSchema = new Schema<IMembre>({
    name: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'moderateur',
    },
    profilePhoto: {
        type: String,
        default: ''
    },
});

const Membre = mongoose.models.Membre || mongoose.model<IMembre>('Membre', membreSchema);

export default Membre;
