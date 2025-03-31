import React from 'react'
import { useCharacters } from '../context/CharacterContext'
import { motion } from 'framer-motion';
import CharacterForm from './CharacterForm';

const Navbar = () => {

  const { toggleVisibility } = useCharacters()

  return (
      <div className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex flex-col sm:flex-row justify-between items-center shadow-lg'>
        <div className="text-center sm:text-left">
          <h1 className='text-2xl font-extrabold tracking-wide'>Sprint 04 - Integración con APIs</h1>
          <h2 className='text-md text-gray-200'>Rick and Morty's API</h2>
        </div> 

        <CharacterForm/>

            <motion.button
                className="mt-3 sm:mt-0 flex items-center gap-2 bg-white text-indigo-600 font-bold px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
                onClick={toggleVisibility}
                whileTap={{ scale: 0.95 }} // Efecto de pulsación al hacer clic
              >
                {`Ver Favoritos`}
            </motion.button>
            
      </div>
  )
}

export default Navbar