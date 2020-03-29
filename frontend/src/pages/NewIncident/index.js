import React, {useState} from 'react';

import { Link , useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../service/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident (){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            history.push('/profile');
        } catch (error) {
           alert('Error: Incident not registred.'); 
        }

        
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Add a new incident</h1>
                    <p>Describe the incident that you want to find a hero to help</p>

                    <Link className="back-link" to ="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Back to home</Link>
                </section>
                <form>
                    <input 
                    placeholder="Incident Tittle"
                    value={title}
                    onChange= {e => setTitle(e.target.value)}
                    />

                    <textarea 
                    placeholder="Description"
                    value={description}
                    onChange= {e => setDescription(e.target.value)}
                    />

                    <input 
                    placeholder="Value"
                    value={value}
                    onChange= {e => setValue(e.target.value)}
                    />

                  
                    <button onClick= {handleNewIncident} className="button">Add</button>
                </form>
            </div>
        </div>
    );
}