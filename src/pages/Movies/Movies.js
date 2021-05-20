import React from 'react'
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres/Genres';
import useGenre from '../../hooks/useGenre'

const Trending = () => {
    const g = '1';
    const [page, setPage] = React.useState(1);
    const [content, setContent] = React.useState([]);
    const [numOfPages, setNumOfPages] = React.useState();
    const [selectedGenres, setSelectedGenres] = React.useState([]);
    const [genres, setGenres] =  React.useState([]);
    const genreForUrl = useGenre(selectedGenres);
    
    const fetchMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6ee6c42558d75845efae40fb542cf6c3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreForUrl}`);
        const data = await response.json();
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    React.useEffect(() => {
        fetchMovies();
    }, [page, genreForUrl]);

    return (
        
        <div >
            
            <span className='pageTitle'>Movie</span>
            <Genres type='movie'
                    selectedGenres={selectedGenres} 
                    genres={genres} 
                    setGenres={setGenres} 
                    setSelectedGenres={setSelectedGenres}
                    setPage={setPage}/>
            <div className='trending'>
            {
                content && content.map((c) => {
                    return (
                        <SingleContent key={c.id} id={c.id} path={c.poster_path} title={c.title} date={c.release_date} vote_average={c.vote_average} media_type='movie' />
                    )
                })
            }
            </div>
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        </div>
    )
}

export default Trending;