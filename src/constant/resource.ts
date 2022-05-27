import {
  Air,
  FitnessCenter,
  Kitchen,
  LocalLaundryService,
  Pets,
  Pool,
  Wifi,
  Workspaces,
} from "@mui/icons-material";

export const root = "https://ibooking-backend.herokuapp.com/api";

export const HERE_APIKEY = "uxQXVxbMVhslhknWkyikni7Cw50cTaPF-rGZNXEYN98";

export const HERE_QUERY_URL = "https://geocode.search.hereapi.com/v1/geocode";

export const AUTH_API = root + "/auth/local";

export const REGISTER_API = AUTH_API + "/register";

export const EMAIL_API = "https://ibooking-backend.herokuapp.com/email";

export const LOGIN_FACEBOOK_API = root + "/connect/facebook";

export const LOGIN_GOOGLE_API = root + "/connect/google";

export const USER_API = root + "/users";

export const USER_ME_API = root + "/users/me";

export const BOOKING_ANALYST_API = root + "/booking-analyst";

export const ROOM_ANALYST_API = root + "/room-analyst";

export const ROOM_API = root + "/rooms";

export const REVIEWS_API = root + "/reviews";

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
    icon: Pool,
  },
  {
    label: "Phòng tập thể hình",
    name: "hasGym",
    icon: FitnessCenter,
  },

  {
    label: "Wifi",
    name: "hasWifi",
    icon: Wifi,
  },

  {
    label: "Điều hoà nhiệt độ",
    name: "hasConditioning",
    icon: Air,
  },

  {
    label: "Bếp",
    name: "hasKitchen",
    icon: Kitchen,
  },

  {
    label: "Máy giặt",
    name: "hasWashingMachine",
    icon: LocalLaundryService,
  },

  {
    label: "Không gian riêng để làm việc",
    name: "hasDedicatedWorkspace",
    icon: Workspaces,
  },

  {
    label: "Chấp nhận thú cưng",
    name: "acceptPet",
    icon: Pets,
  },
];

export const RATING = [
  {
    label: "Mức độ sạch sẽ",
    name: "cleanlinessStar",
  },
  {
    label: "Độ chính xác",
    name: "accuracyStar",
  },
  {
    label: "Liên lạc",
    name: "communicationStar",
  },
  {
    label: "Vị trí",
    name: "locationStar",
  },
  {
    label: "Nhận phòng",
    name: "checkInStar",
  },
  {
    label: "Giá trị",
    name: "valueStar",
  },
];
