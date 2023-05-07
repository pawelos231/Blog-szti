import { authMiddleware } from "@pages/api/middleware/authMiddleware";
import { LikeCommentDB } from "@server/db/comments";
import { LikeCommentEnum } from "@components/PostDetailsPage/Comments/SingleComment/types";

interface CommentLikeObject {
    flag: LikeCommentEnum;
    commentId: string;
    WhoLiked: Array<string>;
}


const checkIfToAdd = (flag: LikeCommentEnum, name: string, whoLiked: string[]): string[] => {
    if (flag === LikeCommentEnum.AddLike) {

        if (!whoLiked.find((item: string) => item === name)) {
            return [...whoLiked, name]
        }

        return whoLiked
    }

    else if (flag === LikeCommentEnum.Remove) {

        const newArr: string[] = whoLiked.filter((item: string) => item !== name)

        if (newArr.length === 0) {
            return []
        }

        return newArr
    }

    else {
        console.log("niepoprawne dane")
        return []
    }

}

export default authMiddleware(async function Handler(req, res) {
    const {flag, WhoLiked, commentId}: CommentLikeObject = JSON.parse(req.body)
    const Name = req.user.Name
    const newLikedArr: string[] = checkIfToAdd(flag, Name, WhoLiked)

    const {result, error} = await LikeCommentDB(newLikedArr, commentId)
    if (flag === LikeCommentEnum.AddLike) {
        res.status(200).json({ text: "pomyślnie dodano like'a", Name })
    }

    else if (flag === LikeCommentEnum.Remove) {
        res.status(200).json({ text: "pomyślnie odlikowano", Name })
    }

})