export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: number;
  birthDate: Date;
  daysUntilNextBirthDate?: number;
}
