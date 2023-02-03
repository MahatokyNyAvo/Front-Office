const Entete = (props) =>{
    return(
        <>
            <h3>L'entete d'enchere</h3>
            {console.log(props.entete)}
            {/* <p>Nom: {props.entete.utilisateur.nom}</p> */}
            {/* <p>Montant: {props.entete.montant}</p> */}
        </>
    )
}

export default Entete;