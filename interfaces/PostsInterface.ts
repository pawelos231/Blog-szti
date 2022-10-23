export interface SinglePostFromDatabase {
    CreatedAt: string;
    Tags: Array<string>;
    Message: string;
    ShortDesc: string
    Title: string;
    Username: string;
    Email: string
    __v: number;
    _id: string;
  }