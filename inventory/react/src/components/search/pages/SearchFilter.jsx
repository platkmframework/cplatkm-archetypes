import { useState } from 'react';
 
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useForm } from '../../hooks/useForm';

export const SearchFilter = ({conditions, fields, handleSaveConditions}) => {

  const [list, setList] = useState(conditions);

 const {formState, onInputChange, onResetForm} = useForm({
                                          initGroup:'', 
                                          fieldCode:'',
                                          operator:'',
                                          value:'',
                                          endGroup:'',
                                          soperator:''
                                        });

  const handleAddCondition = ()=>{
    setList( [...list, {...formState}])
    onResetForm(); 
  }

  const handleRemove = (event, i)=>{ 
    let auxList = [...list]; 
    auxList.splice(i, 1);
    setList(auxList) 
  }

  const onElementInputChange = ({target}, fieldName, i)=>{ 
    const { name, value } = target;
    let realName = name;
    if(fieldName != ''){
        realName = fieldName;
    }

    let auxList = [...list]; 
    auxList[i][realName] = value;
    setList(auxList) 
  }

  const handleSearchConditions = () =>{
    handleSaveConditions(list);
  }

  return (
 
    <div id="objectwizardFilterContainer" className="container" >   
      <table className="table">
        <thead className="thead-light">
          <tr> 
            <th scope="col">Grupo</th>  
            <th scope="col">Columna</th> 
            <th scope="col">Operador</th>
            <th scope="col">Valor</th>  
            <th scope="col">Grupo</th> 
            <th scope="col"> </th> 
            <th scope="col"> </th> 
          </tr>
        </thead>
        <tbody>
          <tr>   
            <td>
              <select className='form-select' id="initGroup_" value={formState.initGroup} name="initGroup_" onChange={(event)=>onInputChange(event, 'initGroup')} >
                  <option value=""></option>
                  <option value="open">(</option>
              </select> 
            </td>
            <td>
                <select className='form-select' id="flterFieldSelect_"value={formState.fieldCode} name="flterFieldSelect_"  onChange={(event)=>onInputChange(event, 'fieldCode')} >
                  <option value=""></option>
                  {
                    fields?.map((row, i)=>(
                      <option key={'new_' + i} value={row.code}>{row.label}</option>
                    ))
                  }
                </select> 
            </td>  
            <td>
                <select className='form-select' id="flterFieldOperator_" value={formState.operator} name="flterFieldOperator_" onChange={(event)=>onInputChange(event, 'operator')}>
                    <option value=""></option>
                    <option value="equal">Igual</option>
                    <option value="notEqual">Diferente</option>
                    <option value="greateThan">Mayor que</option>
                    <option value="lessThan">Menor que</option>
                    <option value="greateEqual">Mayor igual que</option>
                    <option value="lessEqual">Menor igual que</option> 
                    <option value="include">Incluye</option>
                    <option value="notInclude">No Incluye</option>
                    <option value="startWith">Comienza con</option>
                    <option value="endWith">Termina con</option>
                    <option value="contain">Contiene</option>
                    <option value="notContain">No Contiene</option> 
                    <option value="isNull">Es nulo</option> 
                    <option value="isNotNull">No es nulo</option> 
                </select> 
            </td>
            <td>
              <input className="form-control" id="filterfieldValue_"  name="filterfieldValue_" value={formState.value} type="text"  onChange={(event)=>onInputChange(event, 'value')}/>
            </td>
            <td>
              <select className='form-select' id="endGroup_" name="endGroup_" value={formState.endGroup}  onChange={(event)=>onInputChange(event, 'endGroup')}>
                  <option value="">...</option> 
                  <option value="close">)</option>
              </select> 
            </td>
            <td>
              <select className='form-select' id="andOrOperators_" name="andOrOperators_" value={formState.soperator} onChange={(event)=>onInputChange(event, 'soperator')}> 
                  <option value="" >...</option>
                  <option value="a">Y</option>
                  <option value="o">O</option>
              </select> 
            </td>
            <td>
                <button type="button" className="btn btn-outline-primary" onClick={handleAddCondition} >+</button> 
            </td>
          </tr>  
      </tbody>
    </table> 
    <h6 style={{marginTop:'40px'}}>Filtros adicionados</h6>
    <table className="table">
      <tbody>
          {
            list.map((row, i)=>(
              
            <tr key={'added_' + i}>
              <td>
                <select className='form-select' id={"initGroup_" + i} defaultValue={row.initGroup} name={"initGroup_" + i} onChange={(event)=>onElementInputChange(event, 'initGroup',i)} >
                    <option value=""></option>
                    <option value="open">(</option>
                </select> 
              </td>
              <td>
                  <select className='form-select' id={"flterFieldSelect_" + i}  defaultValue={row.fieldCode}  name={"flterFieldSelect_" + i}  onChange={(event)=>onElementInputChange(event, 'fieldCode',i)} >
                    <option value=""></option>
                    {
                      fields?.map((row, i)=>(
                        <option key={'field_added_' + i} value={row.code}>{row.label}</option>
                      ))
                    }
                  </select> 
              </td>  
              <td>
                  <select className='form-select' id={"flterFieldOperator_" + i}  defaultValue={row.operator}  name={"flterFieldOperator_" + i}  onChange={(event)=>onElementInputChange(event, 'operator',i)}>
                    <option value=""></option>
                    <option value="equal">Igual</option>
                    <option value="notEqual">Diferente</option>
                    <option value="greateThan">Mayor que</option>
                    <option value="lessThan">Menor que</option>
                    <option value="greateEqual">Mayor igual que</option>
                    <option value="lessEqual">Menor igual que</option> 
                    <option value="include">Incluye</option>
                    <option value="notInclude">No Incluye</option>
                    <option value="startWith">Comienza con</option>
                    <option value="endWith">Termina con</option>
                    <option value="contain">Contiene</option>
                    <option value="notContain">No Contiene</option> 
                    <option value="isNull">Es nulo</option> 
                    <option value="isNotNull">No es nulo</option> 
                  </select> 
              </td>
              <td>
                <input className="form-control" id={"filterfieldValue_" + i}  defaultValue={row.value}    name={"filterfieldValue_" + i}  type="text"  onChange={(event)=>onElementInputChange(event, 'value',i)}/>
              </td>
              <td>
                <select className='form-select' id={"fendGroup__" + i}  defaultValue={row.endGroup}   name={"fendGroup__" + i}  onChange={(event)=>onElementInputChange(event, 'endGroup',i)}>
                    <option value="">...</option> 
                    <option value="close">)</option>
                </select> 
              </td>
              <td>
                <select className='form-select' id={"andOrOperators_" + i}   defaultValue={row.soperator}   name={"andOrOperators_" + i}  onChange={(event)=>onElementInputChange(event, 'soperator',i)}> 
                    <option value="" >...</option>
                    <option value="a">Y</option>
                    <option value="o">O</option>
                </select> 
              </td>
              <td><button type="button" className="btn btn-outline-primary" onClick={(event)=>handleRemove(event,i)}>-</button> </td>
            </tr> 
            ))
          } 
      </tbody>
    </table>

    <DialogActions>
        <Button onClick={handleSearchConditions}>
            Filtrar
        </Button>
    </DialogActions>
</div>
 
  )
}
