import '../styles/ArtifactRow.css';
import { useArtifacts } from '../context/ArtifactsContext';

const ArtifactRow = ({ artifact }) => {
  const { getCategoryLabelById, getCategoryIconById } = useArtifacts();

  const categoryLabel = getCategoryLabelById(artifact.type_id);
  const CategoryIcon = getCategoryIconById(artifact.type_id);

  return (
    <div className="artifact-card">
      <img
        src={artifact.image}
        alt={artifact.name}
        className="artifact-image"
      />

      <div className="content">
        <div className="header text-spectral">
          <h2 className="text-md">{artifact.name}</h2>
          <p className="status">ACTIVE</p>
          <div>
            {/* Por temas de tiempo, está pendiente la implementación de las funcionalidades de editar y borrar. */}
            <button className="editBtn">✎</button>
            <button className="closeBtn">✖</button>
          </div>
        </div>

        <div className="details text-crimson">
          <div className="left">
            <h3 className="type text-spectral text-s flex items-center gap-2">
              {CategoryIcon && <CategoryIcon />}
              {categoryLabel}
            </h3>
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

export default ArtifactRow;
