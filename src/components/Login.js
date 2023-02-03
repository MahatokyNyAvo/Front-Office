import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import Historique from "./Historique";

const Login = (props) =>{
    const [mail,setEmail] = useState();
    const [pass,setMdp] = useState();
    const history = useHistory();
    
    function acces(user) {
      if(props.location.state.page === "historique"){
        history.push({
          pathname:'/historique',
          state:{user}
        }); 
      }else{
        history.push({
          pathname:'/miser',
          state:{user, enchere: props.location.state.enchere}
        }); 
      }
    }
    
    const login = async () => {
      const data = { 
        email: mail, 
        mdp: pass,
      }
        const url = await fetch("http://localhost:8080/utilisateurs/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      const result = await url.json();
      if (result.message != null) {
        alert(result.message);
        history.push('/login');
      }else if(result.id_utilisateur != null){
        alert("Bienvenue");
        acces(result);
      }
    }


    return(
      <>
        <div id="form">
            <input type={"email"}  onChange={(e)=>{setEmail(e.target.value)}} />
            <br/>
            <input type={"password"}  onChange={(e)=>{setMdp(e.target.value)}} />
            <button onClick={login}>Submit</button>
        </div>
        {/* <div id="histo">
          {props.component}
        </div> */}
      </>
    )
}

export default Login;