import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export const CharacterContext = createContext();

//Custom Hook 
export const useCharacters = () => {
    return useContext(CharacterContext)
}

export const CharacterProvider = ({ children }) => {
    
    const [ characters, setCharacters ] = useState([])
    const [ favorites, setFavorites ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ isVisible, setIsVisible ] = useState(false)
    const [ quantity, setQuantity ] = useState(6)
    const [ nameFilter, setNameFilter ] = useState("")

    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error("Error parsing favorites from localStorage:", error);
                setFavorites([]); // Si hay un error, inicia con un array vacío
            }}
            console.log(savedFavorites)
    }, []);

    

    useEffect(() => {
        if (favorites.length > 0) {
            console.log("Guardando en localStorage:", favorites);
            localStorage.setItem("favorites", JSON.stringify(favorites))
        }
    }, [favorites]);
    

    useEffect(() => {
        const fetchCharacters = async(quantity) => {
            if (!quantity) return // si quantity es el mismo valor, evita FETCH innecesario
            setLoading(true)
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/`);
                const data = await response.json();
                setCharacters(data.results.slice(0, quantity) || [])
                console.log(data.results);               
            } catch (error) {
                console.error("Error fetching characters:", error);
                toast.error("❌ ERROR",{
                    position: "top-center", 
                    autoClose: 5000,  
                    hideProgressBar: true,
                    theme: "colored",  
                  })
            } finally {
                setLoading(false)
            }         
        }
        fetchCharacters(quantity)
    }, [quantity]) 


    const toggleVisibility = () => {
        setIsVisible(!isVisible);
      };
    
      const addToFavorites = useCallback((character) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = [...prevFavorites, character]
            console.log("Favoritos actualizados: ", updatedFavorites)
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites))

            return updatedFavorites;
        })
      }, []) // para que cuando cambia Favorites no hacer render inncesarios

         /* elimina el personaje de la lista de favoritos */
      const removeFromFavorites = useCallback((id) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter((fav) => fav.id !== id);
            console.log("Favoritos actualizados: ", updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            return updatedFavorites;
        })
    }, [])

    const clearFavorites = () => {
      setFavorites([]); // Vacía el carrito
      localStorage.setItem("favorites", JSON.stringify([]))

      toast.info("🗑️ Lista de favoritos vaciada", { position: "top-center", autoClose: 2000, theme: "dark" });

  };



    return(
        <CharacterContext.Provider
            value={{ 
                characters, 
                setCharacters, 
                favorites, 
                setFavorites,
                loading, 
                setLoading,
                removeFromFavorites,
                isVisible, 
                setIsVisible,
                toggleVisibility,
                quantity, 
                setQuantity,
                nameFilter, 
                setNameFilter,
                addToFavorites,
               
                clearFavorites
            }}
        >
            { children }
        </CharacterContext.Provider>
    )
}

