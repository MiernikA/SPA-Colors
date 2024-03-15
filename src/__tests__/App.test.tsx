import React from 'react';
import App from '../App';
import { render, fireEvent, waitFor, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for custom matchers

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({
    "page": 1,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [
      { "id": 1, "name": "cerulean", "year": 2000, "color": "#98B2D1", "pantone_value": "15-4020" },
      { "id": 2, "name": "fuchsia rose", "year": 2001, "color": "#C74375", "pantone_value": "17-2031" },
      { "id": 3, "name": "true red", "year": 2002, "color": "#BF1932", "pantone_value": "19-1664" },
      { "id": 4, "name": "aqua sky", "year": 2003, "color": "#7BC4C4", "pantone_value": "14-4811" },
      { "id": 5, "name": "tigerlily", "year": 2004, "color": "#E2583E", "pantone_value": "17-1456" },
      { "id": 6, "name": "blue turquoise", "year": 2005, "color": "#53B0AE", "pantone_value": "15-5217" }
    ],
    "support": { "url": "https://reqres.in/#support-heading", "text": "To keep ReqRes free, contributions towards server costs are appreciated!" }
  }),
  ok: true,
});

console.error = jest.fn();

test('App render', async () => {
  render(<App />);
});

test('App renders pagination navigation bar, color table, and search input', async () => {
  const { container } = render(<App />);
  const paginationNavBar = container.querySelector('.MuiStack-root');
  const colorTable = container.querySelector('.MuiTableContainer-root');
  const searchInput = container.querySelector('.MuiInputBase-input') as HTMLInputElement;

  await waitFor(() => {
    expect(paginationNavBar).toBeInTheDocument();
    expect(colorTable).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });
});

test('Search input updates its value correctly', async () => {
  const { container } = render(<App />);

  const searchInput = container.querySelector('.MuiInputBase-input') as HTMLInputElement;
  if (searchInput) {
    fireEvent.change(searchInput, { target: { value: '1' } });
    expect(searchInput.value).toBe('1');
    fireEvent.change(searchInput, { target: { value: 'abc' } });
    expect(searchInput.value).toBe('');
  }
});

describe('Search functionality', () => {
  let getByText: Function;
  let container: HTMLElement;
  let searchInput: HTMLInputElement;
  let queryByText: Function;

  beforeEach(() => {
    const renderResult = render(<App />);
    getByText = renderResult.getByText;
    queryByText = renderResult.queryByText;
    container = renderResult.container;
    searchInput = container.querySelector('.MuiInputBase-input') as HTMLInputElement;
  });

  test('Search for a color (1/3)', async () => {
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: '1' } });
      await waitFor(() => {
        const fsColor = getByText('cerulean');
        expect(fsColor).toBeInTheDocument();
      });
    }
  });

  test('Search for a color (2/3)', async () => {
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: '5' } });
      await waitFor(() => {
        const scColor = getByText('tigerlily');
        expect(scColor).toBeInTheDocument();
      });
    }
  });

  test('Search for a color (3/3 - counterexample)', async () => {
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: '2' } });
      await waitFor(() => {
        const thColor = queryByText('cerulean');
        expect(thColor).not.toBeInTheDocument();
      });
    }
  });
});


describe('Error handling', () => {
  let container: HTMLElement;
  let searchInput: HTMLInputElement;

  beforeEach(() => {
    const renderResult = render(<App />);
    container = renderResult.container;
    searchInput = container.querySelector('.MuiInputBase-input') as HTMLInputElement;
  });

  test('Displays error for invalid input (1/2)', async () => {
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: '999' } });
      const errorMsg = container.querySelector('.MuiAlert-colorError');
      expect(errorMsg).toBeInTheDocument();
    }
  });

  test('Displays error for negative input (2/2)', async () => {
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: '-1' } });
      const errorMsg = container.querySelector('.MuiAlert-colorError');
      expect(errorMsg).toBeInTheDocument();
    }
  });

});


test('Opens Modal on color click', async () => {
  const { container, getByText } = render(<App />);
  let searchInput = container.querySelector('.MuiInputBase-input') as HTMLInputElement;
  if (searchInput)
    fireEvent.change(searchInput, { target: { value: '' } });

  await waitFor(() => {
    const fsColor = getByText('cerulean');
    fireEvent.click(fsColor);
    const fsColorPValue = getByText(/15-4020/);
    expect(fsColorPValue).toBeInTheDocument();
  });


});

test('Navigates through pages correctly', async () => {
  const { container, getByText } = render(<App />);

  await waitFor(() => {
    const bcButton = container.getElementsByClassName('MuiPaginationItem-previousNext')[0];
    const fwButton = container.getElementsByClassName('MuiPaginationItem-previousNext')[1];
    fireEvent.click(fwButton);
    const colorOnSecondPage = getByText('blue turquoise');
    expect(colorOnSecondPage).toBeInTheDocument();
    fireEvent.click(bcButton);
    const colorOnFirstPage = getByText('cerulean');
    expect(colorOnFirstPage).toBeInTheDocument();
  });

});