import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinner-material';

interface BtnProps {
    backgroundColor: string;
    fontColor: string;
}

const Logo = styled.img`
    height: 70%;
`;

const LoadingBtn = (props:any) => {
    const getBackgroundColor = () => {
        if (props.error) return '#df2e06';
        else if (props.loading) return props.backgroundColor ? props.backgroundColor : '#80D7EA';
        else if (props.finished) return '#84DB76';
        else return props.backgroundColor;
    }

    const Button = styled.button<BtnProps>`
        width: ${props.loading || props.finished ? '50px' : '400px'};;
        height: 50px;
        font-size: 18px;
        font-weight: 400;
        color: ${props.fontColor ? props.fontColor : 'white'};
        border-radius: ${props.loading || props.finished ? '50%' : '5px'};
        outline: none;
        border: none;
        background: ${
            props.error ? '#df2e06' :
            props.loading ? (props.backgroundColor ? props.backgroundColor : '#80D7EA') :
            props.finished ? '#84DB76' : (props.backgroundColor ? props.backgroundColor : '#2A57AD')
        }
        transition: all 200ms ease;
        display: grid;
        justify-items: center;
        align-items: center;
        cursor: ${props.loading || props.finished || props.disabled ? 'default' : 'pointer'};
        box-shadow: ${!props.disabled && '0px 4px 4px rgba(0, 0, 0, 0.25)'};
        opacity: ${props.disabled ? 0.75 : 1};

        :hover {
            filter: {
                ${!props.loading && 
                  !props.finished &&
                  !props.disabled &&
                  
                  'brightness(95%)'
                };
            }
        }

        :active {
            ${!props.loading && 
              !props.finished &&
              !props.disabled &&
            
              'filter: brightness(100%); box-shadow: none;'
            };
        }
    `;
    
    return (
        <Button 
            onClick={() => 
                !props.disabled && 
                !props.loading && 
                !props.finished && 
                !props.error &&
                props.handleClick()
            }
            backgroundColor={getBackgroundColor()}
            fontColor={props.fontColor}
        >
            {props.loading
            ? <Spinner size={35} spinnerColor='#FFF' spinnerWidth={4} visible={props.loading}/>
            : props.error 
                ? <Logo src='/icons/cross.svg' />
                : props.finished 
                    ? <Logo src='/icons/check.svg'/>
                    : props.name}
        </Button>
    );
}

export default LoadingBtn;