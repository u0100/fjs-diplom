export interface BookingDto {
  userId: string;
  hotelId: string;
  roomId: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface BookingSearchOptions {
  userId: string;
  dateStart: Date;
  dateEnd: Date;
}
