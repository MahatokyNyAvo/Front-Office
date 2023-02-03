import { useEffect, useState } from "react";
import CardEnchere from "./cardEnchere"; 

const Historique = (props) => {
    const [encheres,setEncehere] = useState([]);
    const user = props.location.state && props.location.state.user;
    
    useEffect (()=>{
        getMine();
    },[]);

    const noData ={
        textAlign: "center",
        marginTop: "200px",
        fontSize: "45px",
    }

    const getMine = async () => {
        const response = await fetch("https://api-enchere-production.up.railway.app/encheres/mine/"+user.id_utilisateur);
        const json = await response.json();
        setEncehere(json);
      }
      

    return (
<div className="d-flex flex-column" id="content-wrapper">
    <div id="content">
        <div className="container-fluid"> 
        <div className="d-sm-flex justify-content-between align-items-center justify-content-xl-center mb-4">
              <h3 className="text-dark mb-0">Historique</h3>
            </div>
            <div className="row">
                { encheres.length === 0?(
                    
                    <p className="dataNotFound" style={noData}>No data found</p>

                ):(
                    <CardEnchere encheres={encheres} mine = {true}/>
                )
                }
            </div>
        </div>
    </div>
</div>


    );

}

export default Historique;

