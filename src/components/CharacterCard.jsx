import React from 'react'
import { useCharacters } from '../context/CharacterContext'
import { toast } from "react-toastify";


const CharacterCard = ( { character }) => {
    const { favorites, setFavorites } = useCharacters()

    const isFavorite = favorites.some((fav) => fav.id === character.id) //para chequear si ya esta en el Arr de favoritos

      const toggleFavorite = () => {

          if (isFavorite) {
              const updatedFavorites = setFavorites(favorites.filter((fav) => fav.id !== character.id));//para eliminar
              setFavorites(updatedFavorites)
              
              localStorage.setItem("favorites", JSON.stringify(updatedFavorites))

              toast.error("❌ Personaje eliminado",{
                position: "top-center", 
                autoClose: 3000,  
                hideProgressBar: true,
                theme: "dark",  
              })
            } else {
              const updatedFavorites = setFavorites([...favorites, character]);

              localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

              toast.success("⭐ Personaje agregado a favoritos!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,  // Permite cerrar haciendo clic
                pauseOnHover: true,  // Pausa la animación al pasar el mouse
                draggable: true,  // Permite arrastrar la notificación
                theme: "dark",
              });
            }
        }
    

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden m-3">
        <img src={character.image} alt={character.name} className=" object-cover"/>
        <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg font-bold">{character.name}</h2>
            <p className="text-gray-600">{character.species} - {character.status}</p>
            <p className="text-gray-500">Ubicacion : {character.location.name}</p>
            <button 
                className='bg-emerald-800 text-white p-2 m-1'
                onClick={toggleFavorite}
            >
                {isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
            </button>
        </div>
    </div>
  )
}

export default CharacterCard