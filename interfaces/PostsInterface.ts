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

  export interface CommentsOnPost{
    _id?: string
    __v?: string
    UserId?: string
    PostId: string
    CreatedAt: string
    Content: string
    WhoLiked: Array<string>
    ParentId: string
    NestedLevel: number
    UpdatedAt: string
    UserName: string
    childred?: CommentsOnPost | null
  }
  //add slug,number of visits 