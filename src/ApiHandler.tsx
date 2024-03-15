import React, { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemList from './components/ItemList';
import Pagination from './components/Pagination';
import SearchInput from './components/SearchInput';
import ErrorMessage from './components/ErrorMessage';

const DataContext = createContext<any[]>([]);
const DataProvider: React.FC<any> = ({ children }) => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async (page: number): Promise<void> => {
            try {
                const response = await fetch(`https://reqres.in/api/products?page=${page}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();

                setData(prevData => {
                    const newData = responseData.data.filter((item: any) => !prevData.some((prevItem: any) => prevItem.id === item.id));
                    return [...prevData, ...newData];
                });

                if (responseData.total_pages > page) {
                    await fetchData(page + 1);
                }
            } catch (error) {
                console.error(error);
                window.alert('There was an error fetching the data');
            }
        };
        fetchData(1);
    }, []);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};


function useDebouncedValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };

    }, [value, delay]);

    return debouncedValue;
}

function ApiHandler() {
    return (
        <DataProvider>
            <Main />
        </DataProvider>
    );
}

function Main() {
    const data = useContext(DataContext);
    const { id: idParam, pn: pageParam } = useParams<{ id?: string; pn?: string }>();
    const id_number = idParam === undefined ? '0' : idParam.split('=')[1];
    const page_number = pageParam === undefined ? '1' : pageParam.split('=')[1];

    const [currentPage, setCurrentPage] = useState<number>(parseInt(page_number));
    const [searchId, setSearchId] = useState<string>(id_number);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const itemsPerPage = 5;
    const noItemComm = 'Unfortunately, there is no color with such an ID.'

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorStatus, setErrorStatus] = useState<number>(0);

    const navigate = useNavigate();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.length > 0 ? searchResults.slice(indexOfFirstItem, indexOfLastItem) : data.slice(indexOfFirstItem, indexOfLastItem);
    const debouncedSearchId = useDebouncedValue(searchId, 500);


    useEffect(() => {

        if (id_number !== '0') setSearchId(id_number);
        setCurrentPage(parseInt(page_number));

    }, [idParam, pageParam, id_number, page_number]);



    useEffect(() => {
        navigate(`/page=${currentPage}`);
    }, [currentPage, navigate]);

    const updateURL = useCallback((newNumber: number) => {
        navigate(`/page=${newNumber}${searchId ? `/id=${searchId}` : ''}`);
    }, [navigate, searchId]);

    const handleSearch = useCallback(async () => {
        try {


            if (searchId !== '0') {

                if (searchId === '') {

                    setSearchResults([]);
                    setCurrentPage(1);
                    setCurrentPage(currentPage);
                    window.history.pushState(null, '', `/page=${currentPage}`);
                    return;
                }
                const response = await fetch(`https://reqres.in/api/products/${searchId}`);
                if (!response.ok) {

                    setCurrentPage(1);
                    setSearchId('');
                    setTimeout(() => {
                        setErrorMessage(noItemComm);
                        setErrorStatus(0);
                    }, 3000);
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }
                const responseData = await response.json();
                if (currentPage !== 1) updateURL(1);
                setCurrentPage(1);

                window.history.pushState(null, '', `/page=1/id=${searchId}`);
                setSearchResults([responseData.data]);
            }

        } catch (error) {
            console.error(error);
            setErrorMessage(noItemComm);
            setErrorStatus(1);
        }

    }, [searchId, currentPage, updateURL]);



    useEffect(() => {
        if (idParam) {
            setSearchId(id_number);
            handleSearch();
        }
    }, [idParam, id_number, handleSearch]);

    useEffect(() => {

        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchId]);
    return (
        <div>
            <SearchInput searchId={searchId} setSearchId={setSearchId} />


            <>
                <ItemList items={currentItems} />
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={Math.ceil((searchResults.length > 0 ? searchResults.length : data.length) / itemsPerPage)}
                    updateURL={updateURL}
                />
            </>

            <ErrorMessage message={errorMessage} status={errorStatus} />
        </div>
    );
}

export default ApiHandler;

