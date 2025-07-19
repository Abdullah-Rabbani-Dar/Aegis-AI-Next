const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://aegis-root:ajman@908@aegis-ai.xl4ardp.mongodb.net/?retryWrites=true&w=majority&appName=Aegis-AI';

// Admin schema (same as in models/Admin.ts but for Node.js)
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin'],
    default: 'admin'
  }
}, {
  timestamps: true
});

// Hash password before saving
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ username: 'aegis-root' }, { email: 'admin@aegisai.com' }] 
    });

    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      username: 'aegis-root',
      email: 'admin@aegisai.com',
      password: 'aegis@908',
      role: 'super_admin'
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Username: aegis-root');
    console.log('Password: aegis@908');
    console.log('Email: admin@aegisai.com');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();