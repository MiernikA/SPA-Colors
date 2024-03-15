import React, { useState, useEffect, useRef } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


interface Item {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
}
const theme = createTheme({
    typography: {
        fontFamily: [
            'Arial'
        ].join(','),
    },
});



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        background: '#3E4772',
        color: theme.palette.common.white,
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 600,
        height: '2rem',

    },
    [`&.${tableCellClasses.body}`]: {
        fontFamily: 'Arial Black',
        fontSize: 32,
        textTransform: 'capitalize',
        cursor: 'pointer',
        height: '8rem',
        textShadow: '0.05rem 0.05rem 0.2rem #fff',
        boxSizing: 'border-box',
        textAlign: 'center',
        padding: theme.spacing(3),


    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderTop: '0.5rem solid #e0e0ef',
    borderBottom: '0.5rem solid #f0f0ff',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        borderBottom: '0.5rem solid #3E4772',
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    height: '44.5rem',
    background: 'linear-gradient(to bottom, #f0f0ff, #e0e0ef)',
    overflow: 'hidden',
    boxShadow: '0 0.2rem 0.1rem 0.2rem rgba(0, 0, 0, 0.2)',

}));

const ModalContentWrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1rem',
    boxShadow: '0.2rem 1rem 1rem rgba(0, 0, 0, 1)',
    padding: theme.spacing(4),
}));





function ItemList({ items }: { items: Item[] }) {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleCloseModal();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOpenModal = (currentItem: Item) => {
        setSelectedItem(currentItem);
    };
    const handleCloseModal = () => {
        setSelectedItem(null);
    };


    return (
        <ThemeProvider theme={theme} >
            <StyledTableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ width: '20%' }}>ID</StyledTableCell>
                            <StyledTableCell style={{ width: '60%' }}>Name</StyledTableCell>
                            <StyledTableCell style={{ width: '20%' }}>Year</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <StyledTableRow
                                key={item.id}
                                style={{ backgroundColor: item.color }}
                                onClick={() => handleOpenModal(item)}
                            >
                                <StyledTableCell>{item.id}</StyledTableCell>
                                <StyledTableCell>{item.name}</StyledTableCell>
                                <StyledTableCell>{item.year}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>


            <Modal open={!!selectedItem} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description" >
                <div ref={modalRef}>
                    <ModalContentWrapper sx={{ border: `1rem solid ${selectedItem ? selectedItem.color : ''} ` }}>
                        <Typography variant="h6" component="h2" sx={{ textTransform: 'capitalize', fontSize: 40 }}>
                            {selectedItem ? `${selectedItem.id}. ${selectedItem.name}` : ''}
                        </Typography>
                        <hr />
                        <Typography sx={{ mt: 2, fontSize: 26 }}>
                            Color value in HEX : {selectedItem ? selectedItem.color : ''}<br />
                            Color pantone value : {selectedItem ? selectedItem.pantone_value : ''}<br />
                            Color year : {selectedItem ? selectedItem.year : ''}<br />
                        </Typography>
                    </ModalContentWrapper>
                </div>
            </Modal>
        </ThemeProvider >
    );
}

export default ItemList;
