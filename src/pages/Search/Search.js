import React from 'react'
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {
    const [type, setType] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [searchText, setSearchText] = React.useState('');
    const [content, setContent] = React.useState();
    const [numOfPages, setNumOfPages] = React.useState();
    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark', 
            primary: {
                main: '#fff'
            }
        },
    });

    const fetchSearch = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/search/${type ? 'movie' : 'tv'}?api_key=6ee6c42558d75845efae40fb542cf6c3&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
        const data = await response.json();
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display: 'flex', margin: "15px 0"}}>
                    <TextField
                        style={{flex: 1}}
                        label="Search"
                        variant="filled"
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}/>
                
                <Button variant="contained"style={{marginLeft: 10}} onClick={fetchSearch}><SearchIcon></SearchIcon></Button>
                </div>

                <Tabs value={type}
                      indicatorColor='primary'
                      textColor='primary'
                      onChange={(event, newValue) => {
                          setType(newValue);
                          setPage(1); 
                      }}>
                    <Tab style={{width: '50%'}} label='Search Movies'></Tab>
                    <Tab style={{width: '50%'}} label='Search TV series'></Tab>
                </Tabs>
            </ThemeProvider>
            <div>

                <div className='trending'>
                {
                    content && content.map((c) => {
                        return (
                            <SingleContent key={c.id} id={c.id} path={c.poster_path} title={c.title} date={c.release_date} vote_average={c.vote_average} media_type={type ? 'tv' : 'movie'} />
                        )
                    })
                }
                {
                    searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
                }
                </div>
                {
                    numOfPages > 1 && (
                        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                )}
            </div>
        </div>
    )
}

export default Search;