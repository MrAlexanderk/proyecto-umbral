import { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { UserContext } from '../context/UserContext';
import '../styles/SignUp.css';
import '../styles/Buttons.css';
import ArtifactVisual from '../components/ArtifactVisual';

const MySwal = withReactContent(Swal);

const categories = [
  { id: 1, name: 'Dolls' },
  { id: 2, name: 'Mirrors' },
  { id: 3, name: 'Books' },
  { id: 4, name: 'Tech' },
  { id: 5, name: 'Relics' },
  { id: 6, name: 'Lockets' },
  { id: 7, name: 'Garments' },
  { id: 8, name: 'Others' }
];

const AddArtifact = () => {
  const {addArtifact, getProfile } = useContext(UserContext);
  const navigate = useNavigate();

  const [artifactName, setartifactName] = useState('');
  const [artifactType, setArtifactType] = useState("");
  const [artifactOrigin, setArtifactOrigin] = useState('');
  const [artifactAge, setArtifactAge] = useState('');
  const [artifactPrice, setArtifactPrice] = useState('');
  const [artifactHistory, setArtifactHistory] = useState('');
  const [artifactImage, setArtifactImage] = useState(null);
  const [artifactImageName, setArtifactImageName] = useState('');


  const [touched, setTouched] = useState({
    artifactName: false,
    artifactType: false,
    artifactOrigin: false,
    artifactAge: false,
    artifactPrice: false,
    artifactHistory: false,
    password: false,
    confirmPassword: false,
    checks: false,
  });

  const allValid =
    artifactName &&
    artifactType &&
    artifactOrigin &&
    artifactAge &&
    artifactPrice &&
    artifactHistory;
  
  const artifact = {
    name: artifactName || "Artifact Name",
    type: artifactType || "Artifact Type",
    origin: artifactOrigin || "Origin",
    age: artifactAge || "Artifact Age",
    price: artifactPrice || "$$$$$",
    history: artifactHistory || "Include a brief and REALISTIC history of the artifact.",
    image: artifactImage || "../../src/assets/hero.jpg"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allValid) return;

    const user = await getProfile();
    if (!user) throw new Error("User not found");

    const payload = {
      user_id: user?.id,
      status_id: 1,
      type_id: Number(artifactType),
      name: artifactName,
      description: artifactHistory,
      history: artifactHistory,
      price: Number(artifactPrice),
      age: artifactAge,
      origin: artifactOrigin,
      image_url: artifactImage
    };

    try {

      await addArtifact(payload);

      await MySwal.fire({
        title: "Artifact added successful!",
        text: `You added ${artifactName}.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'umbral-popup',
          title: 'umbral-title',
          content: 'umbral-text',
          icon: 'umbral-icon'
        },
        timerProgressBar: true,
      });
      navigate('/profile');
    } catch (error) {
      MySwal.fire({
        title: "Process failed",
        text: error.message || "An error occurred during adding your artifact.",
        icon: "error",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArtifactImage(URL.createObjectURL(file));
      setArtifactImageName(file.name);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box text-white-custom">
        <h1 className="text-white-custom text-xl text-spectral">List a New Artifact</h1>
        <p className="subtitle text-crimson text-md">Everything carries a story...</p>
        <hr></hr>

        <Form className="signup-form text-crimson mt-4" onSubmit={handleSubmit}>
          <div className="form-row mb-3">
            <label className="text-md">Artifact Name</label>
            <div className="input-icon-group">
              <input
                type="text"
                placeholder="Your unholy artifact name"
                value={artifactName}
                onChange={(e) => setartifactName(e.target.value)}
                onBlur={() => setTouched({ ...touched, artifactName: true })}
              />
              {touched.artifactName &&
                (artifactName ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />)}
            </div>
            {touched.artifactName && !artifactName && (
              <p className="text-detail-error mb-0 text-danger">*Artifact name required</p>
            )}
          </div>

          <div className="form-row mb-3">
            <label className="text-md">Artifact Type</label>
            <div className="input-icon-group">
              <select
                value={artifactType}
                onChange={(e) => setArtifactType(e.target.value)}
                onBlur={() => setTouched({ ...touched, artifactType: true })}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {touched.artifactType && !artifactType && (
              <p className="text-detail-error mb-0 text-danger">*Category is required</p>
            )}
          </div>
          
          <div className="form-row mb-3">
            <label className="text-md">Artifact Origin</label>
            <div className="input-icon-group">
              <input
                type="text"
                placeholder="Your unholy artifact origin"
                value={artifactOrigin}
                onChange={(e) => setArtifactOrigin(e.target.value)}
                onBlur={() => setTouched({ ...touched, artifactOrigin: true })}
              />
              {touched.artifactOrigin &&
                (artifactOrigin ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />)}
            </div>
            {touched.artifactOrigin && !artifactOrigin && (
              <p className="text-detail-error mb-0 text-danger">*Artifact origin required</p>
            )}
          </div>

          <div className="form-row mb-3">
            <label className="text-md">Artifact Age</label>
            <div className="input-icon-group">
              <input
                type="number"
                placeholder="Your unholy artifact Age"
                value={artifactAge}
                onChange={(e) => setArtifactAge(e.target.value)}
                onBlur={() => setTouched({ ...touched, artifactAge: true })}
              />
              {touched.artifactAge &&
                (artifactAge ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />)}
            </div>
            {touched.artifactAge && !artifactAge && (
              <p className="text-detail-error mb-0 text-danger">*Artifact Age required</p>
            )}
          </div>

          <div className="form-row mb-3">
            <label className="text-md">Artifact Price</label>
            <div className="input-icon-group">
              <input
                type="number"
                placeholder="Your unholy artifact Price"
                value={artifactPrice}
                onChange={(e) => setArtifactPrice(e.target.value)}
                onBlur={() => setTouched({ ...touched, artifactPrice: true })}
              />
              {touched.artifactPrice &&
                (artifactPrice ? <FaCheckCircle className="icon success" /> : <FaTimesCircle className="icon error" />)}
            </div>
            {touched.artifactPrice && !artifactPrice && (
              <p className="text-detail-error mb-0 text-danger">*Artifact Price required</p>
            )}
          </div>

          <div className="form-row mb-3">
            <label className="text-md">Artifact History</label>
            <div className="input-icon-group">
              <textarea
                className="artifact-history-input"
                placeholder="Your unholy artifact History"
                value={artifactHistory}
                onChange={(e) => setArtifactHistory(e.target.value)}
                onBlur={() => setTouched({ ...touched, artifactHistory: true })}
              />
              {touched.artifactHistory &&
                (artifactHistory ? ( <FaCheckCircle className="icon success" /> ) : ( <FaTimesCircle className="icon error" /> ))}
            </div>
            {touched.artifactHistory && !artifactHistory && (
              <p className="text-detail-error mb-0 text-danger">*Artifact History required</p>
            )}
          </div>
          <label className="text-md text-gray-custom">Artifact History</label>
          <div className="d-flex justify-content-left add-image-container">
            <input
              type="file"
              accept="image/*"
              id="artifactImageInput"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />

            <button
              type="button"
              className="btn-secondary mt-3 text-s text-white-custom add-image-btn"
              onClick={() => document.getElementById('artifactImageInput').click()}
            >
              Select Image
            </button>

            {artifactImage ? (
              <>
                <p className="text-md">Image loaded ✅</p>
                <p className="text-s"><em>{artifactImageName}</em></p>
              </>
            ) : (
              <p>Image not loaded.</p>
            )}
          </div>

          <hr className="divider" />

          <h2 className="text-white-custom text-spectral mt-3">Preview</h2>
          <p className="terms-label text-crimson mb-4">This is how your artifact will be displayed:</p>

          <ArtifactVisual key={artifact.id} artifact={artifact}></ArtifactVisual>

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
