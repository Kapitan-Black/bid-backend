import mongoose from "mongoose";

const rooms = new mongoose.Schema({
  roomType: { type: String },
  roomDescription: { type: String },
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
  transferDescription: { type: String },
  transferDate: { type: Date },
  departureTime: { type: String },
  arrivalTime: { type: String },
  from: { type: String },
  to: { type: String },
  passengerComposition: { type: String },
  agentComments: { type: String },
  sum: { type: Number },
});

const flightCardSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, enum: ["flight"] },
  flightDescription: { type: String },
  departureDate: { type: Date },
  arrivalDate: { type: Date },
  flightNumber: { type: String },
  airline: { type: String },
  departureAirport: { type: String },
  arrivalAirport: { type: String },
  stopsNumber: { type: Number },
  stopoverAirport1: { type: String },
  stopoverAirport2: { type: String },
  stopoverAirport3: { type: String },
  stopover1Time: { type: String },
  stopover2Time: { type: String },
  stopover3Time: { type: String },
  flightTime: { type: String },
  landingTime: { type: String },

  numberOfAdults: { type: Number },
  numberOfChildren: { type: Number },
  numberOfBabies: { type: Number },
  priceForAdult: { type: Number },
  priceForChild: { type: Number },
  priceForBaby: { type: Number },
  agentComments: { type: String },
});

const imageSeparatorSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, enum: ["image"] },
  imageUrl: { type: String },
  description: { type: String },
});

const mainBidFormSchema = new mongoose.Schema({
  hotel: [hotelSchema],
  transfer: [transferSchema],
  flight: [flightCardSchema],
  image: [imageSeparatorSchema],
  idArray: [{ type: String }],
  formName: { type: String },
  holidayStartDate: { type: Date },
  isBidApproved: { type: Boolean },
  createDate: { type: Date },
});

const MainBidFormSchema = mongoose.model("MainBidForm", mainBidFormSchema);
export default MainBidFormSchema;
