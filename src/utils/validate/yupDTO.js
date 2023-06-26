import * as yup from 'yup';

const  yupDTO =(lang)=>{
    const {Validation} = require(`../../language/${lang}.json`);
    yup.setLocale({
        mixed:{
            required: Validation.required,
            notType:Validation.match,
        },
        string:{
            min: Validation.minLength,
            max: Validation.maxLength,
            email: Validation.match,
            matches: Validation.match,
            length: Validation.length,
        },
        number:{
            min: Validation.min,
            max: Validation.max,
            lessThan: Validation.lessThan,
            moreThan: Validation.moreThan,
        }
    });
    return  yup.object().shape({
        address: yup.string().required().min(3),
        email : yup.string().required().email().min(6).max(20),
        phone: yup.string().required(),
        name: yup.string().required().min(2).max(10),
        identityCard: yup.number().required().max(12),
        birthYear:yup.number().required().lessThan(2023).moreThan(1900),
        nationality:yup.string().required(),
        city:yup.string().required(),
        district:yup.string().required(),
        wards:yup.string().required(),
    });
};



export default yupDTO;