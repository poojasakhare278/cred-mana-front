import React from 'react';
import SearchBar from '../components/SearchBar';
import '../styles/ViewCredentials.scss';
import { formatCount } from "../commons";
import { useSelector } from 'react-redux';
import { selectCredentials } from '../features/credentials/credentialsSlice';

const ViewCredentialsPage: React.FC = () => {
  const credentials = useSelector(selectCredentials);
  return (
    <div>
      <div className="countBagde">{`Credentials: ${formatCount(credentials.length)}`}</div>
        <SearchBar />
    </div>
  );
};

export default ViewCredentialsPage;
