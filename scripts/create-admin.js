// require('dotenv').config();
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const MONGODB_URI = process.env.MONGODB_URI;

// const AdminSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true, trim: true },
//   email: { type: String, required: true, unique: true, trim: true, lowercase: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin', 'super_admin'], default: 'admin' }
// }, { timestamps: true });

// AdminSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

// async function createAdmin() {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log('✅ Connected to MongoDB');

//     const existing = await Admin.findOne({ 
//       $or: [{ username: 'aegis-root' }, { email: 'admin@aegisai.com' }]
//     });

//     if (existing) {
//       console.log('⚠️  Admin user already exists.');
//       return;
//     }

//     const admin = new Admin({
//       username: 'aegis-root',
//       email: 'admin@aegisai.com',
//       password: 'aegis@908',
//       role: 'super_admin'
//     });

//     await admin.save();
//     console.log('✅ Admin user created successfully!');
//   } catch (err) {
//     console.error('❌ Error:', err);
//   } finally {
//     await mongoose.disconnect();
//     process.exit(0);
//   }
// }

// createAdmin();
