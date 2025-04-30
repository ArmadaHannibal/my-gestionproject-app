import mongoose, { Document, Schema } from 'mongoose';

interface ITask {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'À faire' | 'En cours' | 'Complété';
}

export interface IProject extends Document {
  title: string;
  description: string;
  status: 'En cours' | 'Complété' | 'En attente';
  tasks: ITask[];
  createdAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['À faire', 'En cours', 'Complété'], default: 'À faire' },
});

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['En cours', 'Complété', 'En attente'], default: 'En attente' },
  tasks: [taskSchema],
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;
