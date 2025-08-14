import "../styles/ArtifactRow.css";
import { useArtifacts } from "../context/ArtifactsContext";
import { useMemo } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ArtifactRow = ({ artifact, onDeleted }) => {
  const { getCategoryLabelById, getCategoryIconById, removeArtifact } = useArtifacts();

  const categoryLabel = useMemo(() => getCategoryLabelById(artifact.type_id), [artifact.type_id, getCategoryLabelById]);
  const CategoryIcon = useMemo(() => getCategoryIconById(artifact.type_id), [artifact.type_id, getCategoryIconById]);

  const handleDelete = async () => {
    MySwal.fire({
      title: "Banish Artifact?",
      text: `“${artifact.name}” will be permanently removed.`,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      customClass: {
        popup: "umbral-popup",
        title: "umbral-title",
        content: "umbral-text",
        confirmButton: "umbral-confirm",
        cancelButton: "umbral-cancel",
      },
      allowOutsideClick: () => !MySwal.isLoading(),
      preConfirm: async () => {
        try {
          await removeArtifact(artifact.id);
        } catch (e) {
          const msg = e?.response?.data?.error || "Failed to delete artifact.";
          MySwal.showValidationMessage(msg);
          throw new Error(msg);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Artifact banished",
          text: `"${artifact.name}" has been removed.`,
          icon: "success",
          customClass: {
            popup: "umbral-popup",
            title: "umbral-title",
            content: "umbral-text",
            confirmButton: "umbral-confirm",
          },
        });
        if (typeof onDeleted === "function") onDeleted(artifact.id);
      }
    });
  };

  return (
    <div className="artifact-card">
      <img src={artifact.image} alt={artifact.name} className="artifact-image" />

      <div className="content">
        <div className="header text-spectral">
          <h2 className="text-md">{artifact.name}</h2>
          <p className="status">ACTIVE</p>
          <div>
            <button className="editBtn" title="Editar">✎</button>
            <button className="closeBtn" title="Eliminar" onClick={handleDelete}>✖</button>
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
