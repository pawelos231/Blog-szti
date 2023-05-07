import { Document } from "mongoose";

export interface Comment extends Document {
    UserId: string;
    PostId: string;
    CreatedAt: Date;
    Content?: string;
    WhoLiked?: string[];
    ParentId?: string;
    NestedLevel?: number;
    UpdatedAt?: Date;
    UserName?: string;
  }
