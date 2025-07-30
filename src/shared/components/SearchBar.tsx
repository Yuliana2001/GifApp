import { useEffect, useState } from "react";

export interface Props{
    description?: string;
    onQuery: (query: string) => void;
}
export const SearchBar=({description="Buscar", onQuery}:Props)=>{
    const [query, setQuery] = useState('');

    //IMPORTANTE:
    // useEffect se ejecuta cuando el componente se monta y cada vez que cambia el estado de query
    // useEffect para manejar el efecto de búsqueda
    // cuando el usuario escribe en el input
    useEffect(()=>{
        const timeOutId=setTimeout(()=>{
            onQuery(query);
        },700)
        // onQuery(query);
        return () => {
            clearTimeout(timeOutId); // Limpiar el timeout si el componente se desmonta o cambia el query
        }
    },[query, onQuery]);


    const handleSearch = () => {
    onQuery(query);
    }

    return(
        <div className="search-container">
            <h1>{query}</h1>
            <input type="text" placeholder={description}
            value={query} onChange={(event)=>setQuery(event.target.value)}
            onKeyDown={(event)=>{if(event.key==='Enter'){
                handleSearch();
            }}}/>
            <button onClick={handleSearch}>Buscar </button>
        </div>
    )
}