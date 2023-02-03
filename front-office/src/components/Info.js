
const Info = (props) =>{

    function formatDate(date = new Date()) {
        const year = date.toLocaleString('default', {year: 'numeric'});
        const month = date.toLocaleString('default', {month: '2-digit'});
        const day = date.toLocaleString('default', {day: '2-digit'});

        return [year, month, day].join('-');
    }

    return( 
       <>
       {props.enchere.dateDebut < formatDate(new Date())?(
          <p>Enchere expirer</p>
      ):(
        <p>Enchere en cours</p>
      )
      }
            <h2>categorie: {props.enchere.categorie.intitule}</h2>
            <h2>Date fin: {props.enchere.dateDebut}</h2>
            <h2>id lot: {props.enchere.id_lot}</h2>
            <h2>Nom: {props.enchere.utilisateur.nom}</h2>
       </>

    )
}

export default Info;