import React from 'react'
import { useCharacters } from '../context/CharacterContext'
import CharacterCard from './CharacterCard'
import Loader from './Loader'

const CharactersList = () => {

    const { characters, loading, nameFilter } = useCharacters()

    if (loading) return <Loader />

    const filteredCharacters = nameFilter ? characters.filter(character => character.name.toLowerCase().includes(nameFilter.toLowerCase())) : characters

  return (
    <div className="flex flex-col justify-center bg-lime-800 p-2">
        <div className='m-10'>
            <h2 className='text-white font-bold text-5xl'>Lista de Personajes</h2>
        </div>
        <div className='flex flex-wrap justify-center gap-4'>
            {characters.length > 0 ? (
                filteredCharacters.map((character) => (
                    <div 
                        key={character.id} 
                        className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                    >
                        <CharacterCard  character={character}/>
                    </div>
                ))
            ) : (
                <p>
                    No se encontraron personajes
                </p>
            )
        }
            
        </div>
    </div>
  )
}

export default CharactersList