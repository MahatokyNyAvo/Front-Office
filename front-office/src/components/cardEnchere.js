import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const CardEnchere = (props) => {
    
    const history = useHistory();
    function detail(id){
    //     history.push(`/detail`+id);
        console.log(id);
        const canBind = false;
    }
    return (
        <>
            {console.log(props.encheres)}
            {
                props.mine === true ? (
                    props.encheres.map(enchere => (
                        <div className="col-lg-5 col-xl-4" key={enchere.id_lot}>
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="d-sm-flex d-md-flex d-xl-flex justify-content-sm-center justify-content-md-center justify-content-xl-center">
                                        <img className="img-fluid chart-area" src="assets/img/dogs/image1.jpeg" /></div>
                                    <div className="text-center little-info">
                                        <h4>Prix de base: {enchere.prixMinimal}</h4>
                                        <h5>Nom: {enchere.nom}</h5>
                                        <p>{enchere.descri}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    props.encheres.map(enchere => (
                        <div className="col-lg-5 col-xl-4">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="d-sm-flex d-md-flex d-xl-flex justify-content-sm-center justify-content-md-center justify-content-xl-center">
                                        <img className="img-fluid chart-area" src="assets/img/dogs/image1.jpeg" /></div>
                                    <div className="text-center little-info">
                                        <h4>Prix de base: {enchere.prixMinimal}</h4>
                                        <h5>Nom: {enchere.nom}</h5>
                                        <p>{enchere.descri}</p>
                                    </div>
                                    <div className="d-sm-flex d-xxl-flex justify-content-sm-center justify-content-xxl-center">
                                    < Link to ={'/enchere/'+enchere.id_lot}  key={enchere.id_lot} className="btn btn-primary mah" >Voir Detail</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </>

    )
}
{/* props.mine === true ? (
//     props.encheres.map(enchere => (
//         <p key={enchere.id_lot}>{enchere.dateDebut} {enchere.nom} {enchere.descri}</p>
//     ))
// ) : (
//     props.encheres.map(enchere => (
//         <Link to={'/enchere/' + enchere.id_lot} key={enchere.id_lot}>
//             <p>{enchere.dateDebut} {enchere.nom} {enchere.descri}</p>
//         </Link>
//     ))
// ) */ }

export default CardEnchere;