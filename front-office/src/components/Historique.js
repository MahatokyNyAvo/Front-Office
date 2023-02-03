import { useEffect, useState } from "react";
import CardEnchere from "./cardEnchere"; 

const Historique = (props) => {
    const [encheres,setEncehere] = useState([]);
    const user = props.location.state && props.location.state.user;
    
    useEffect (()=>{
        getMine();
    },[]);


    const getMine = async () => {
        const response = await fetch("http://api-enchere-production.up.railway.app/encheres/mine/"+user.id_utilisateur);
        const json = await response.json();
        setEncehere(json);
      }
      

    return (
        <div>
            { encheres.length === 0?(
                <p className="dataNotFound">No data found</p>

            ):(
                <CardEnchere encheres={encheres} mine = {true}/>
            )
            }
        </div>

    );

}

export default Historique;

