import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  email: string;
  contact: string;
  companyName: string;
  companySize: string;
  bookingType: 'demo' | 'call' | 'sales';
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contact: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid contact number']
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  companySize: {
    type: String,
    required: [true, 'Company size is required'],
    enum: ['1-10', '11-50', '51-200', '201-1000', '1000+']
  },
  bookingType: {
    type: String,
    required: [true, 'Booking type is required'],
    enum: ['demo', 'call', 'sales']
  }
}, {
  timestamps: true
});

// Prevent re-compilation during development
export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);