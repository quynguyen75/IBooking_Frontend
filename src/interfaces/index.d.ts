export interface IGeneral {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  username: string;
  gender: "Male" | "Female" | "Other";
  email: string;
  provider: string;
  phoneNumber: string;
  about: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface IBooking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  nightPrice: number;
  cleanlinessFee: number;
  totalPrice: number;
  bookedAt: string;
  paymentAt: string;
  paymentReference: string;
  paymentStatus: IGeneral;
  bookingStatus: IGeneral;
  paymentType: IGeneral;
  user: IUser;
  room: IRoom;
  status: string;
}

export interface IRoom {
  id: number;
  roomType: IGeneral;
  user: IUser;
  title: string;
  nightPrice: number;
  cleanlinessFee: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  guestCount: number;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  nb_users: number;
  status: string;
}

export interface IBookingFilterVariable {
  user: string;
  room: string;
  bookingStatus: string;
  paymentStatus: string;
  paymentType: string;
}

export interface IRoomFilterVariable {
  user: string;
  status: string;
  roomType: string;
}
