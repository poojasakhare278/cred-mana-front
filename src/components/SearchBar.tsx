import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCredentials } from '../features/credentials/credentialsSlice';
import CredentialCard from './CredentialCard';
import '../styles/SearchBar.scss';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const credentials = useSelector(selectCredentials);

  const filteredCredentials = credentials.filter((credential) =>
    credential.loginUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("filteredCredentials", filteredCredentials)
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by Login URL..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="credential-list">
      <div className="card-grid">
        
        {filteredCredentials.map((credential) => (
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
    </div>
  );
};

export default SearchBar;
