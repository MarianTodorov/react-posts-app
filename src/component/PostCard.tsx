import style from "./PostCard.module.css";
import type {Posts} from "../interface/Posts.ts";

function PostCard({ userId, id, title, body }:Posts ){

    return(
        <>
            <div className={style.postCard}>
                <div className={style.postHeader}>
                    <span className={style.postUser}>User {userId}</span>
                    <span className={style.postId}>#{id}</span>
                </div>
                <div>
                    <h2 className={style.postTitle}>{title}</h2>
                    <div className={style.postBody}>{body}</div>
                </div>

            </div>

        </>
    )
}

export default PostCard;