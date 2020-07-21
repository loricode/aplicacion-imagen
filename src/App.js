import React,{useState, useEffect} from 'react';
import {FaCheckCircle, FaTrash } from 'react-icons/fa'; // npm i react-icons
import axios from 'axios'; // npm i axios
import {Nabvar} from './component/Navbar';
function App() {
  
    const [lista, setLista] =  useState([]);
    const [descripcion, setDescripcion] = useState('');  
    const [imagen, setImagen] = useState(null);
    
useEffect(() => {
  getImagenes();
},[])

async function getImagenes(){
    import 'axios'
    const res = await axios.get('http://localhost/apirest/');
    setLista(res.data)
    console.log(res.data)
} 

async function addImagen(e) {
   e.preventDefault();
   let fd = new FormData() 
   fd.append("imagen", imagen)
   fd.append("descripcion", descripcion)
   const res = await axios.post('http://localhost/apirest/', fd);
   console.log(res.data)
   getImagenes();

  }


async function deleteImagen(id){ 
 
   if(window.confirm('Quieres eliminar?')){
      const res = await axios.delete('http://localhost/apirest/?id='+id);
      getImagenes();
      console.log(res.data)
  }
} 


return (

  <div className="container ">
  <Nabvar/>    
<div className="row p-3">

  <div className="col-md-5 p-2 ">
         <form className="card p-2 mt-2 border-secondary" encType="multipart/form-data">
           <h5>React Imagen</h5>
          
           <textarea  cols="4" placeholder="descripcion" className="form-control" 
           onChange={(e) => setDescripcion(e.target.value)} >

           </textarea>

           <div className="form-group">
             <label htmlFor="img">imagen</label> 
              <input type="file"   className="form-control-file" accept="image/*"
                  onChange={(e) => setImagen(e.target.files[0])} multiple/></div> 
            
              <button  className="btn btn-outline-success btn-sm" 
                onClick={(e) => addImagen(e)} >Add <FaCheckCircle /></button> 
         </form>
       </div>

       <div className="col-md-7 p-2">
            { lista.map(item => (
            <div className="card p-2 mt-2 border-secondary" key={item.id}>
              <div className="card-body">
              <img src={"data:image/png;base64,"+item.imagen} className="img-fluid" 
                alt="imagen"/>
            <h5 className="text-primary"> {item.descripcion}</h5>  

                    <div className="d-flex flex-row-reverse" >
                       <button  className="btn btn-outline-danger btn-sm " 
                           onClick={() => deleteImagen(item.id)} ><FaTrash />
                           </button> 
                      
                     </div>  
                      
                  </div> 
              </div>         
            ))}  
     </div>

</div>
      
       
</div>

  );
}

export default App;
