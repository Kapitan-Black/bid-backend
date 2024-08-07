interface IRoom {
  roomType: string;
  images: string[];
}

interface IHotel {
  hotelName: string;
  hotelDescription: string;
  images: string[];
  rooms: IRoom[];
}






import mongoose, { Schema } from "mongoose";

const rooms: Schema<IRoom> = new mongoose.Schema({
  roomType: { type: String, },
  images: [{ type: String }],
});

const hotelsSchema: Schema<IHotel> = new Schema({
  hotelName: { type: String, required: true},
  hotelDescription: { type: String },
  images: [{ type: String}],
  rooms: [rooms],
});

const Hotels = mongoose.model("Hotels", hotelsSchema);
export default Hotels;
