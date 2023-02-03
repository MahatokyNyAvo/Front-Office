import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Info from './Info';
import Login from './Login';

function Detail() {
  const [enchere,setEncehere] = useState();
  let { id } = useParams();
  const history = useHistory();

  useEffect (()=>{
    infoEnchere(id);
  },[]);

  function goLogin(){
    history.push({
      pathname:'/login',
      state:{page:"miser",enchere: enchere}
    });
  }

  const infoEnchere = async (id) => {
    const response = await fetch("http://api-enchere-production.up.railway.app/encheres/"+id);
    const json = await response.json();
    setEncehere(json);
  }


  return (
    <div>
       {enchere ? <Info enchere={enchere} /> : <div>Chargement en cours...</div>} 

      <button onClick={goLogin}>Deposer une enchere</button>
    </div>
  );
}
export default Detail;
