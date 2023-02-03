import { useHistory } from "react-router-dom";
import { useState } from 'react';

const Login = (props) => {
  const [mail, setEmail] = useState();
  const [pass, setMdp] = useState();
  const history = useHistory();

  function acces(user) {
    if (props.location.state.page === "historique") {
      history.push({
        pathname: '/historique',
        state: { user }
      });
    } else {
      history.push({
        pathname: '/miser',
        state: { user, enchere: props.location.state.enchere }
      });
    }
  }

  const login = async () => {
    const data = {
      email: mail,
      mdp: pass,
    }
    const url = await fetch("https://api-enchere-production.up.railway.app/utilisateurs/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const result = await url.json();
    if (result.message != null) {
      alert(result.message);
      history.push('/login');
    } else if (result.id_utilisateur != null) {
      alert("Bienvenue");
      acces(result);
    }
  }


  return (
    
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
              <div className="card mb-5">
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                  </svg></div>
                    <div className="mb-3">
                      <input className="form-control" type={"email"} onChange={(e) => { setEmail(e.target.value ) }} defaultValue={"michaeljohnson@email.com"} placeholder="Email" />
                    </div>
                    <div className="mb-3">
                      <input className="form-control"type={"password"} onChange={(e) => { setMdp(e.target.value) }} defaultValue={"password"} placeholder="Password" />
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-primary d-block w-100" onClick={login} type="submit">Login</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Login;