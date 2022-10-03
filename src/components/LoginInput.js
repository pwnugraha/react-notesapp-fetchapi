import useInput from "../hooks/useInput";
import PropTypes from 'prop-types';

function LoginInput({login}) {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    const onSubmitHandler = (() => {
        if (email === '') {
            alert("\"email\" is not allowed to be empty")
            return
        }
        if (password === '') {
            alert("\"password\" is not allowed to be empty")
            return
        }
        
        login({email, password});
    });

    return (
        <div className="input-login">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={onEmailChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange} />
            <button onClick={onSubmitHandler}>Login</button>
        </div>
    );
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired,
  };

export default LoginInput