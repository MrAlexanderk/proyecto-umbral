import '../styles/ArtifactRow.css';

const ArtifactRow = ({ artifact }) => {
  return (
    <div className="artifact-card">
      <img src={artifact.image} alt={artifact.name} className="artifact-image" />

      <div className="content">
        <div className="header">
          <h2 className="title text-spectral">{artifact.name}</h2>
          <span className="status text-spectral">ACTIVE</span>
          <div className="actions text-spectral">
            <button className="editBtn">✎</button>
            <button className="closeBtn">✖</button>
          </div>
        </div>

        <div className="details text-crimson">
          <div className="left">
            <h3 className="type text-spectral text-s">{artifact.type}</h3>
            <p className="history">{artifact.history}</p>
          </div>

          <div className="right">
            <p><strong>Origin:</strong> <em>{artifact.origin}</em></p>
            <p><strong>Age:</strong> <em>{artifact.age}</em></p>
            <p><strong>Seller:</strong> <em>{artifact.seller}</em></p>
            <p><strong>Price:</strong> <span className="price">${artifact.price}</span></p>
            <p><small>Created at: {new Date(artifact.created_at).toLocaleDateString()}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactRow;
