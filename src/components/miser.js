import { useEffect, useState } from "react";
import Entete from "./Entete";

const Miser = (props) =>{
    const [montant,setMontant] = useState();
    const [entete,setEntete] = useState();
    const [message,setMessage] = useState();
    const user = props.location.state && props.location.state.user;
    const enchere = props.location.state.enchere;
    const ajouter = async () => {
        const data = { 
          montant: montant, 
          utilisateur: {
            id_utilisateur: user.id_utilisateur
          },
          lot: {
            id_lot: enchere.id_lot,
            utilisateur: {
                id_utilisateur: enchere.id_utilisateur
            }   
          }
        }
          const url = await fetch("http://localhost:8080/mises", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),

        });
        const result = await url.json();
        setMessage(result);
      }

      const getEntete = async () => {
        const response = await fetch("http://localhost:8080/mises/"+enchere.id_lot);
        const json = await response.json();
        setEntete(json);
        console.log(json);
      }
      useEffect(() => {
        getEntete();
      }, []);

    return( 
       <>
            <div>
                <form>
                    {entete ? <Entete entete={entete} /> : <div>Chargement en cours...</div>} 
                    <input type={"number"} onChange={(e)=>{setMontant(e.target.value)}} ></input><input type={"button"} value={"valider"} onClick={ajouter}></input>
                </form>
                {message ? <p>{message.message}</p>:<div></div>}
            </div>
       </>

    )
}

export default Miser;