const root = "http://localhost:1337/api";

export const USER_API = root + "/users";

export const ROOM_API = root + "/rooms";

export const BOOKING_API = root + "/bookings";

export const BOOKING_STATUS_API = root + "/booking-statuses";

export const PAYMENT_STATUS_API = root + "/payment-statuses";

export const PAYMENT_TYPE_API = root + "/payment-types";

export const ROOM_TYPE_API = root + "/room-types";

export const ROLE_API = root + "/users-permissions/roles";

export const GENDER_OPTIONS = ["Male", "Female", "Other"];

export const STATUS_OPTIONS = ["Active", "Deleted"];

export const AMENITIES = [
  {
    label: "Bể bơi",
    name: "hasPool",
  },
  {
    label: "Phòng tập thể hình",
    name: "hasGym",
  },

  {
    label: "Wifi",
    name: "hasWifi",
  },

  {
    label: "Điều hoà nhiệt độ",
    name: "hasConditioning",
  },

  {
    label: "Bếp",
    name: "hasKitchen",
  },

  {
    label: "Máy giặt",
    name: "hasWashingMachine",
  },

  {
    label: "Không gian riêng để làm việc",
    name: "hasDedicatedWorkspace",
  },

  {
    label: "Chấp nhận thú cưng",
    name: "acceptPet",
  },
];
