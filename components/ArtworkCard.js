import Error from "next/error";
import Card from 'react-bootstrap/Card'
import { Button } from "react-bootstrap";
import  useSWR  from "swr"
import Link from "next/link";

export default function ArtworkCard({objectID}) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    return (
        <>
            {error ? 
                <Error statusCode={404} /> 
            :
                (data?
                    <Card>
                        <Card.Img src={data.primaryImageSmall ? data.primaryImageSmall : `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`}/>
                        <div className="p-2">
                            <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                            <Card.Text>
                                <p>Date: {data.objectDate ? data.objectDate : 'N/A'} </p> 
                                <p>Classificiation: {data.classification ? data.classification : 'N/A'} </p>
                                <p>Medium: {data.medium ? data.medium : 'N/A'}</p>
                                <Link href={`/artwork/${objectID}`} passHref legacyBehavior><Button>{`${objectID}`}</Button></Link>
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
