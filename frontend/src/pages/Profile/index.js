import React, {useState ,useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../service/api';

import "./styles.css";

export default function Profile (){
    const [incidents, setIncidents] = useState ([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect( () => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then (response => {
            setIncidents(response.data);
        })
    }, [ongId]);


    async function handleDeleteIncident (id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id ));
        } catch (error) {
            alert('Error to delete the incident');
        }

    }

    function handleLogout (){
        localStorage.clear();
        history.pushState('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                 <span>Welcome, {ongName}/</span>

                <Link className="button" to = "/incidents/new"> Add a new incident </Link>
                <button onClick={handleLogout} type="button ">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Incidents Registered</h1>

            <ul>
               {incidents.map(incident => (
                   <li key={incident.id}>
                        <strong>CASE:</strong>
                         <p>{incident.title}</p>

                         <strong>DESCRIPTION:</strong>
                         <p>{incident.description}</p>

                         <strong>VALUE</strong>
                         <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}</p>

                   <button onClick = {()=> handleDeleteIncident(incident.id)} type="button" >
                       <FiTrash2 size= {20} color= "#a8a8b3" />
                   </button>
               </li>
               ))}
            </ul>
        </div>
    );
}