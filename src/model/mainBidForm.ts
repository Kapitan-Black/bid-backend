import mongoose from "mongoose";

const rooms = new mongoose.Schema({
  roomType: { type: String },
  images: [{ type: String }],
  nightPrice: { type: Number },
  numberOfRooms: { type: Number },
});

const hotelSchema = new mongoose.Schema({
  type: { type: String },
  hotelName: { type: String },
  checkInDate: { type: Date },
  checkOutDate: { type: Date },
  hotelDescription: { type: String },
  images: [{ type: String }],
  id: { type: String },
  rooms: [{ type: rooms }],
  sum: {type: Number},
});

const transferSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, enum: ["transfer"] },
  transferDate: { type: Date },
  time: { type: String },
  from: { type: String },
  to: { type: String },
  numberOfAdults: { type: Number },
  numberOfChildren: { type: Number },
  agentComments: { type: String },
  sum: { type: Number },
});

const flightCardSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, enum: ["flight"] },
  forthDepartureDate: { type: Date },
  forthArrivalDate: { type: Date },
  forthFlightNumber: { type: String },
  forthAirline: { type: String },
  forthDepartureAirport: { type: String },
  forthArrivalAirport: { type: String },
  forthStopsNumber: { type: Number },
  forthStopoverAirport1: { type: String },
  forthStopoverAirport2: { type: String },
  forthFlightTime: { type: String },
  forthLandingTime: { type: String },

  backDepartureDate: { type: Date },
  backArrivalDate: { type: Date },
  backFlightNumber: { type: String },
  backAirline: { type: String },
  backDepartureAirport: { type: String },
  backArrivalAirport: { type: String },
  backStopsNumber: { type: Number },
  backStopoverAirport1: { type: String },
  backStopoverAirport2: { type: String },
  backFlightTime: { type: String },
  backLandingTime: { type: String },

  numberOfAdults: { type: Number },
  numberOfChildren: { type: Number },
  priceForAdult: { type: Number },
  priceForChild: { type: Number },
  agentComments: { type: String },
});

const imageSeparatorSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, enum: ["image"] },
  imageUrl: { type: String },
});

const mainBidFormSchema = new mongoose.Schema({
  hotel: [hotelSchema],
  transfer: [transferSchema],
  flight: [flightCardSchema],
  image: [imageSeparatorSchema],
  idArray: [{ type: String }],
});

const MainBidFormSchema = mongoose.model("MainBidForm", mainBidFormSchema);
export default MainBidFormSchema;
