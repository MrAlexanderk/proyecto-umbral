import '../styles/ArtifactRow.css';

const categories = [
  'Dolls','Mirrors','Books', 'Tech', 'Relics','Lockets', 'Garments','Others'
];

const ArtifactRow = ({ artifact }) => {
  return (
    <div className="artifact-card">
      <img src={artifact.image} alt={artifact.name} className="artifact-image" />

      <div className="content p-0">
        <div className="header text-spectral">
            <h2 className="text-md">{artifact.name}</h2>
            <p className="status">ACTIVE</p>
            <div>
                {/* Está pendiente la implementación de las funcionalidades de editar y borrar. */}
                <button className="editBtn">✎</button>
                <button className="closeBtn">✖</button>
            </div>
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
                <p><strong>Price:</strong> </p>
                <p className="px-2 price">${artifact.price}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactRow;
