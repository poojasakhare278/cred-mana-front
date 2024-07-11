import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCredential, updateCredential } from '../features/credentials/credentialsSlice';
import QRCode from 'qrcode.react';
import Modal from './Modal';
import '../styles/CredentialCard.scss';

interface CredentialCardProps {
  id: string;
  loginUrl: string;
  username: string;
  passcode: string;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ id, loginUrl: initialLoginUrl, username: initialUsername, passcode: initialPasscode }) => {
  const dispatch = useDispatch();

  const [loginUrl, setLoginUrl] = useState(initialLoginUrl);
  const [username, setUsername] = useState(initialUsername);
  const [passcode, setPasscode] = useState(initialPasscode);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copyUrlHighlighted, setCopyUrlHighlighted] = useState(false);
  const [copyPasscodeHighlighted, setCopyPasscodeHighlighted] = useState(false);

  const handleDelete = () => {
    dispatch(deleteCredential(id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateCredential({ id, loginUrl, username, passcode }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLoginUrl(initialLoginUrl);
    setUsername(initialUsername);
    setPasscode(initialPasscode);
    setIsEditing(false);
  };

  const copyToClipboard = (text: string, setHighlighted: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setHighlighted(true);
    setTimeout(() => {
      setHighlighted(false);
    }, 1000); 
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="credential-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            value={loginUrl}
            onChange={(e) => setLoginUrl(e.target.value)}
          />
          <input
            type="text"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <button onClick={handleSave} className='cta'>Save</button>
          <button onClick={handleCancel} className='cta'>Cancel</button>
        </>
      ) : (
        <>
          <h3>{username}</h3>
          <p className="truncate">
            <span className="text">{loginUrl}</span>
            <img
              src='/assets/copy-regular.svg'
              alt=''
              className={copyUrlHighlighted ? 'highlighted' : ''}
              onClick={() => copyToClipboard(loginUrl, setCopyUrlHighlighted)}
            />
          </p>
          <p className="truncate">
            <span className="text">{passcode}</span>
            <img
            alt=''
              src='/assets/copy-regular.svg'
              className={copyPasscodeHighlighted ? 'highlighted' : ''}
              onClick={() => copyToClipboard(passcode, setCopyPasscodeHighlighted)}
            />
          </p>
          <div className="button-group">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={openModal}>G-QR</button>
          </div>
          {showModal && (
            <Modal onClose={closeModal}>
              <QRCode value={loginUrl} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default CredentialCard;
