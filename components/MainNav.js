
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
	const [searchField, setSearchField] = useState('');
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
 
	const router = useRouter();
	let token = readToken();

	async function submitForm(e) {
		e.preventDefault();
		setIsExpanded(false)
		setSearchHistory(await addToHistory(`title=true&q=${searchField}`)) 
		router.push(`/artwork?title=true&q=${searchField}`)
	}

	function logout() {
		setIsExpanded(false)
		removeToken();
		router.push('/login');
	}
	
    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Jr Mohan</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>setIsExpanded(!isExpanded)}/>
                    <Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={()=>setIsExpanded(false)}>Home</Nav.Link></Link>
							{token && 
								<Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={()=>setIsExpanded(false)}>Advanced Search</Nav.Link></Link>
							}
							{!token &&
								<>
									<Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={()=>setIsExpanded(false)}>Login</Nav.Link></Link>
									<Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={()=>setIsExpanded(false)}>Register</Nav.Link></Link>
								</>
							}
                        </Nav>
						&nbsp;
						{token &&
							<Form className="d-flex" onSubmit={submitForm}>
								<Form.Control
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
								value={searchField}
								onChange={(e)=>setSearchField(e.target.value)}
								/>
								<Button variant="outline-success" type="submit">Search</Button>
							</Form>
						}
						&nbsp;
						{token &&
							<Nav className="d-flex">
								<NavDropdown title={token.userName} id="basic-nav-dropdown">
									<Link href="/favourites" passHref legacyBehavior>
										<NavDropdown.Item active={router.pathname === "/favourites"} onClick={()=>setIsExpanded(false)}>Favourites</NavDropdown.Item>
									</Link>
									<Link href="/history" passHref legacyBehavior>
										<NavDropdown.Item active={router.pathname === "/history"} onClick={()=>setIsExpanded(false)}>History</NavDropdown.Item>
									</Link>
									<NavDropdown.Item onClick={()=>logout()}>Logout</NavDropdown.Item>
								</NavDropdown>
							</Nav>						
						}
						&nbsp;
                    </Navbar.Collapse>
                </Container>
            </Navbar>
			<br/>
			<br/>
        </>
    );
}