import { useEffect, useState } from 'react';
import CardEnchere from './cardEnchere';
import Loading from './loading';

const Liste = () => {

  const [check, setCheck] = useState(true);
  const [encheres, setEncehere] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState([]);

  const [motCle, setMotCle] = useState('');
  const [categorie, setCategorie] = useState('');
  const [prixMin, setPrixMin] = useState('');
  const [prixMax, setPrixMax] = useState('');

  const [dateFin, setDateFin] = useState('');
  const [dateDebut, setDateDebut] = useState('');

  const [etat, setEtat] = useState({ status: [] });

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { status } = etat;

    if (checked) {
      setEtat({
        status: [...status, value],
      });
    } else {
      setEtat({
        status: status.filter((e) => e !== value)
      });
    }
  }

  const getAllEnchere = async () => {
    const response = await fetch("https://api-enchere-production.up.railway.app/encheres");
    const json = await response.json();
    setEncehere(json);
  }

  const getAllCategorie = async () => {
    const response = await fetch("https://api-enchere-production.up.railway.app/categories");
    const json = await response.json();
    setCategories(json);
  }

  const searchFor = async () => {
    var cache = "null";
    if (etat.status[0] === "true") {
      cache = "true";
    }
    if (etat.status[0] === "false") {
      cache = "false";
    }
    if (etat.status.length === 2) {
      cache = "null";
    }
    const data = {
      motCle: motCle,
      id_categorie: categorie,
      prix_min: prixMin,
      prix_max: prixMax,
      dateDebut: dateDebut,
      date: dateFin,
      statut: cache,
    }
    const search = await fetch("https://api-enchere-production.up.railway.app/encheres", {
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
    if (result.length === 0) {
      setCheck(false);
    } else {
      setCheck(true);
    }
    setSearch(result);
  }

  useEffect(() => {
    getAllEnchere();
    getAllCategorie();
  }, []);

  const noData ={
    textAlign: "center",
    marginTop: "200px",
    fontSize: "45px",
  }

  return (
    <>
      <nav className="navbar navbar-dark align-items-start side-bar-critera">
        <div className="container-fluid d-flex flex-column p-0">
          <div className="contain-form-critera first">
            <input type="text" className="form-critera"
              value={motCle}
              onChange={(e) => { setMotCle(e.target.value) }} placeholder="Search..." />
          </div>
          <div className="contain-form-critera">
            <select className="form-critera" value={categorie} onChange={e => setCategorie(e.target.value)} >
              <option value={"null"}>selectionner categorie</option>
              {categories.map(cat => (
                <option key={cat.id_categorie} value={cat.id_categorie}>{cat.intitule}</option>
              ))}
            </select>
          </div>
          <div className="contain-form-critera">
            <header>
              <h6>Prix:</h6>
            </header>
            <input type={"number"} onChange={(e) => { setPrixMin(e.target.value) }} className="form-critera prix-min" placeholder="min" />
            <input type={"number"} onChange={(e) => { setPrixMax(e.target.value) }} className="form-critera prix-max" placeholder="max" />
          </div>
          <div className="contain-form-critera">
            <header>
              <h6>Debut Date:</h6>
            </header>
            <input type={"date"} onChange={(e) => { setDateDebut(e.target.value) }} className="form-critera date" />
          </div>
          <div className="contain-form-critera">
            <header>
              <h6>Fin Date:</h6>
            </header>
            <input type={"date"} onChange={(e) => { setDateFin(e.target.value) }} className="form-critera date" />
          </div>
          <div className="contain-form-critera">
            <header>
              <h6>Statut:</h6>
            </header>
            <span className="d-xl-flex align-items-xl-center span-critera">&nbsp; &nbsp;
              <input type={"checkbox"} value="true" onChange={handleChange} />&nbsp; En cours</span>
            <span className="d-xl-flex align-items-xl-center span-critera">&nbsp; &nbsp;
              <input type={"checkbox"} value="false" onChange={handleChange} />&nbsp; Terminer</span>
          </div>
          <div className="d-xl-flex justify-content-xl-center contain-form-critera">
            <button className="btn btn-primary" type={"submit"} onClick={searchFor} value="Recherecher">Rechercher</button>
          </div>
        </div>
      </nav>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center justify-content-xl-center mb-4">
              <h3 className="text-dark mb-0">Liste enchere</h3>
            </div>
            <div className="row">
              {
                check ? (
                  search?.length > 0 ? (
                    <>
                      {encheres.length ? <CardEnchere encheres={search} /> : <Loading />}
                    </>
                  ) : (
                    <>
                      {encheres.length ? <CardEnchere encheres={encheres} /> : <Loading />}
                    </>
                  )
                ) : (
                  <>
                    <p className="dataNotFound" style={noData}>No data found</p>
                  </>
                )
              }
            </div>
          </div>
        </div>
        <footer className="bg-white sticky-footer">
          <div className="container my-auto">
            <div className="text-center my-auto copyright"><span>Copyright © Brand 2023</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}
export default Liste;

