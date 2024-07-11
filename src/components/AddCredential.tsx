import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCredential } from '../features/credentials/credentialsSlice';
import { v4 as uuidv4 } from 'uuid';
import '../styles/AddCredential.scss';

const AddCredential: React.FC = () => {
  const [loginUrl, setLoginUrl] = useState('');
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const dispatch = useDispatch();

  // Function to check if all inputs are filled
  const areInputsFilled = () => {
    return loginUrl.trim() !== '' && username.trim() !== '' && passcode.trim() !== '' && confirmPasscode.trim() !== '';
  };

  // Function to handle the add credential action
  const handleAdd = () => {
    if (passcode === confirmPasscode) {
      dispatch(
        addCredential({
          id: uuidv4(),
          loginUrl,
          username,
          passcode,
        })
      );
      // Clear input fields after adding credential
      setLoginUrl('');
      setUsername('');
      setPasscode('');
      setConfirmPasscode('');
    } else {
      alert('Passcodes do not match');
    }
  };

  return (
    <div className="add-credential">
      <h2>Add Credential</h2>
      <form>
        <div className="form-group">
          <label>Login URL</label>
          <input
            type="text"
            value={loginUrl}
            required={true}
            onChange={(e) => setLoginUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            required={true}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Passcode</label>
          <input
            type="password"
            value={passcode}
            required={true}
            onChange={(e) => setPasscode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm Passcode</label>
          <input
            type="password"
            value={confirmPasscode}
            required={true}
            onChange={(e) => setConfirmPasscode(e.target.value)}
          />
        </div>
        {/* Disable button if any input is empty */}
        <button type="button" onClick={handleAdd} disabled={!areInputsFilled()}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCredential;
