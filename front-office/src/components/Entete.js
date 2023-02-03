const Entete = (props) =>{
    return(
        <>
            <h3>L'entete d'enchere</h3>
            <p>Nom: {props.entete.utilisateur.nom}</p>
            <p>Montant: {props.entete.montant}</p>
        </>
    )
}

export default Entete;