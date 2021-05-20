import React from 'react'
import './Trending.css'
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';


const Trending = () => {
    
    const [page, setPage] = React.useState(1);
    const [content, setContent] = React.useState([]);
    const [numOfPages, setNumOfPages] = React.useState();

    const fetchTrending = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=6ee6c42558d75845efae40fb542cf6c3&page=${page}`);
        const data = await response.json();
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    React.useEffect(() => {
        fetchTrending();
    }, [page]);

    return (
        <div>
            <span className='pageTitle'>Trending</span>
            <div className='trending'>
            {
                content && content.map((c) => {
                    return (
                        <SingleContent key={c.id} id={c.id} path={c.poster_path} title={c.title} date={c.release_date} vote_average={c.vote_average} media_type={c.media_type} />
                    )
                })
            }
            </div>
            {
                numOfPages > 1 && (
                    <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
            </div>
    )
}

export default Trending;