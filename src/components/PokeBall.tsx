import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

import pokeBallImage from "../assets/pokeball.webp";

const PokeBallStyled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;

  img{
    width: 100px;
  }

  >div{
    width: fit-content;
    padding: 10px 20px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: .1s;
    margin-bottom: 10px;
    filter: grayscale(100%);
    text-align: center;

    img{
      cursor: pointer;
    }
    &:hover{
      filter: none;
      transform: scale(1.1);
    }
  }


  img.rotate{
    -webkit-animation: rotation 2s infinite linear;
    -moz-animation: rotation 2s infinite linear;
    animation: rotation 2s infinite linear;
  }

  @-webkit-keyframes rotate{
    from {-webkit-transform: rotate(0deg);}
    to   {-webkit-transform: rotate(359deg);}
  }
  @-moz-keyframes rotate{
    from {-webkit-transform: rotate(0deg);}
    to   {-webkit-transform: rotate(359deg);}
  }
  @keyframes rotate{
    from {-webkit-transform: rotate(0deg);}
    to   {-webkit-transform: rotate(359deg);}
  }
`

interface PokeBallPropTypes {
  isCatching?: boolean,
  onClick?: MouseEventHandler
}

export const PokeBall = ({ isCatching = true, onClick = (evt) => { } }: PokeBallPropTypes) => {
  return (
    <PokeBallStyled>
      <div onClick={onClick} data-testid="pokeball">
        <img
          src={pokeBallImage}
          alt="pokeball"
        />
        <p>{isCatching ? "CATCH" : "RELEASE"}</p>
      </div>
    </PokeBallStyled>
  )
}

export const PokeBallImage = (props: any) => {
  return (
    <img
      style={{ width: '100px' }}
      src={pokeBallImage}
      {...props}
    />
  )
}

