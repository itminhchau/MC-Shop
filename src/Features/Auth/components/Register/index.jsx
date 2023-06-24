import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'Features/Auth/userSlice';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    registerClose: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const { registerClose } = props

    const handleOnsubmit = async (values) => {
        try {
            values.username = values.email
            const action = register(values)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)
            console.log("user", user);
            if (registerClose) {
                registerClose()
            }
            enqueueSnackbar("register successfully ", { variant: 'success' })

        } catch (error) {
            console.log("error register user", error);
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }
    return (
        <div>
            <RegisterForm onSubmit={handleOnsubmit} />
        </div>
    );
}

export default Register;