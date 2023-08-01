import { searchHistoryAtom } from "@/store"
import { useAtom } from "jotai"
import { useRouter } from "next/router";
import { ListGroup } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import { Button } from "react-bootstrap";
import styles from '@/styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";


export default function History(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter();
    if(!favouritesList) return null;
    let parsedHistory = [];

    searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        router.push(`/artwork?${searchHistory[index]}`)
    }

    async function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index])) 
        
    }

    return(
        <>
            {parsedHistory.length === 0 ? 
                <Card>
                    <Card.Title>No History to Check</Card.Title>
                </Card>
            :   
                <ListGroup>
                        {parsedHistory.map((historyItem, index) => 
                            <ListGroup.Item onClick={(event) => historyClicked(event, index)}  className={styles.historyListItem} key={historyItem}>
                                {Object.keys(historyItem).map((key) => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                                <Button className="float-end" variant="danger" size="sm" 
                                onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                            </ListGroup.Item>
                        )}
                </ListGroup>
            }
        </>
    )
}