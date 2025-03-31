# SPRINT 04 - API Rick and Morty (React) 

Este proyecto es una aplicación en React que muestra personajes de la serie **Rick and Morty**. 
Los personajes pueden ser visualizados y guardados en favoritos. 
La aplicación utiliza la API pública de [Rick and Morty API](https://rickandmortyapi.com) para cargar los personajes y se almacenan los favoritos en el `localStorage` para persistencia de datos entre recargas de la página.

## Estructura

seeker/
├── src/
│   ├── components/
│   │   ├── CharacterCard.jsx
│   │   ├── CharactersList.jsx
│   │   ├── CharacterForm.jsx
│   │   └── FavoritesList.jsx
│   │   └── Loader.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── CharacterContext.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md


## Tecnologias utilizadas

- React: Para la construccion de la interfaz del usuario.
- React Context API: Para el manejo del estado global.
- react-tostify: Para mostrar notificaciones de exito o error al eliminar o agregar personajes favoritos.
- Fetch API: Para obtener los datos de los personajes de la API
- localStorage: Para persistir los personajes favoritos entre sesiones.

### Autor
AGUSTINASC