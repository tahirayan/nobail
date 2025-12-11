export type Event = {
  id: string;
  day: string;
  title: string;
  host: Host;
  time: string;
  endTime?: string;
  prepayment: string;
  credit: string;
  description: string;
  longDescription?: string;
  companies: string[];
  location: string;
  venue: Venue;
  spots: { current: number; total: number };
  language: string;
  isDiscountApplied?: boolean;
  discountType?: number;
  discountAmount?: string;
  originalPrepayment?: string;
  doorCode?: string;
  directions?: string;
  whatsappLink?: string;
  pickupAvailable?: boolean;
  attendees?: Attendee[];
  videoUrl?: string;
};

export type Host = {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  company?: string;
};

export type Venue = {
  id: string;
  name: string;
  region: string;
  address?: string;
  image?: string;
  espressoPrice?: string;
  type?: string;
};

export type Attendee = {
  id: string;
  codeword?: string;
  publicAnswers: PublicAnswer[];
  isCurrentUser?: boolean;
};

export type PublicAnswer = {
  question: string;
  answer: string;
};

export type Reservation = {
  id: string;
  eventId: string;
  userId: string;
  status: "confirmed" | "cancelled" | "pending";
  codeword: string;
  pickupAddress?: string;
  createdAt: string;
  bailLink?: string;
};
