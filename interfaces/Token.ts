export interface VerifiedToken {
  Name: string;
  Email: string;
  exp?: number;
  iat: number;
  nbf?: number;
}
