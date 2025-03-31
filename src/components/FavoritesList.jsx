import { AnimatePresence, motion } from "motion/react"
import React from 'react'
import { useCharacters } from '../context/CharacterContext'
import { toast } from "react-toastify";

const FavoritesList = () => {

    const { favorites, removeFromFavorites, isVisible, setIsVisible, clearFavorites } = useCharacters();

    if(!isVisible) return null
       
    return (
        <AnimatePresence>
        {isVisible && (
          <motion.aside
          className="fixed right-0 top-0 h-full w-64 bg-blue-900 text-white shadow-lg p-4 overflow-y-auto"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.5 }}
        >
                 {/* Botón de cierre de Favoritos*/}
                 <button
            className="absolute top-2 right-2 bg-black hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs"
            onClick={() => setIsVisible(false)}
          >
            ❌
          </button>

          <h2 className="text-xl font-bold mb-4 text-center">Favoritos</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-400 text-center">Sin favoritos</p>
          ) : (
            <div className="space-y-4">
              {favorites.map((character) => (
                <div key={character.id} className="flex items-center space-x-3 bg-gray-800 p-2 rounded-lg">
                  <img src={character.image} alt={character.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{character.name}</p>
                  </div>
                  <button
                    className="bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700"
                    onClick={() => {
                      removeFromFavorites(character.id);
                       toast.error("❌ Personaje eliminado",{
                                      position: "top-center", 
                                      autoClose: 3000,  
                                      hideProgressBar: true,
                                      theme: "dark",  
                                    })
                      
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
                className="w-full bg-red-700 text-white py-2 rounded mt-4 hover:bg-red-800"
                onClick={() => clearFavorites()}
          >
                Vaciar Favoritos
              </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
  
}

export default FavoritesList