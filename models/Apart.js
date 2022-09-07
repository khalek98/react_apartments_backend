import mongoose from 'mongoose';

const ApartSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgArr: {
      type: [String],
      default: [],
    },
    location: {
      longitude: { required: true, type: String },
      latitude: { required: true, type: String },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Apart', ApartSchema);
