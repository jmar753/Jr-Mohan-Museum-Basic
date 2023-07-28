import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useRouter } from "next/router"
import { Card, Row, Col} from "react-bootstrap"
import ArtworkCard from "@/components/ArtworkCard"

export default function Favourites(){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

    return(
        <>
            <Row className="gy-4">
                {favouritesList.length > 0 ?
                    <>
                        {favouritesList.map((currentObjectID) => 
                            <Col lg={3} key={currentObjectID}>
                                <ArtworkCard objectID={currentObjectID} />
                            </Col>
                        )}
                    </>
                :
                    <Card>
                        <Card.Title>No Favourites! Add Items to Favourites to View!
                        </Card.Title>
                    </Card>
                }
            </Row>
        </>
    )
}