export const DetailPokemon = (props: any) => {


  return (
    <div>
      <h1>DETAIL POKEMONS {props.match.params.id}</h1>
      <div>
        <button onClick={props.history.goBack}>
          BACK
        </button>
        <button>
          CATCH
        </button>
      </div>
    </div>
  )
}

