import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    items: [
      {
        products: {
          type: mongoose.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: { type: Number },
        // total: { type: Number },
        realPrice: { type: Number },
      }
    ],
    totalPriceOrder: { type: Number, required: true },
    payment: {
      data: Buffer,
      contentType: String,
    },
    paymentType: {
      type: String,
      required: true,
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "not process"
    },
    createdAt: { type: Date, default: new Date() },
    deliveredDate: { type: Date },
    deliveredImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamp: true }
);

export default mongoose.model("Order", orderSchema);
