import { createContext, useContext, useState, useEffect } from "react";
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
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites)
    }, [])

    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
          }
      }, [favorites])
    

    useEffect(() => {
        const fetchCharacters = async(quantity) => {
            
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

    const removeFromFavorites = (id) => {
            setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
        } 

    

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
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
                setNameFilter
            }}
        >
            { children }
        </CharacterContext.Provider>
    )
}

