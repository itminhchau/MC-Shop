import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'Features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Login.propTypes = {
    loginClose: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const { loginClose } = props

    const handleOnsubmit = async (values) => {
        try {
            const action = login(values)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)
            console.log("user", user);
            if (loginClose) {
                loginClose()
            }

        } catch (error) {
            console.log("error login user", error);
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }
    return (
        <div>
            <LoginForm onSubmit={handleOnsubmit} />
        </div>
    );
}

export default Login;