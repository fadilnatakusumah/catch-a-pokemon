import { useDataHook } from "./hooks"
import { renderHook, act } from '@testing-library/react-hooks'

const dummyPokemon = {
  name: "dummy",
  image: "",
  url: "",
  id: 1,
}

describe('all functionality of useDataHook', () => {
  const { result } = renderHook(() => useDataHook());
  it('should save pokemon', async () => {
    act(() => result.current.savePokemon(dummyPokemon));

    expect(result.current.myPokemons.includes(dummyPokemon)).toBe(true);
  })

  it('should update pokemon', async () => {
    const newPokemon = { name: "new dummy", id: 1, url: "", image: "" };
    act(() => result.current.updatePokemon(dummyPokemon, newPokemon));

    expect(result.current.myPokemons.includes(newPokemon)).toBe(true);
  })

  it('should check pokemon exist', async () => {
    const check = result.current.isAlreadyExist(dummyPokemon)
    expect(check).not.toBe(null);
  })

  it('should release pokemon', async () => {
    act(() => result.current.releasePokemon(dummyPokemon));

    expect(result.current.myPokemons.includes(dummyPokemon)).toBe(false);
  })
})
