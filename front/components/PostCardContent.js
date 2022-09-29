import React from "react";
import Link from "next/link";


//여기서 타이틀 누르면 detailpage로 넘어가게 만들어주기
//new 글

const PostCardContent = ({ postContent }) => (
    <div>
        {postContent.split(/(#[^\s#]+)/g).map((v, i) => {
            if(v.match(/(#[^\s]+)/)){
                return <Link href={`hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
            }
            return v;
        })}
    </div>
)

export default PostCardContent;