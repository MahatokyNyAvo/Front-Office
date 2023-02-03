import { useHistory } from "react-router-dom";

const Info = (props) => {

    const history = useHistory();
    function goLogin(){
        history.push({
          pathname:'/login',
          state:{page:"miser",enchere: props.enchere}
        });
    }

    return (
        <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
                <div className="row">
                    <div className="col-lg-6 d-none d-lg-flex">
                        <div className="flex-grow-1 bg-password-image">
                            <div className="row row-img">
                                <div className="col col-image">
                                    <img className="img-auction" width="100" height="80" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-5">
                            <div className="card">
                                {
                                    props.enchere.statut === true ? (
                                        <div className="card-body">
                                            <h4 className="card-title">{props.enchere.nom}</h4>
                                            <h6 className="text-muted card-subtitle mb-2">categorie: {props.enchere.categorie.intitule}</h6>
                                            <p className="card-text">Statut: en cours</p>
                                            <p className="card-text">{props.enchere.descri}</p>
                                            <div className="d-flex d-xxl-flex justify-content-center justify-content-xxl-center">
                                                <button className="btn btn-primary mah" onClick={goLogin} type="button">
                                                    Deposer une enchere
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="card-body">
                                            <h4 className="card-title">{props.enchere.nom}</h4>
                                            <h6 className="text-muted card-subtitle mb-2">categorie: {props.enchere.categorie.intitule}</h6>
                                            <p className="card-text">Statut: Terminer</p>
                                            <p className="card-text">{props.enchere.descri}</p>
                                            <div className="d-flex d-xxl-flex justify-content-center justify-content-xxl-center">
                                                <button disabled className="btn btn-primary mah" type="button">
                                                    Enchere Cloturer
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Info;