import validateMethod from "./validateMethod";



const createValidate=(keyValid, validateSchema, dataValid, language)=>{
    
    for(let opt of validateSchema){
        if(!opt.toString()) return alert('validateSchema not correct string type!!');
        let optKey = opt.indexOf('?')!==-1? opt.substring(0,opt.indexOf('?')):opt;
        let optValue= opt.substring(opt.indexOf('?')+1,opt.length);
        optValue = keyValid.includes('comfirm')? dataValid[optValue]||'': optValue;
        if(!validateMethod()?.[optKey]) return alert('Method validate not correct syntax!!');
        let result = validateMethod(keyValid,language)[optKey](dataValid[keyValid]||'',optValue);
        if(result) return result;
    }
    return '';
};



export default createValidate;