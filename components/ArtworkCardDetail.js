import Error from "next/error";
import Card from 'react-bootstrap/Card'
import { Button } from "react-bootstrap";
import  useSWR  from "swr"
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState } from "react";

export default function ArtworkCardDetail({objectID}) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState((cond) => favouritesList.includes(objectID) ? true : false)
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

    function favouritesClicked(){
        if(showAdded){
            setFavouritesList(current => current.filter(fav => fav != objectID))
            setShowAdded(false)
        }
        else{
            setFavouritesList(current => [...current, objectID])
            setShowAdded(true)
        }
    }

    return (
        <>
            {error ? 
                <Error statusCode={404} /> 
            :
                (data?
                    <Card>
                        <Card.Img src={data.primaryImage? data.primaryImage : null}/>
                        <div className="p-3">
                            <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                            <Card.Text>
                                <p>Date: {data.objectDate ? data.objectDate : 'N/A'} </p>
                                <p>Classificiation: {data.classification ? data.classification : 'N/A'} </p>
                                <p>Medium: {data.medium ? data.medium : 'N/A'}</p>
                                <br/>
                                <br/>
                                <p>Artist: {data.artistDisplayName ? data.artistDisplayName : 'N/A'}</p>
                                <p>Credit Line: {data.creditLine ? data.creditLine : 'N/A'} </p>
                                <p>Dimensions: {data.dimensions ? data.dimensions : 'N/A'}</p>
                                <Button onClick={()=>favouritesClicked()} variant={showAdded === true ? "primary" : "outline-primary"}> {showAdded ? "Favourite (added)" : "+ Favourite"}</Button>
                                {data.artistWikidata_URL ? 
                                    <><br/><a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a></>
                                : 
                                    null}
                                <br/>
                            </Card.Text>
                        </div>
                    </Card>
                :
                    null
                )
            }
        </>
    )
}
