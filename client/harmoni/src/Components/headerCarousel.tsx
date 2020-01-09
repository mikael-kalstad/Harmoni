import React from 'react'
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Img = styled.img`
    height: 450px;
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

const Title = styled.h3`
    width: 60%;
    margin: auto;
`;

const HeaderCarousel = (props: any) => {
    let items: JSX.Element[] = [];

    const card = (a:any) => (
        <>
            {a.img
                ? (<>
                        <Overlay />

                        <Img
                            className="d-block w-100"
                            src={a.img}
                            alt={a.title}
                        />
                    </>
                )
                : (<SkeletonTheme color={'#F1F1F9'}>
                        <Skeleton height='450px' />
                    </SkeletonTheme>    
                )
            }
            <Carousel.Caption>
                <Title>{a.title}</Title>
            </Carousel.Caption>
        </>
    )

    // Lazy load carousel if data is not defined/loaded in props
    items.push(
        <Carousel.Item>
            {card([])}
        </Carousel.Item>
    );

    // Load carousel with data if it is defined
    if (props && props.data && props.data !== undefined) {
        // Remove lazy loading cards
        items = [];

        props.data.forEach((a:any) => {
            items.push(
                <Carousel.Item>
                    <Link to={'/event'+a.id}>
                        {card(a)}
                    </Link>
                </Carousel.Item>
            );
        });
    }

    return <Carousel>{items}</Carousel>;
}

export default HeaderCarousel;