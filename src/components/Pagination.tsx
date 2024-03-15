import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';

interface Props {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    updateURL: (page: number) => void;
}

const StyledPagination = styled(Pagination)({
    boxShadow: '0.2rem 1rem 1rem rgba(0, 0, 0, 0.1)',
    '& .MuiPaginationItem-root': {
        fontSize: 28,
        padding: '1.5rem 2rem',
    },

    '& .MuiPaginationItem-icon': {
        padding: '0.3rem 1rem',
    },
    '& .Mui-selected': {
        background: '#3E4772 !important',
        color: '#fff !important'
    },
});

const PaginationComponent: React.FC<Props> = ({ currentPage, setCurrentPage, totalPages, updateURL }) => {
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        updateURL(value);
    };

    return (
        <Stack spacing={2} direction="row" sx={{ marginTop: '1rem' }}>
            <StyledPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"

            />
        </Stack>
    );
};

export default PaginationComponent;
