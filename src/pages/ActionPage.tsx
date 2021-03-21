import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { FaChevronCircleLeft, FaPencilAlt } from "react-icons/fa";

import { Wrapper } from "../components/Wrapper";
import { useDataHook } from "../utils/hooks";

import pokeBallImage from "../assets/pokeball.png";
import footprintsImage from "../assets/footprints.png";
import gotchaImage from "../assets/gotcha.png";


const ActionPageStyled = styled.div<{ bgColor?: string }>`
  background-color: ${(props: any) => props.bgColor || "#F6F8FA"};
  min-height: 100vh;
  transition: .5s;

  .action-state{
    text-align: center;
    padding: 20px;

    >.catching{
      img {
        width: 100px;
      }
    }
    >.got-away,.gotcha{
      img {
        width: 200px;
      }

      div.back-button{
        display: inline-block;
        margin: 20px 0;
        font-size: 2em;
        color: #FF9C0D;
      }
    }
  }
`

export const ActionPage = (props: RouteComponentProps) => {
  const [pokemonName, setPokemonName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    subtitle: "",
  });
  const { ownedLength, savePokemon, isAlreadyExist, updatePokemon, releasePokemon } = useDataHook();
  const { state } = props.location;
  console.log("🚀 ~ file: ActionPage.tsx ~ line 55 ~ ActionPage ~ props", props)

  useEffect(() => {
    if (state?.isCatching) {
      setMessage({ ...message, title: "Catching..." })
      setIsLoaded(true);
      setTimeout(() => {
        let isSuccessful = false;
        if (true) {
          // if (Math.random() >= 0.5) {
          isSuccessful = true;
          if (isAlreadyExist(state.pokemon)) {
            const newPokemon = { ...state.pokemon, name: `${state.pokemon.name} ${ownedLength(state.pokemon)}` }
            savePokemon(newPokemon);
            setMessage({ subtitle: "But already have one, so you need to give it a different name", title: "Success!" });
            setShowInput(true);
          } else {
            savePokemon(state.pokemon);
            setMessage({ subtitle: "Gotta catch'em all", title: "Success!" });
          }
        } else {
          setMessage({ subtitle: "Catch'em again", title: "It got away!" });
        }
        setIsReady(true);
        props.history.replace(
          '/my-action',
          {
            ...state,
            isCatching: false,
            isSuccessful,
          })
      }, 2000)
    } else if (state.isReleasing) {
      setIsLoaded(true);
      setMessage({ subtitle: "Goodbye friend..", title: "Released" });
      releasePokemon(state.pokemon);
      console.log("🚀 ~ file: ActionPage.tsx ~ line 93 ~ useEffect ~ state.pokemon", state.pokemon)
      props.history.replace(
        '/my-action',
        {
          ...state,
          isReleasing: false,
          isSuccessful: true,
        })
    } else {
      goBack();
    }
  }, []);

  const goBack = () => {
    props.history.replace('/', null)
  }

  const onDoneEditName = () => {
    if (state.pokemon.name?.toLowerCase() === pokemonName.toLowerCase()) return;
    if (isAlreadyExist({ ...state.pokemon, name: pokemonName })) return;

    const oldPokemon = { ...state.pokemon, name: `${state.pokemon.name} ${ownedLength(state.pokemon)}` }
    const newPokemon = { ...state.pokemon, name: pokemonName };
    updatePokemon(oldPokemon, newPokemon);
    props.history.replace(
      '/my-action',
      {
        ...state,
        newPokemon
      })
  }

  const renderStatus = () => {
    const { title, subtitle } = message;
    if (state?.isCatching && !isReady) {
      return (
        <div className={"catching"}>
          <img src={pokeBallImage} />
          <h1>{title}</h1>
        </div>
      )
    }

    if (!state.isCatching && !state.isSuccessful || state.isReleasing !== undefined) {
      return (
        <div className={"got-away"}>
          <img src={footprintsImage} />
          <h1>{title}</h1>
          <h4>{subtitle}</h4>
          <div className="back-button" onClick={goBack}>
            <FaChevronCircleLeft />
          </div>
        </div>
      )
    }

    return (
      <div className={"gotcha"}>
        <img src={gotchaImage} />
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
        {showInput && (
          <div style={{ margin: '30px 0' }}>
            <InputPreview
              initialValue={state.pokemon.name}
              onChange={(value) => setPokemonName(value)}
              onToggle={onDoneEditName}
              show
            />
          </div>
        )}
        <div className="back-button" onClick={goBack}>
          <FaChevronCircleLeft />
        </div>
      </div>
    )
  }

  return (
    <ActionPageStyled>
      <Wrapper title={"Action"}>
        <div className="action-state">
          {/* {renderStatus() } */}
          {isLoaded ? renderStatus() : null}
        </div>
      </Wrapper>
    </ActionPageStyled>
  );
}


const InputPreviewStyled = styled.div<any>`
  display: inline-flex;
  justify-content: center;
  position: relative;
  background: white;
  border: ${props => props.showInput ? "1px solid #ccc" : ""};
  align-items: center;
  padding: 10px 20px;
  min-width: 200px;
  min-height: 40px;
  text-align: center;
  border-radius: ${props => props.showInput ? "" : "10px"};
  box-shadow: 2px 1px 5px #ccc;
  padding: 0 20px;

  >input{
    font-size: 18px;
    border: none;
    outline: none;
  }
  >span{
    font-size: 18px;
    color: #444;
    text-transform: capitalize;
  }

  >div.edit-button{
    position: absolute;
    right: -10px;
    background-color: gold;
    cursor: pointer;
    padding: 5px 8px;
    transition: .3s;
    border-radius: 50%;

    &:hover{
      transform: translateY(5px);
    }
  }
`

export const InputPreview = ({
  initialValue = "Name of Pokemon",
  show = false,
  onChange = (evt: any) => { },
  onToggle = () => { },
  editable = true,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [showInput, setShowInput] = useState(show);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    }
  }, [])

  return (
    <InputPreviewStyled showInput={showInput}>
      {showInput ? (
        <input
          {...props}
          ref={inputRef}
          value={value}
          onChange={({ target }) => {
            setValue(target.value);
            onChange(target.value);
          }} />
      )
        : <span>{value}</span>
      }
      {editable &&
        <div className="edit-button" onClick={() => {
          onToggle();
          setShowInput(!showInput)
        }}>
          <FaPencilAlt />
        </div>}
    </InputPreviewStyled>
  )
}