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
  sum: { type: Number },
});

const transferSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, enum: ["transfer"] },
  transferDate: { type: Date },
  time: { type: String },
  from: { type: String },
  to: { type: String },
  agentComments: { type: String },
  sum: { type: Number },
});

const flightCardSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, enum: ["flight"] },
  DepartureDate: { type: Date },
  ArrivalDate: { type: Date },
  FlightNumber: { type: String },
  Airline: { type: String },
  DepartureAirport: { type: String },
  ArrivalAirport: { type: String },
  StopsNumber: { type: Number },
  StopoverAirport1: { type: String },
  StopoverAirport2: { type: String },
  FlightTime: { type: String },
  LandingTime: { type: String },

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
  formName: { type: String },
});

const MainBidFormSchema = mongoose.model("MainBidForm", mainBidFormSchema);
export default MainBidFormSchema;
