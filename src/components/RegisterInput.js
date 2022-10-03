import useInput from "../hooks/useInput";
import PropTypes from 'prop-types';

function RegisterInput({register}) {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    const onSubmitHandler = (() => {
        if (name === '') {
            alert("\"name\" is not allowed to be empty")
            return
        }
        if (email === '') {
            alert("\"email\" is not allowed to be empty")
            return
        }
        if (password === '') {
            alert("\"password\" is not allowed to be empty")
            return
        }
        
        register({name, email, password});
    });

    return (
        <div className="input-register">
            <label htmlFor="name">Name</label>
            <input type="name" id="name" value={name} onChange={onNameChange} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={onEmailChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange} />
            <button onClick={onSubmitHandler}>Register</button>
        </div>
    );
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
  };

export default RegisterInput