import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Image from "next/image";

import styled from "styled-components";

import { Global, ImagesPost,ButtonA} from "./styles";
import { Input} from 'antd';
import useInput from "../../hooks/useInput";

const Container = styled.div`
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;
`

const RecomendCard = () => {
    const [searchInput, onChangeSearchInput] = useInput('');

    const onClickRouter = useCallback(() => {
        Router.push('./new')
    });
    const onSearch = useCallback(() => {
        Router.push(`/hashtag/${searchInput}`);
    },[searchInput])

    return (
        <Container>
            <div style={{
                        maxWidth:'100vw', 
                        backgroundRepeat : 'no-repeat',
                        backgroundSize : 'cover',
                        backgroundAttachment: 'fixed',            
                        }}>
                <Image src="/images/DSCF4346.jpg"       
                        layout="responsive"
                        objectFit="cover"
                        width={4000}
                        height={1150}
                        />
            </div>
            <br/>
            <br/>
            <Input.Search 
                style={{ width: '400px' }} 
                value = {searchInput}
                onChange={onChangeSearchInput}
                onSearch={onSearch}
                />
            <br/>
            <ButtonA onClick={onClickRouter} style={{ marginTop: '30px' }}>실시간 여행 정보</ButtonA>
        </Container>
    )
}

export default RecomendCard;