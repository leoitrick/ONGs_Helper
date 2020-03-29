import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 
import './styles.css';

import api from '../../service/api';

import logoImg from '../../assets/logo.svg';

export default function Register () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }
       
        try {
            const response =  await api.post('ongs', data);
            alert(`Your access ID is: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('There was an error, please try again.');
            history.push('/register');
        }
      
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Registration</h1>
                    <p>Sign up, log in and help people find incidents of your ONG.</p>

                    <Link className="back-link" to ="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Have an account? Log in</Link>
                </section>
                <form onSubmit= {handleRegister}>
                    <input 
                        placeholder="ONG Name"
                        value={name}
                        onChange = { e=> setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange = { e=> setEmail(e.target.value)}
                        />
                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange = { e=> setWhatsapp(e.target.value)}
                        />
                    <div className="input-group">
                        <input 
                            placeholder="City"
                            value={city}
                            onChange = { e=> setCity(e.target.value)}
                            />
                        <input 
                            placeholder="UF" 
                            style= {{ width: 80 }}
                            value={uf}
                            onChange = { e=> setUf(e.target.value)}
                            />
                    </div>
                    <button className="button">Register</button>
                </form>
            </div>
        </div>
    );
}