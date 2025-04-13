 import { useEffect, useState } from 'react'

export const Message = ({msg}) => { 
 
  const [close, setClose] = useState(true)

  useEffect(() => {
    if(msg.type != "" ){
      setClose(false); 
    }
     
  }, [msg])
  
 
  const handleCloseMsg = () =>{
    setClose(true);
  }

  return (
  <>  
    <div style={{display: close?'none':''}}>
      {
        msg.type === 'error'?
        <div className=''>
          <div className=" alert alert-danger" style={{width:'100%'}}> {msg.txt}
            <button type="button" className="btn-close float-end" aria-label="Close" onClick={handleCloseMsg}/> 
          </div> 
        </div>:''
      
      }
      {
        msg.type === 'ok'?
        <div className=''>
          <div className=" alert alert-success" style={{width:'100%'}}> {msg.txt}
            <button type="button" className="btn-close float-end" aria-label="Close" onClick={handleCloseMsg}/> 
          </div> 
        </div>:'' 
      }

      {
        msg.type === 'warning'?
        <div className=''>
          <div className=" alert alert-warning" style={{width:'100%'}}> {msg.txt}
            <button type="button" className="btn-close float-end" aria-label="Close" onClick={handleCloseMsg}/> 
          </div> 
        </div>:''  
      } 
    </div>
  </>
  )
}
 