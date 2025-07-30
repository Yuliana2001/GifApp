
interface Props {
    searches: string[];
    //esto de acá sirve para llamar el evento de click
    onTermClicked: (term: string) => void;
}
export const PreviousSearches = ( {searches, onTermClicked}:Props) => {
    return(
                    <div className="previous-searches">
                        <h2>Busquedas previas</h2>
                        <ul className="previous-searches-list">
                            {
                            searches.map(search =>(
                                <li key={search} onClick={()=>onTermClicked(search)}>
                                    {search}</li>
                            ))}
                        </ul>
                    </div>
    )
}