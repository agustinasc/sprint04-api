import React, { useRef } from 'react'
import { useCharacters } from '../context/CharacterContext'



const CharacterForm = () => {
   
    const { setQuantity, setNameFilter} = useCharacters()
   /*  const [ inputValue, setInputValue ] = useState("")
    const [ inputName, setInputName ] = useState("") */
  
    const inputRef = useRef(null);
    const nameRef = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedQuantity = parseInt(inputRef.current.value, 10)
        if(parsedQuantity > 0 ){
            setQuantity(parsedQuantity)
            inputRef.current.value = ""
        }
    }

    const handleSubmitName = (e) => {
        e.preventDefault()
        setNameFilter(nameRef.current.value) //actualizar los estados solo cuando se haga submit.
        nameRef.current.value = ""
    }

   
 
  return (
    <div className='flex max-w mx-auto p-6 bg-indigo-600 shadow-md rounded-lg'>
        <form 
            className='flex flex-col sm:flex-row gap-4 m-4'
            onSubmit={handleSubmit}
        >
            <input 
                type="number" 
                /* value={inputValue}  */
                ref={inputRef}
                min={1}
                placeholder='Ingregar cantidad de personajes'
                className='border p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                /* onChange={(e) => setInputValue(e.target.value)} */
                    
            />
            <button 
                type="submit"
                className='flex items-center gap-2 bg-blue-800 text-white px-5 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95'
            >
                Buscar por cantidad
            </button>
        </form> 
    

        <form
            className='flex flex-col sm:flex-row gap-4 m-4'
            onSubmit={handleSubmitName}
        >
            <input 
                type="text" 
                /* value={inputName} */
                ref={nameRef}
                placeholder='Ingresar nombre de un personaje'
                className='border p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
               /*  onChange={(e) => setInputName(e.target.value)} */
            />
            <button 
                className='flex items-center gap-2 bg-blue-800 text-white px-5 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95'
                type="submit"
             >
                Buscar por Nombre
            </button>
        </form>

       
    </div> 
  )
}

export default CharacterForm