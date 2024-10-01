interface IRoom {
  id: string;
  roomType: string;
  roomDescription: string;
  images: string[];
}

interface IHotel {
  hotelName: string;
  hotelDescription: string;
  stars: number;
  images: string[];
  rooms: IRoom[];
}






import mongoose, { Schema } from "mongoose";

const rooms: Schema<IRoom> = new mongoose.Schema({
  id: {type: String},
  roomType: { type: String, },
  roomDescription: { type: String},
  images: [{ type: String }],
});

const hotelsSchema: Schema<IHotel> = new Schema({
  hotelName: { type: String, required: true},
  hotelDescription: { type: String },
  stars: { type: Number },
  images: [{ type: String }],
  rooms: [rooms],
});

const Hotels = mongoose.model("Hotels", hotelsSchema);
export default Hotels;
