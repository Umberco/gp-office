import React, {useState, useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom"
import { Link } from 'react-router-dom';

import { FaqSimple } from '../clients_zone/FaqSimple';

function Clients() {
    const location = useLocation()
    const [showMenu, setShowMenu] = useState(true)

    useEffect(() => {
        // Pokud je cesta "/clients", zobrazí se menu, jinak se skryje
        setShowMenu(location.pathname === '/clients');
    }, [location]);
    
    return ( 
        <>
            {showMenu && (
                <nav>
                    <ul>
                        <li><Link to="/clients/faq">FAQ</Link></li>
                        <li><Link to="/clients/anamnesis">ANAMNÉZA</Link></li>
                    </ul>
                </nav>
            )}
            <Outlet />
        </>
    );
}

export default Clients;