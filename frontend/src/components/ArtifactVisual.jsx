import '../styles/ArtifactRow.css';
import "../styles/ArtifactVisual.css";

const categories = [
  'Dolls','Mirrors','Books', 'Tech', 'Relics','Lockets', 'Garments','Others'
];

const ArtifactVisual = ({ artifact }) => {
  return (
    <div className="artifact-card">
      {artifact.image && <img src={artifact.image} alt={artifact.name} className="artifact-image"/>}

      <div className="content">
        <div className="header text-spectral">
            <h2 className="text-md">{artifact.name}</h2>

        </div>

        <div className="details text-crimson">
            <div className="left">
                <h3 className="type text-spectral text-s">{categories[artifact.type_id]}</h3> 
                {/* ^ Aquí falta que el id del type cambie a string según cuál sea en bbdd*/}
                <p className="history">{artifact.history}</p>
            </div>
            <div className="middle">
                <p><strong>Origin:</strong></p>
                <p><em className="px-2">{artifact.origin}</em></p>
                <p><strong>Age:</strong></p>
                <p><em className="px-2">{artifact.age} y/o</em></p>
            </div>

            <div className="right">
                <p className="px-2 price_custom">${artifact.price}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactVisual;
