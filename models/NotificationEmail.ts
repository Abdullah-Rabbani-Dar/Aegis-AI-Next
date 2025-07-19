import mongoose, { Schema, Document } from 'mongoose';

export interface INotificationEmail extends Document {
  email: string;
  label: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationEmailSchema = new Schema<INotificationEmail>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  label: {
    type: String,
    required: [true, 'Label is required'],
    trim: true,
    maxlength: [100, 'Label cannot exceed 100 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.NotificationEmail || mongoose.model<INotificationEmail>('NotificationEmail', NotificationEmailSchema);