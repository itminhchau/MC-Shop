import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import QuantityField from 'components/FormControl/QuantityField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
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

function AddToCartForm({ onSubmit }) {
    const classes = useStyle()
    const schema = yup.object({
        quantity: yup.number().required("please enter quantyty").min(1, "least than 1").typeError("please enter number"),
    }).required();

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values)
        }
        // form.reset()
    }

    return (
        <div className={classes.root}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <QuantityField name="quantity" label="quantity" form={form} />
                {console.log("form", form)}
                <Button type='submit' variant='contained' fullWidth color='primary' > Chọn mua </Button>
            </form>
        </div>

    );
}

export default AddToCartForm;