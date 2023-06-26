/* eslint-disable react-hooks/exhaustive-deps */

import  {useEffect, useState} from 'react';
import createValidate from '../utils/validate/createValidate';

let timer;
const timerInterval = 2000;


const formatMes =(mess='')=>{
    if(mess){
        if(mess.includes('comfirm')) mess=mess.replace('comfirm','');
        let mesSplit = mess.split('');
        mesSplit[0] = mesSplit[0].toUpperCase();
        return mesSplit.join('');
    }
    return '';
}

const useValidate=( props ) =>{
    const {validateSchema,yupDTO, onSubmit,dataSet, validateOnSubmit, onBlur, language,initialData, formId, onError} = props
    const [data, setData] = useState(!dataSet?{...initialData}:{...dataSet}||{});
    const [errors, setErrors] = useState({...initialData});
    let prevData ={...data};
    
    useEffect(()=>{
        let ers = {};
        if(!yupDTO){
            for(let name in errors){
                if(errors[name]!=='')
                ers[name] = getResultValidate(name,prevData[name])
            }
            setErrors({...errors,...ers});
        }
        else{
            for(let name in errors){
                yupDTO(language).validateAt(name,prevData)
                .then(() => {})
                .catch((err) => {
                    ers[name] = formatMes(err.message)
                    setErrors({...errors,...ers})
                })
           }
        }
    },[language])

    useEffect(()=>{
        if(dataSet){
            prevData= {...dataSet};
            for(let name in data){
               let element =document.getElementsByName(name);
               if(element.length>0)
               {
                if(element[0].type!=='checkbox' && element[0].type!=='radio' && element[0].type!=='file' && element[0].type!=='password'){
                    if(!formId){ 
                        element[0].value= dataSet[name] ||''
                    }
                    else{
                        element.forEach(elem=>{
                            elem.value = elem.form.id===formId ? dataSet[name] ||'':''
                        })
                    }
               }
               else if(element[0].type==='radio'){
                    element.forEach(elem=>{
                        if(!formId && elem.value ===dataSet[name]){
                        elem.checked =true}
                        else  if(elem.form.id===formId && elem.value ===dataSet[name] ){
                            elem.checked =true
                        }
                    })
               }
               else if(element[0].type==='checkbox'){
                    if((typeof(dataSet[name])==='object')){
                        element.forEach(elem=>{
                            if(dataSet[name].includes(elem.value)&& elem.form.id===formId)
                            elem.checked =true
                            else if(!formId && dataSet[name].includes(elem.value))
                            elem.checked =true
                        })
                    }
                    else{
                        element.forEach(elem=>{
                            if(dataSet[name]&& elem.form.id===formId)
                            elem.checked =true
                            else if(!formId && dataSet[name] ) 
                            elem.checked =true
                        })
                    }
                }}
            }
        }
    },[dataSet])       

    // const onEnter =(e)=>{
    //     if(e.key==='Enter'){
    //         handleSubmit(e)
    //     }
    // }

    const isError =()=>{
        for(let name in initialData){
            if(!prevData[name])  return true
            if(getResultValidate(name)!=='') return true
            // if(errors[name] && errors[name]!=='' ) return true
        }
        return false
    }

    const getResultValidate =(name) =>{
        if(validateSchema[name]) return formatMes(createValidate(name,validateSchema[name],prevData,language))
    }

    const yupValidate =(name)=>{
        initialData[name]==='' &&  yupDTO(language).validateAt(name,prevData)
        .then(() => {})
        .catch((err) => {
            setErrors({
                ...errors,
                [name] : formatMes(err.message)
            })
        })
    }

    const handleValidate =(name)=>{
        initialData[name]==='' && setErrors(()=>({
            ...errors,
            [name] : getResultValidate(name) 
        }))
    } 

    const handleBlur =(e)=>{
        clearTimeout(timer)
        setData({...prevData});
        if(!validateOnSubmit){
            yupDTO &&  yupValidate(e?.target?.name)
            !yupDTO &&  handleValidate(e?.target.name, e?.target.value);
            onBlur && onBlur(prevData,getResultValidate(e?.target.name),e?.target.name)
        }
    }

    const handleChange=(e)=>{
        const {target} =e;
        clearTimeout(timer)
        prevData = (()=>{ 
            if(target.type ==="checkbox"){
              if(document.getElementsByName(target.name).length===1) return { ...prevData,[target.name]: target.checked};
              return { ...prevData,[target.name]: target.checked? [].concat(prevData[target.name]||[],target.value):prevData[target.name].filter(elemem => elemem!==target.value)}
            }
            if(target.type==="file") return {...prevData, [target.name]: target.files}
            return { ...prevData,[target.name]: target.value}
          })();
        if(target.type==="file") setData({...prevData})
        else{
            timer = setTimeout(()=>{ setData({...prevData});
            !validateOnSubmit && !yupDTO && handleValidate(target.name, target.value);
            !validateOnSubmit && yupDTO && yupValidate(target.name)
            },timerInterval)
        }
    }
    
    const handleSubmit =(e)=>{
        // setData({...prevData});
        clearTimeout(timer)
        e.preventDefault();
        let isEr =false;
        if(validateOnSubmit){
            if(!yupDTO){
            let prev = {...errors};
            for(let name in initialData){
                prev[name] = getResultValidate(name)
                if(!isEr && prev[name]!=='') isEr=true 
            }
            setErrors({...prev});
            isEr &&  onError && onError({message:"Fill in the correct information!!", status:401})
            }
            else{
                for(let name in initialData){
                    yupValidate(name)
                }
                isEr = isError()
            }
        }
        else{
            isEr =isError();
            isEr && onError && onError({message:"Fill in the correct information!!", status:401})
        }
        !isEr && onSubmit && onSubmit(prevData)
    }

    const resetForm =()=>{
        
        for(let name in prevData){
            let element =document.getElementsByName(name);
            if(element.length>0){
                if(element[0].type!=='checkbox' && element[0].type!=='radio'){
                    element.forEach(elem=>{
                        if(!formId){
                            elem.value= ''
                        }
                        if(elem.form.id===formId){
                            elem.value= ''
                        }
                    })
                }
                else{
                    element.forEach(elem=>{
                        if(!formId){
                            if(elem.checked){
                                elem.checked= false;
                            }
                        }
                        if(elem.form.id===formId){
                            if(elem.checked){
                                elem.checked = false;
                            }
                        }
                    })
                }
            }
        }
        // prevData={...initialData};
        setData({...initialData});
    };

    return { data , errors, setErrors, handleChange,handleSubmit, handleBlur, resetForm };
}




export default useValidate;