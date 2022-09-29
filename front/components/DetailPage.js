import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    text-align: center;
    justify-content: center;
`

const DetailPage = ({postTitle, postContent, postImage}) => {
    
    return(
        
        <Container>
            <img src={postImage[0].src}/>
            <br/>
            <h3>{postTitle}</h3>
            <br/>
            <p>{postContent}</p>
        </Container>
    )
}

export default DetailPage