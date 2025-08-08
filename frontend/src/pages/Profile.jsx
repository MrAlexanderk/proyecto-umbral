import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap";
import { FaEdit, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserContext } from "../context/UserContext";

import "../styles/SignUp.css";
import "../styles/Buttons.css";
import "../styles/alerts.css";
import "../styles/Profile.css";

const MySwal = withReactContent(Swal);

const Profile = () => {
    const { token, email: contextEmail, getProfile, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        MySwal.fire({
        title: 'You are Leaving El Umbral',
        text: `Are you sure?`,
        icon: 'info',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Abandon',
        cancelButtonText: 'Cancel',
        customClass: {
            popup: 'umbral-popup',
            title: 'umbral-title',
            content: 'umbral-text',
            confirmButton: 'umbral-confirm',
            cancelButton: 'umbral-cancel',
        },
        }).then((result) => {
        if (result.isConfirmed) {
            logout();
            navigate('/');
        }
        });
    };

    const handleDeleteAccount = () => {
        MySwal.fire({
        title: "You can't leave El Umbral",
        text: `Go back now!`,
        icon: 'info',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Yes, Sir!',
        customClass: {
            popup: 'umbral-popup',
            title: 'umbral-title',
            content: 'umbral-text',
            cancelButton: 'umbral-cancel',
        },
        });
    };

    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Usamos para el placeholder con ****
    const [editMode, setEditMode] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
    });

    useEffect(() => {
        const fetchProfile = async () => {
        if (!token) return;
        setLoadingProfile(true);
        const profile = await getProfile();
        if (profile) {
            setUsername(profile.username || '');
            setEmail(profile.email || contextEmail || '');
            setPassword(''.padStart(profile.passwordLength || 8, '*'));
        }
        setLoadingProfile(false);
        };
        fetchProfile();
    }, [token, getProfile, contextEmail]);

    // Validaciones simples para habilitar botón guardar
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isStrongPassword = (pass) => pass === password || /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass);
    const allValid = username && isValidEmail(email) && isStrongPassword(password);
    const handleSave = async (e) => {
        e.preventDefault();
        if (!allValid) {
        MySwal.fire({
            title: "Invalid input",
            text: "Please check your data before saving.",
            icon: "warning",
        });
        return;
        }

        // Aquí harías la llamada para guardar los cambios usando UserContext o API
        // Por ahora mostramos alerta de éxito y salimos de modo edición

        await MySwal.fire({
        title: "Profile updated",
        text: `Your data has been saved, ${username}.`,
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: {
          popup: 'umbral-popup',
          title: 'umbral-title',
          content: 'umbral-text',
          icon: 'umbral-icon'
        },
        });

        setEditMode(false);
    };

    if (loadingProfile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="signup-container">
            <div className="signup-box text-white-custom">
                <h1 className="text-white-custom text-xl text-spectral">My Profile</h1>
                <p className="subtitle text-crimson text-md">{username || 'Your username'}</p>

                <Form className={`signup-form text-crimson ${editMode ? 'editing-mode' : ''}`} onSubmit={handleSave}>
                <div>
                    {editMode ? (
                        <h3 className="text-spectral text-md">Edit your profile</h3>
                    ) : (<></>)}

                    {/* Username */}
                    <div className="form-row mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={username || 'Your username'}
                        value={username}
                        disabled={!editMode}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => setTouched({ ...touched, username: true })}
                        className="form-control"
                    />
                    {touched.username && !username && (
                        <p className="text-detail-error mb-0 text-danger">*Username required</p>
                    )}
                    </div>

                    {/* Email */}
                    <div className="form-row mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder={email || 'you@example.com'}
                        value={email}
                        disabled={!editMode}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched({ ...touched, email: true })}
                        className="form-control"
                    />
                    {touched.email && email && !isValidEmail(email) && (
                        <p className="text-detail-error mb-0 text-danger">*Enter a valid email address</p>
                    )}
                    {touched.email && !email && (
                        <p className="text-detail-error mb-0 text-danger">*Email is required</p>
                    )}
                    </div>

                    {/* Password */}
                    <div className="form-row mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder={password || 'Enter new password'}
                        value={password}
                        disabled={!editMode}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched({ ...touched, password: true })}
                        className="form-control"
                    />
                    {touched.password && !password && (
                        <p className="text-detail-error mb-0 text-danger">*Password is required</p>
                    )}
                    {touched.password && password && !isStrongPassword(password) && (
                        <p className="text-detail-error mb-0 text-danger">
                        *Password must contain at least 6 characters, including one number
                        </p>
                    )}
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3 gap-3">
                    {!editMode ? (
                    <button
                        type="button"
                        className="btn-secondary text-md w-50 text-espectral text-white-custom"
                        onClick={() => setEditMode(true)}
                        >
                        <FaEdit style={{ marginRight: '8px' }} />
                        Editar
                    </button>
                    ) : (<></>)}

                    {!editMode ? (
                    <button
                        type="button"
                        className="btn-primary text-md w-50 text-crimson"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    ) : (<></>)}
                </div>  

                <div className="d-flex justify-content-center mt-3">
                    {editMode ? (
                    <button
                        type="submit"
                        className="btn-primary text-md w-100"
                        disabled={!allValid}
                        >
                        <FaSave style={{ marginRight: '8px' }} />
                        Guardar
                    </button>
                    ) : (<></>)}
                </div>
                </Form>

                <div class="artifacts-container">
                    <h2 className="text-white-custom text-md text-spectral">My Artifacts</h2>
                    <p className="text-crimson text-md">Here you can manage your artifacts.</p>
                    {/* Aquí podrías agregar un componente o lógica para mostrar los artefactos del usuario */}

                </div>

                <div className="d-flex justify-content-center mt-3">

                    <button
                        className="btn-secondary text-md text-danger w-100 text-crimson"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;