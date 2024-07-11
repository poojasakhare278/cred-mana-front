import React from 'react';
import { useSelector } from 'react-redux';
import { selectCredentials } from '../features/credentials/credentialsSlice';
import CredentialCard from './CredentialCard';
import '../styles/CredentialList.scss';
import { Credential } from '../features/credentials/credentialsSlice'; // Assuming Credential type is exported from credentialsSlice

const CredentialList: React.FC = () => {
  const credentials = useSelector(selectCredentials);

  return (
    <div className="credential-list">
      <h2>Credentials ({credentials.length})</h2>
      <div className="card-grid">
        {credentials.map((credential: Credential) => (
          <CredentialCard
            key={credential.id}
            id={credential.id}
            loginUrl={credential.loginUrl}
            username={credential.username}
            passcode={credential.passcode}
          />
        ))}
      </div>
    </div>
  );
};

export default CredentialList;
