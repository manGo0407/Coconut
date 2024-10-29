export type TourType = {
  id: number;
  ownerId?: number;
  name: string;
  location: string;
  price: number;
  description: string;
  duration: string;
  tourPhoto: string;
  maxPeoples: number;
  latitude: string;
  longitude: string;
};

export type CommentType = {
  id: number;
  userId: number;
  tourId: number;
  value: string;
  createdAt: Date;
  User?: {
    login: string;
  };
};

export type CommentsType = CommentType[];

export type ValueType = {
  value: string;
};

export type OrderType = {
    userId: number;
    tourId: number;
    statusPay?: boolean;
    statusBooked: boolean;
}

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  experience: number;
  aboutMe: string;
  rating: number;
  quantity: number;
}
