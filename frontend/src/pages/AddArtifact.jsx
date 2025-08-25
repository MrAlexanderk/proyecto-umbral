import { useState, useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { UserContext } from '../context/UserContext';
import { useArtifacts } from '../context/ArtifactsContext';
import '../styles/SignUp.css';
import '../styles/Buttons.css';
import ArtifactVisual from '../components/ArtifactVisual';

const MySwal = withReactContent(Swal);

const AddArtifact = () => {
  const { getProfile } = useContext(UserContext);
  const { categories, addArtifact } = useArtifacts();
  const navigate = useNavigate();

  const [artifactName, setartifactName] = useState('');
  const [artifactType, setArtifactType] = useState('');
  const [artifactOrigin, setArtifactOrigin] = useState('');
  const [artifactAge, setArtifactAge] = useState('');
  const [artifactPrice, setArtifactPrice] = useState('');
  const [artifactHistory, setArtifactHistory] = useState('');
  const [artifactDescription, setArtifactDescription] = useState('');
  const [artifactImage, setArtifactImage] = useState(null);
  const [artifactImageName, setArtifactImageName] = useState('');
  const [profile, setProfile] = useState(null);

  const [touched, setTouched] = useState({
    artifactName: false,
    artifactType: false,
    artifactOrigin: false,
    artifactAge: false,
    artifactPrice: false,
    artifactHistory: false,
    artifactDescription: false,
    artifactImage: false,
  });

  const allValid =
    artifactName &&
    artifactType &&
    artifactOrigin &&
    artifactAge &&
    artifactPrice &&
    artifactHistory &&
    artifactDescription &&
    artifactImage;

  useEffect(() => {
    async function fetchProfile() {
      const userData = await getProfile();
      setProfile(userData);
    }
    fetchProfile();
  }, [getProfile]);

  const artifact = {
    name: artifactName || 'Artifact Name',
    type_id: artifactType || 'Artifact Type',
    origin: artifactOrigin || 'Origin',
    age: artifactAge || 'Artifact Age',
    price: artifactPrice || '$$$$$',
    description: artifactDescription || 'Include a short Description',
    history:
      artifactHistory ||
      'Include a brief and REALISTIC history of the artifact.',
    image: artifactImage || '../../src/assets/hero.jpg',
    seller: profile?.username || 'Unknown Seller',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allValid) return;

    const user = await getProfile();
    if (!user) throw new Error('User not found');

    const payload = {
      user_id: user?.id,
      status_id: 1,
      type_id: Number(artifactType),
      name: artifactName,
      description: artifactDescription,
      history: artifactHistory,
      price: Number(artifactPrice),
      age: artifactAge,
      origin: artifactOrigin,
      image_url: artifactImage,
    };

    try {
      await addArtifact(payload);

      await MySwal.fire({
        title: 'Artifact added successfully!',
        text: `You added ${artifactName}.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'umbral-popup',
          title: 'umbral-title',
          content: 'umbral-text',
          icon: 'umbral-icon',
        },
        timerProgressBar: true,
      });
      navigate('/profile');
    } catch (error) {
      MySwal.fire({
        title: 'Process failed',
        text:
          error.message ||
          'An error occurred during adding your artifact.',
        icon: 'error',
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArtifactImage(URL.createObjectURL(file));
      setArtifactImageName(file.name);
      setTouched((prev) => ({ ...prev, artifactImage: true }));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box text-white-custom">
        <h1 className="text-white-custom text-xl text-spectral">
          List a New Artifact
        </h1>
        <p className="subtitle text-crimson text-md">
          Everything carries a story...
        </p>
        <hr />

        <Form
          className="signup-form text-crimson mt-4"
          onSubmit={handleSubmit}
        >
          {/* Artifact Name */}
          <div className="form-row mb-3">
            <label className="text-md">Artifact Name</label>
            <div className="input-icon-group">
              <input
                type="text"
                placeholder="Your unholy artifact name"
                value={artifactName}
                onChange={(e) => setartifactName(e.target.value)}
                onBlur={() =>
                  setTouched({ ...touched, artifactName: true })
                }
              />
              {touched.artifactName &&
                (artifactName ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.artifactName && !artifactName && (
              <p className="text-detail-error mb-0 text-danger">
                *Artifact name required
              </p>
            )}
          </div>

          {/* Artifact Type */}
          <div className="form-row mb-3">
            <label className="text-md">Artifact Type</label>
            <div className="input-icon-group">
              <select
                value={artifactType}
                onChange={(e) => setArtifactType(e.target.value)}
                onBlur={() =>
                  setTouched({ ...touched, artifactType: true })
                }
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            {touched.artifactType && !artifactType && (
              <p className="text-detail-error mb-0 text-danger">
                *Category is required
              </p>
            )}
          </div>

          {/* Artifact Origin */}
          <div className="form-row mb-3">
            <label className="text-md">Artifact Origin</label>
            <div className="input-icon-group">
              <input
                type="text"
                placeholder="Your unholy artifact origin"
                value={artifactOrigin}
                onChange={(e) => setArtifactOrigin(e.target.value)}
                onBlur={() =>
                  setTouched({ ...touched, artifactOrigin: true })
                }
              />
              {touched.artifactOrigin &&
                (artifactOrigin ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.artifactOrigin && !artifactOrigin && (
              <p className="text-detail-error mb-0 text-danger">
                *Artifact origin required
              </p>
            )}
          </div>

          {/* Artifact Age */}
          <div className="form-row mb-3">
            <label className="text-md">Artifact Age</label>
            <div className="input-icon-group">
              <input
                type="number"
                placeholder="Your unholy artifact Age"
                value={artifactAge}
                onChange={(e) => setArtifactAge(e.target.value)}
                onBlur={() =>
                  setTouched({ ...touched, artifactAge: true })
                }
              />
              {touched.artifactAge &&
                (artifactAge ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.artifactAge && !artifactAge && (
              <p className="text-detail-error mb-0 text-danger">
                *Artifact Age required
              </p>
            )}
          </div>

          {/* Artifact Price */}
          <div className="form-row mb-3">
            <label className="text-md">Artifact Price</label>
            <div className="input-icon-group">
              <input
                type="number"
                placeholder="Your unholy artifact Price"
                value={artifactPrice}
                onChange={(e) => setArtifactPrice(e.target.value)}
                onBlur={() =>
                  setTouched({ ...touched, artifactPrice: true })
                }
              />
              {touched.artifactPrice &&
                (artifactPrice ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.artifactPrice && !artifactPrice && (
              <p className="text-detail-error mb-0 text-danger">
                *Artifact Price required
              </p>
            )}
          </div>

          {/* Artifact Description */}
          <div className="form-row mb-3">
            <label className="text-md">Artifact Description</label>
            <div className="input-icon-group">
              <textarea
                className="artifact-history-input"
                placeholder="Your unholy artifact Description"
                value={artifactDescription}
                onChange={(e) =>
                  setArtifactDescription(e.target.value)
                }
                onBlur={() =>
                  setTouched({
                    ...touched,
                    artifactDescription: true,
                  })
                }
              />
              {touched.artifactDescription &&
                (artifactDescription ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.artifactDescription && !artifactDescription && (
              <p className="text-detail-error mb-0 text-danger">
                *Artifact Description required
              </p>
            )}
          </div>

          {/* Artifact History */}
          <div className="form-row mb-3">
            <label className="text-md">Artifact History</label>
            <div className="input-icon-group">
              <textarea
                className="artifact-history-input"
                placeholder="Your unholy artifact History"
                value={artifactHistory}
                onChange={(e) =>
                  setArtifactHistory(e.target.value)
                }
                onBlur={() =>
                  setTouched({
                    ...touched,
                    artifactHistory: true,
                  })
                }
              />
              {touched.artifactHistory &&
                (artifactHistory ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.artifactHistory && !artifactHistory && (
              <p className="text-detail-error mb-0 text-danger">
                *Artifact History required
              </p>
            )}
          </div>

          {/* Artifact Image (ahora URL en lugar de archivo) */}
          <div className="form-row mb-3">
            <label className="text-md">Artifact Image (URL)</label>
            <div className="input-icon-group">
              <input
                type="text"
                placeholder="Paste the image URL here"
                value={artifactImage || ""}
                onChange={(e) => setArtifactImage(e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, artifactImage: true }))
                }
              />
              {touched.artifactImage &&
                (artifactImage ? (
                  <FaCheckCircle className="icon success" />
                ) : (
                  <FaTimesCircle className="icon error" />
                ))}
            </div>
            {touched.artifactImage && !artifactImage && (
              <p className="text-detail-error mb-0 text-danger">
                *Artifact Image URL required
              </p>
            )}
          </div>

          {/* Preview de la imagen */}
          {artifactImage && (
            <div className="preview-container mt-2">
              <img
                src={artifactImage}
                alt="Artifact Preview"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          )}


          <hr className="divider" />

          <h2 className="text-white-custom text-spectral mt-3">
            Preview
          </h2>
          <p className="terms-label text-crimson mb-4">
            This is how your artifact will be displayed:
          </p>

          <ArtifactVisual artifact={artifact} />

          <hr className="divider" />

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn-primary mt-3 text-md w-100"
              disabled={!allValid}
            >
              Add Artifact
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddArtifact;
