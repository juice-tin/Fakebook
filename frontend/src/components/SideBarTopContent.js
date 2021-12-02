import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import {useLocation, useHistory} from 'react-router-dom';

/**
 *
 * @return {object} JSX
 */
function SideBarTopContent() {
  const [search, setSearch] = React.useState('');
  const history = useHistory();
  const location = useLocation();

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const submitSearch = () => {
    const params = new URLSearchParams(location.search);
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    setSearch('');
    history.push(`${location.pathname}?${params.toString()}`);
  };

  const newListing = () => {
    console.log('Creating listings not supported');
  };

  return (
    <div>
      <TextField
        type='text'
        name='search field'
        placeholder='Search Marketplace'
        margin='normal'
        size='small'
        value={search}
        onInput={handleInputChange}
        sx={{ml: 1, mb: 1, width: '75%'}}
      />
      <Button
        variant='outlined'
        size='large'
        name='search'
        onClick={submitSearch}
        sx={{mt: 2, width: '20%'}}
      >
        <SearchIcon/>
      </Button>
      <Button
        variant='contained'
        name='new listing'
        onClick={newListing}
        sx={{ml: 1, mb: 1, width: '95%'}}
      >
        + Create New Listing
      </Button>
    </div>
  );
};

export default SideBarTopContent;
