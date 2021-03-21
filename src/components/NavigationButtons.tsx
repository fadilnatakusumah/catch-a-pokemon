import { Link, useHistory } from "react-router-dom";
import { CgPokemon, CgShoppingBag } from "react-icons/cg"

import { PokemonTypes } from "../@types/context";
import styled from "@emotion/styled";

interface NavigationButtonsPropTypes {
  pokemon?: PokemonTypes
}

const NavStyled = styled.nav`
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 18px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;

  >a{
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 4px 8px;
    color: #333;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    gap: 10px;
    border-radius: 5px;
    font-size: 14px; 
    transition: .1s;
    white-space: nowrap;

    &.active{
      background-color: #ccc;
    }

    &:hover{
      transform: scale(1.05);
      background-color: #333;
      color: #f9f9f9
    }

    >svg {
    font-size:1.2em; 
      /* height: 50px; */
    }
  }
`

export const NavigationButtons = ({ pokemon }: NavigationButtonsPropTypes) => {
  const router = useHistory();
  const { pathname } = router.location

  return (
    <NavStyled>
      <Link to="/" className={pathname === "/" ? "active" : ""}>
        <CgPokemon />
        <span>
          Catch a Pokemon
        </span>
      </Link>
      <Link to="/my-pokemons" className={pathname === "/my-pokemons" ? "active" : ""}>
        <CgShoppingBag />
        <span>
          My Pokemons
        </span>
      </Link>
    </NavStyled>
  )
}

