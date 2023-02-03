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
          const url = await fetch("https://api-enchere-production.up.railway.app/mises", {
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
        const response = await fetch("https://api-enchere-production.up.railway.app/mises/"+enchere.id_lot);
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
    {/*<div>
       <div class="container position-relative">
        <div class="row d-flex justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div class="card mb-5">
              <div class="card-body p-sm-5">
                <h5 class="text-center">En tete</h5>
                <div class="text-center">
                  <span>Nom: {entete.utilisateur.nom}
                    <br />Montant: {entete.montant}<br />
                  </span>
                </div>
                <div class="mb-3">
                  <input class="form-control encherir" type={"number"} onChange={(e) => { setMontant(e.target.value) }}  />
                </div>
                <div><button class="btn btn-primary d-block w-100"  type={"button"} value={"valider"} onClick={ajouter}>Miser</button>
                  <div>
                    <p class="text-center">{message ? <p>{message.message}</p> : <div></div>}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>*/}