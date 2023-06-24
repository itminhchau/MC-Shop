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


LoginForm.propTypes = {
    onsubmit: PropTypes.func
};

const useStyle = makeStyles((theme) => ({
    root: {
        paddingTop: '8px',
        display: "flex",
        flexDirection: "column",
        gap: "10px!important",
        width: " 448.8px"
    },
    avatar: {
        margin: '0 auto!important'
    },
    title: {
        textAlign: "center",
        margin: "16px 0 16px"
    },

}))
function LoginForm({ onSubmit }) {
    const classes = useStyle()
    const schema = yup.object({
        identifier: yup.string().required("please enter email").email("please enter format email"),
        password: yup.string().required("please enter password"),
    }).required();

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress />}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.title}>
                Sign In
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form} />
                <InputFieldPassword name="password" label="Password" form={form} />

                <Button disabled={isSubmitting} type='submit' variant='contained' fullWidth color='primary' > Sign In</Button>
            </form>
        </div>

    );
}

export default LoginForm;