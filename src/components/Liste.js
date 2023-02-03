import { useEffect, useState } from 'react';
import CardEnchere from './cardEnchere';

const Liste = () => {

  const [check, setCheck] = useState(true);
  const [encheres, setEncehere] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState([]);

  const [motCle, setMotCle] = useState('');
  const [categorie, setCategorie] = useState('');
  const [prixMin, setPrixMin] = useState('');
  const [prixMax, setPrixMax] = useState('');

  const [date, setDate] = useState('');

  const [etat, setEtat] = useState({status:[]});

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { status } = etat;
     
    // Case 1 : The user checks the box
    if (checked) {
      setEtat({
        status: [...status, value],
      });
    }else {
      setEtat({
        status: status.filter((e) => e !== value)
      });
    }
  }

  const getAllEnchere = async () => {
    const response = await fetch("http://localhost:8080/encheres");
    const json = await response.json();
    setEncehere(json);
  }

  const getAllCategorie = async () => {
    const response = await fetch("http://localhost:8080/categories");
    const json = await response.json();
    setCategories(json);
  }
  
  const searchFor = async () => {
    var cache = "null";

    if(etat.status[0] === "true"){
      cache = "true";
    }
    if(etat.status[0] === "false"){
      cache = "false";
    }
    if(etat.status.length === 2){
      cache = "null";
    }
    const data = { 
      motCle: motCle, 
      id_categorie: categorie, 
      prix_min: prixMin, 
      prix_max: prixMax,
      date: date, 
      statut: cache, 
    }
    const search = await fetch("http://localhost:8080/encheres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (!search.ok) {
      throw Error(search.statusText)
    }
    const result = await search.json();
    if(result.length === 0){
      setCheck(false);
    }else{
      setCheck(true);
    }
    setSearch(result);
  }

  useEffect(() => {
    getAllEnchere();
    getAllCategorie();
  }, []);


  return (
    <div >
      <input
        placeholder='Tapez ici'
        value={motCle}
        onChange={(e)=>{setMotCle(e.target.value)}}
      />
      <br/>
      <br/>
      <select value={categorie} onChange={e => setCategorie(e.target.value)} >
        <option value={ "null" }>selectionner categorie</option>
        {categories.map(cat  => (
          <option key={cat.id_categorie} value={cat.id_categorie}>{cat.intitule}</option>
        ))}
      </select>
      <br/>
      <br/>
      <input type={"number"}  onChange={(e)=>{setPrixMin(e.target.value)}} />
      <input type={"number"}  onChange={(e)=>{setPrixMax(e.target.value)}} />
      <br/>
      <br/>
      <input type={"date"}  onChange={(e)=>{setDate(e.target.value)}} />
      <br/>
      <br/>
      <input type={"checkbox"} value="true" onChange={handleChange}/> en cours
      <input type={"checkbox"} value="false" onChange={handleChange}/> terminer
      <br/>
      <br/>
      <input type={"submit"} onClick={searchFor} value="Recherecher"/>
      <br/>
      <br/>
      { 
        check ?(
          search?.length > 0 ?(
            <>
             {encheres ? <CardEnchere encheres={search} /> : <div>Chargement en cours...</div>} 
            </>
          ):(
            <>
            {encheres ? <CardEnchere encheres={encheres} /> : <div>Chargement en cours...</div>} 
            </>
          )
        ):(
          <>
          <p className="dataNotFound">No data found</p>
          </>
        )
      }
    </div>
  );
}
export default Liste;

