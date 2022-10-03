import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import contentData from '../utils/content-data';

function RegisterPage() {
    const navigate = useNavigate();
    const { locale } = React.useContext(LocaleContext);

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if (!error) {
            navigate('/');
        }
    }

    return (
        <section className='register-page'>
            <h2>{contentData[locale].register_title}</h2>
            <RegisterInput register={onRegisterHandler} />
            <p>{contentData[locale].register_foot} <Link to="/">{contentData[locale].register_foot_link}</Link></p>
        </section>
    )
}

export default RegisterPage;