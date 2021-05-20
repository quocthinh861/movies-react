import React from 'react';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import './Header.css';

const Header = () => {
    return (
        <span className='header' onClick={() => window.scroll(0, 0)}>
            Movies Theater <MovieFilterIcon style={{fontSize: 70, color: '#1E202A', marginLeft: '10px'}}/>
        </span>
    )
}

export default Header
