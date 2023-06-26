/* eslint-disable no-template-curly-in-string */
// import vi from '../language/vi.json';
// import en from '../language/en.json';


const validateMethod = (keyValid, language='vi')=>{
    const {Validation: validMes} = require(`../../language/${language}.json`);
    // const {Validation: validMes} = language==='vi'? vi:en;
    
    return (
        {
            required:(value)=>{
                if(value && !value.toString()) return validMes?.type?.replace('${path}',keyValid);
                if(value && value.toString().length >0) return '';
                return validMes?.required?.replace('${path}',keyValid);
            },
            length:(value,condition)=>{
                if(value && !value.toString()) return validMes?.type?.replace('${path}',keyValid);
                if(value.toString().length===Number(condition)) return '';
                const messErr = (validMes?.length?.replace('${path}',keyValid))
                return messErr.replace('${length}', condition);
            },
            min:(value,condition)=>{
                let number =Number(value);
                if(!number) return validMes?.type?.replace('${path}',keyValid);
                if(number>= Number(condition)) return '';
                const messErr =validMes?.min?.replace('${path}',keyValid);
                return messErr.replace('${min}', condition);
            },
            max:(value,condition)=>{
                let number =Number(value);
                if(!number) return validMes?.type?.replace('${path}',keyValid);
                if(number<= Number(condition)) return '';
                const messErr =validMes?.max?.replace('${path}',keyValid);
                return messErr.replace('${max}', condition);
            },
            confirm:(value,condition)=>{
                if(value && !value.toString()) return validMes?.type?.replace('${path}',keyValid);
                if(value.toString() === condition.toString()) return '';
                return validMes?.comfirm?.replace('${path}',keyValid);
            },
            minLength:(value,condition)=>{
                if(value && !value.toString()) return validMes?.type?.replace('${path}',keyValid);
                if(value.toString().length>= Number(condition)) return '';
                const messErr = validMes?.minLength?.replace('${path}',keyValid);
                return messErr.replace('${min}', condition);
            },
            maxLength:(value,condition)=>{
                if(value && !value.toString()) return validMes?.type?.replace('${path}',keyValid);
                if(value.toString().length <= Number(condition)) return '';
                const messErr = validMes?.maxLength?.replace('${path}',keyValid);
                return messErr.replace('${max}', condition);
            },
            lessThan:(value,condition)=>{
                let number =Number(value);
                if(!number) return validMes?.type?.replace('${path}',keyValid);
                if(number < Number(condition)) return '';
                const messErr = validMes?.lessThan?.replace('${path}',keyValid);
                return messErr.replace('${less}', condition);
            },
            moreThan:(value,condition)=>{
                let number =Number(value);
                if(!number) return validMes?.type?.replace('${path}',keyValid);
                if(number > Number(condition)) return '';
                const messErr = validMes?.moreThan?.replace('${path}',keyValid);
                return messErr.replace('${more}', condition);
            },
            regex:(value,regex)=>{
                if(value && !value.toString()) return validMes?.type?.replace('${path}',keyValid);
                const stringValue = value.toString();
                const result = stringValue.match(new RegExp(regex));
                if(result) return '';
                return validMes?.match?.replace('${path}',keyValid);
            },
        }
    )
};



export default validateMethod;
