import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/FormControl/InputField';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import InputFieldPassword from 'components/FormControl/InputFieldPassword';


RegisterForm.propTypes = {
    onsubmit: PropTypes.func
};

const useStyle = makeStyles((theme) => ({
    root: {
        paddingTop: '8px',
        display: "flex",
        flexDirection: "column",
        gap: "10px!important"
    },
    avatar: {
        margin: '0 auto!important'
    },
    title: {
        textAlign: "center",
        margin: "16px 0 16px"
    },

}))
function RegisterForm({ onSubmit }) {
    const classes = useStyle()
    const schema = yup.object({
        // title: yup.string().required("please enter title").min(5, "short text "),
        fullName: yup.string().required("please enter full name").test('should enter name at least two character', 'please enter full name a least two character',
            (value) => {
                return value.split(" ").length >= 2;
            }
        ),
        email: yup.string().required("please enter email").email("please enter format email"),
        password: yup.string().required("please enter password").min(6, "please enter 6 charater"),
        retypePassword: yup.string().required("please retype your password").oneOf([yup.ref('password')], "password doesn't match")
    }).required();

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values)
        }
        // form.reset()
    }

    const { isSubmitting } = form.formState
    console.log("issubmitting", isSubmitting);
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress />}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.title}>
                Create a acount
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <InputFieldPassword name="password" label="Password" form={form} />
                <InputFieldPassword name="retypePassword" label="Retype Password" form={form} />
                <Button disabled={isSubmitting} type='submit' variant='contained' fullWidth color='primary' > create an account</Button>
            </form>
        </div>

    );
}

export default RegisterForm;