export interface SinglePostFromDatabase {
    CreatedAt: string;
    Tags: Array<string>;
    Message: string;
    ShortDesc: string
    Title: string;
    Username?: string;
    Email?: string
    Category: string;
    CommentsCount: number;
    TimeToRead: number;
    TotalWords: number;
    Likes: number;
    WhoLiked: Array<string>;
    __v?: number;
    _id?: string;
  }

  //add slug 