import React from 'react';

const PostCardTitle = ({postTitle}) => {
    return (
        <div>
            <h3>
                {postTitle.split(/(#[^\s#]+)/g).map((v, i) => {
                    if (v.match(/(#[^\s]+)/)) {
                        return <Link href={`hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
                    }
                    return v;
                })}
            </h3>
        </div>
    )
}

export default PostCardTitle;