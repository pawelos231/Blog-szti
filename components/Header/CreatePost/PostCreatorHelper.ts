import { IPost } from "@interfaces/PostsInterface";
import { GenerateDateString } from "@helpers/NormalizeDate";
export const createPostObject = <F extends Function>(message, title, tags, shortOpis, countWord: F): Omit<IPost, "Username"> => {
    return {
        Message: message,
        Title: title,
        Tags: tags,
        ShortDesc: shortOpis,
        CreatedAt: GenerateDateString(),
        Category: "test",
        TimeToRead: 5,
        TotalWords: countWord(),
        CommentsCount: 5,
        Likes: 5,
        WhoLiked: [],
      };
}