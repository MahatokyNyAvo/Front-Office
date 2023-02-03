// import { useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom"

import { Link } from "react-router-dom";

const CardEnchere = (props) =>{
    
    // const history = useHistory();

    // const redirInfo = (id) => {
    //     history.push(`/enchere/${id}`);
    // };
    return( 
       <>
            { 
                props.mine == true ?(
                    props.encheres.map(enchere  => (
                        <p key={enchere.id_lot}>{enchere.dateDebut} {enchere.nom} {enchere.descri}</p>
                    ))
                ):(
                    props.encheres.map(enchere  => (
                        <Link to={'/enchere/'+enchere.id_lot} key={enchere.id_lot}>
                            <p>{enchere.dateDebut} {enchere.nom} {enchere.descri}</p>
                        </Link>
                    ))
                )
            }
       </>

    )
}

export default CardEnchere;