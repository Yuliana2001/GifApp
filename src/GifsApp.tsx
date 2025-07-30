import { useState } from "react"
import { GifsList } from "./gifs/components/GifsList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/interfaces/gif.interface"


export const GifsApp = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = (term: string) => {
        console.log(`Término seleccionado: ${term}`);
    }

    //query es lo que el usuario escribe en el input
    const handlesSearch=async (query:string='')=>{
        query = query.trim().toLocaleLowerCase();
        if(query.length === 0) {
            return;
         }
         if(previousTerms.includes(query)) {
            return;
        }
        const currentTerms = previousTerms.slice(0, 6);
        currentTerms.unshift(query);
        setPreviousTerms(currentTerms);
        await getGifsByQuery(query);
        const gifs = await getGifsByQuery(query);
        setGifs(gifs);
    }

    return (
        <>
        <CustomHeader title="Busacador de Gifts" description="Encuentra el gif de hoy" />
        <SearchBar description="qué tal si empiezas por conejitos?" onQuery={handlesSearch}/>

            {/* Búsquedas previas */}
        <PreviousSearches searches={previousTerms} onTermClicked={handleTermClicked}/>
            {/* Gifs */}
        <GifsList gifs={gifs} />
            
        </>
    )
}