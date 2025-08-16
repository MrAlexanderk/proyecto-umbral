import { useMemo, useState, useEffect } from "react";
import "../styles/ArtifactRow.css";
import { useArtifacts } from "../context/ArtifactsContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ArtifactRow = ({ artifact, onDeleted }) => {
  const {
    artifacts,                
    getCategoryLabelById,
    getCategoryIconById,
    categories,
    updateArtifact,
    removeArtifact,
  } = useArtifacts();

  const live = useMemo(
    () => artifacts.find((a) => a.id === artifact.id) || artifact,
    [artifacts, artifact.id]
  );

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [origin, setOrigin] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState(live.type_id);
  const [statusId, setStatusId] = useState(live.status_id || 1);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editMode) {
      setName(live.name || "");
      setPrice(live.price ?? 0);
      setOrigin(live.origin || "");
      setAge(live.age ?? "");
      setDescription(live.description || "");
      setTypeId(live.type_id);
      setStatusId(live.status_id || 1);
      setImage(live.image || "");
    }
  }, [editMode, live]);

  const ViewCategoryIcon = useMemo(
    () => getCategoryIconById(live.type_id),
    [live.type_id, getCategoryIconById]
  );
  const viewCategoryLabel = useMemo(
    () => getCategoryLabelById(live.type_id),
    [live.type_id, getCategoryLabelById]
  );

  const EditCategoryIcon = useMemo(
    () => getCategoryIconById(typeId),
    [typeId, getCategoryIconById]
  );
  const editCategoryLabel = useMemo(
    () => getCategoryLabelById(typeId),
    [typeId, getCategoryLabelById]
  );

  const cancelEdit = () => setEditMode(false);

  const handleSave = async () => {
    const patch = {};
    if (name.trim() !== (live.name || "")) patch.name = name.trim();
    if (Number(price) !== Number(live.price)) patch.price = Number(price);
    const newAge = age === "" ? null : Number(age);
    const oldAge = live.age ?? null;
    if (newAge !== oldAge) patch.age = newAge;
    if ((origin || null) !== (live.origin || null)) patch.origin = origin || null;
    if ((description || null) !== (live.description || null)) patch.description = description || null;
    if ((image || null) !== (live.image || null)) patch.image = image ? image : null;
    if (Number(typeId) !== Number(live.type_id)) patch.type_id = Number(typeId);
    if (Number(statusId) !== Number(live.status_id)) patch.status_id = Number(statusId);

    if (Object.keys(patch).length === 0) {
      setEditMode(false);
      return;
    }

    await MySwal.fire({
      title: "Save changes?",
      text: `Apply updates to “${live.name}”?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Save",
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
          await updateArtifact(live.id, patch);
        } catch (e) {
          const msg = e?.response?.data?.error || "Failed to update artifact.";
          MySwal.showValidationMessage(msg);
          throw new Error(msg);
        }
      },
    });

    await MySwal.fire({
      title: "Updated",
      text: "The artifact was updated successfully.",
      icon: "success",
      customClass: {
        popup: "umbral-popup",
        title: "umbral-title",
        content: "umbral-text",
        confirmButton: "umbral-confirm",
      },
    });

    setEditMode(false);
    window.location.reload();
  };

  const handleDelete = async () => {
    MySwal.fire({
      title: "Banish Artifact?",
      text: `“${live.name}” will be permanently removed.`,
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
          await removeArtifact(live.id);
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
          text: `"${live.name}" has been removed.`,
          icon: "success",
          customClass: {
            popup: "umbral-popup",
            title: "umbral-title",
            content: "umbral-text",
            confirmButton: "umbral-confirm",
          },
        });
        if (typeof onDeleted === "function") onDeleted(live.id);
      }
    });
  };

  const displayImage = editMode ? (image || live.image || null) : (live.image || null);

  return (
    <div className="artifact-card">
      {displayImage && (
        <img
          src={displayImage}
          alt={editMode ? (name || live.name) : live.name}
          className="artifact-image"
        />
      )}

      <div className="content">
        <div className="header text-spectral">
          {editMode ? (
            <input
              className="input-square"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          ) : (
            <h2 className="text-md">{live.name}</h2>
          )}

          <p className="status">
            {(editMode ? statusId : live.status_id) === 1
              ? "ACTIVE"
              : (editMode ? statusId : live.status_id) === 2
              ? "RESERVED"
              : "SOLD"}
          </p>

          <div>
            {editMode ? (
              <>
                <button className="editBtn" title="Guardar" onClick={handleSave}>✔</button>
                <button className="editBtn" title="Cancelar" onClick={cancelEdit}>⟲</button>
                <button className="closeBtn" title="Eliminar" onClick={handleDelete}>✖</button>
              </>
            ) : (
              <>
                <button className="editBtn" title="Editar" onClick={() => setEditMode(true)}>✎</button>
                <button className="closeBtn" title="Eliminar" onClick={handleDelete}>✖</button>
              </>
            )}
          </div>
        </div>

        <div className="details text-crimson">
          {editMode ? (
            <div className="edit-grid">
              {/* Columna 1 */}
              <div className="edit-col">
                <h3 className="type text-spectral text-s flex items-center gap-2">
                  {EditCategoryIcon && <EditCategoryIcon />}
                  {editCategoryLabel}
                </h3>

                <div className="field">
                  <label className="label">Description</label>
                  <textarea
                    className="input-square"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
              </div>

              {/* Columna 2 */}
              <div className="edit-col">
                <div className="field">
                  <label className="label">Origin</label>
                  <input
                    className="input-square"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Origin"
                  />
                </div>

                <div className="field">
                  <label className="label">Age (years)</label>
                  <input
                    className="input-square"
                    type="number"
                    min="0"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                  />
                </div>
              </div>

              {/* Columna 3 */}
              <div className="edit-col">
                <div className="field">
                  <label className="label">Type</label>
                  <select
                    className="input-square"
                    value={typeId}
                    onChange={(e) => setTypeId(Number(e.target.value))}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label className="label">Status</label>
                  <select
                    className="input-square"
                    value={statusId}
                    onChange={(e) => setStatusId(Number(e.target.value))}
                  >
                    <option value={1}>ACTIVE</option>
                    <option value={2}>RESERVED</option>
                    <option value={3}>SOLD</option>
                  </select>
                </div>

                <div className="field">
                  <label className="label">Price</label>
                  <input
                    className="input-square"
                    type="number"
                    min="0"
                    step="100"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  />
                </div>

                <div className="field">
                  <label className="label">Image URL</label>
                  <input
                    className="input-square"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="left">
                <h3 className="type text-spectral text-s flex items-center gap-2">
                  {ViewCategoryIcon && <ViewCategoryIcon />}
                  {viewCategoryLabel}
                </h3>
                <p className="history">{live.description || live.history}</p>
              </div>

              <div className="middle">
                <p><strong>Origin:</strong></p>
                <p><em className="px-2">{live.origin}</em></p>
                <p><strong>Age:</strong></p>
                <p><em className="px-2">{live.age} y/o</em></p>
              </div>

              <div className="right">
                <p className="px-2 price_custom">${live.price}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactRow;
