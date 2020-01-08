import React from 'react'
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';

const Img = styled.img`
    max-height: 450px;
    object-fit: cover;
`;

const Overlay = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70%;
    background-image: linear-gradient(rgba(0,0,0, 0.0), rgb(0,0,0));
`;

const HeaderCarousel = (props: { data: any[]; }) => {
    let items: JSX.Element[] = [];

    props.data.forEach((a: any) => {
        items.push(
            <Carousel.Item>
                <Overlay />

                <Img
                    className="d-block w-100"
                    src={a.img}
                    alt={a.name}
                />
                <Carousel.Caption>
                    <h3>{a.title}</h3>
                    <p>{a.summary}</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    });

    return <Carousel>{items}</Carousel>;
}

export default HeaderCarousel;