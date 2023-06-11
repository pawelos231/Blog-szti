export interface IPost {
  _id?: string;
  CreatedAt: string;
  UpdatedAt?: string;
  Tags: string[];
  Message: string;
  ShortDesc: string;
  Title: string;
  Username?: string;
  Email?: string;
  Category: string;
  CommentsCount: number;
  TimeToRead: number;
  TotalWords: number;
  Likes: number;
  WhoLiked: string[];
  __v?: number;
  slug?: string;
  numberOfVisits?: number;
}

export interface IPostComment {
  _id?: string;
  __v?: string;
  UserId?: string;
  PostId: string;
  CreatedAt: string;
  UpdatedAt?: string;
  Content: string;
  WhoLiked: string[];
  ParentId: string;
  NestedLevel: number;
  UserName: string;
  childred?: IPostComment[] | null;
}
