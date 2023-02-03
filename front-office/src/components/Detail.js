import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Info from './Info';
import Loading from './loading';
function Detail() {
  const [enchere, setEncehere] = useState();
  let { id } = useParams();

  useEffect(() => {
    infoEnchere();
  }, []);
  const infoEnchere = async () => {
    const response = await fetch("https://api-enchere-production.up.railway.app/encheres/" + id);
    const json = await response.json();
    setEncehere(json);
  }


  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-12 col-xl-10">
          {enchere ? <Info enchere={enchere} /> : <Loading />}
        </div>
      </div>
    </div>
  );
}
export default Detail;
