import { useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  
    const [ defaultFormState, setDefaultFormState  ] = useState( initialForm );
    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target}, fieldName) => {
        const { name, value } = target;
        let realName = name;
        if(fieldName != undefined &&  fieldName != ''  &&  fieldName != null){
            realName = fieldName;
        } 

        setFormState({
            ...formState,
            [ realName ]: value
        });  
    }

    const onInputChangeByName = (fieldName, value ) => { 
        setFormState({
            ...formState,
            [ fieldName ]: value
        });  
    }
    
    const onCheckbokChange = ({ target}, fieldName) => {
        const { name, checked } = target;
        let realName = name;
        if(fieldName != undefined &&  fieldName != ''  &&  fieldName != null){
            realName = fieldName;
        }
        setFormState({
            ...formState,
            [ realName ]: checked
        }); 
    }

    const onListInputChange = ({ target}, listName, index, fieldName) => {
        const { name, value } = target;
        let realName = name;
        if(fieldName != undefined &&  fieldName != ''  &&  fieldName != null){
            realName = fieldName;
        }
        let auxFormState = {... formState} 
        auxFormState[listName][index][realName]=value; 
        setFormState(auxFormState);  
    }

    const onListInputNumberChange = ({ target}, listName, index, fieldName) => {
        const { name, value } = target;
        let realName = name;
        if(fieldName != undefined &&  fieldName != ''  &&  fieldName != null){
            realName = fieldName;
        }
        let auxFormState = {... formState} 
        auxFormState[listName][index][realName]=Number(value); 
        setFormState(auxFormState);  
    }

    const onListCheckbokChange = ({ target}, listName, index, fieldName) => {
        const { name, checked } = target;
        let realName = name;
        if(fieldName != undefined &&  fieldName != ''  &&  fieldName != null){
            realName = fieldName;
        }
        let auxFormState = {... formState}
        auxFormState[listName][index][realName]=checked;
        setFormState(auxFormState);  
    }
 
    const onListInputChangeByCode = (event, listName, code, fieldName) => { 
       
        let index = -1;
        formState[listName].map((e, i)=>{
            if(e.code == code)
             index = i
        })    
        onListInputChange(event, listName, index, fieldName);  
    }

    const onListInputMoneyChangeByCode = (event, listName, code, fieldName) => {  
        let index = -1;
        formState[listName].map((e, i)=>{
            if(e.code == code)
             index = i
        })    
        onListInputNumberChange(event, listName, index, fieldName);  
    }

    const onListCheckbokChangeByCode = (event, listName, code, fieldName) => { 
        let index = formState[listName].findIndex((elem)=> elem.code == code);   
        onListCheckbokChange(event, listName, index, fieldName);  
    }
    
    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        
        ...formState,
        formState,
        defaultFormState, 
        setDefaultFormState,
        onInputChange,
        onInputChangeByName,
        onResetForm,
        setFormState,
        onCheckbokChange,
        onListInputChange,
        onListCheckbokChange,
        onListInputChangeByCode,
        onListCheckbokChangeByCode,
        onListInputMoneyChangeByCode

    }
}