import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

interface Props {
    searchId: string;
    setSearchId: React.Dispatch<React.SetStateAction<string>>;
}

const StyledTextField = styled(TextField)({
    boxShadow: '0.2rem 1rem 1rem rgba(0, 0, 0, 0.1)',
    width: '30rem',
    margin: '0rem 0 1rem 0',
    '& input': {
        fontSize: 32,
    },
});

const SearchInput: React.FC<Props> = ({ searchId, setSearchId }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchId(e.target.value);
    };

    return (
        <StyledTextField
            type="number"
            value={searchId === '0' ? '' : searchId}
            onChange={handleInputChange}
            placeholder="Search color by id"
        />
    );
};

export default SearchInput;
