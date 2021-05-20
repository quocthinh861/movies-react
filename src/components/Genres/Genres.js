import { Chip } from '@material-ui/core';
import  React from 'react'

const Genres = (props) => {

    const handleAdd = (genre) => {
        props.setSelectedGenres([...props.selectedGenres, genre]);
        props.setGenres(props.genres.filter(c => c.id !== genre.id));
        props.setPage(1);
    };

    const handleRemove = (genre) => {
        props.setGenres([...props.genres, genre]);
        props.setSelectedGenres(props.selectedGenres.filter(c => c.id !== genre.id));
        props.setPage(1); 
    };

    const fetchGenres = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/genre/${props.type}/list?api_key=6ee6c42558d75845efae40fb542cf6c3&language=en-US`);
        const data = await response.json();
        props.setGenres(data.genres);
    }

    React.useEffect(() => {
        fetchGenres();
        return () => {
            props.setGenres([]);
        };
    }, []);
    
    return (
        
        <div>
            {
                props.selectedGenres.map(c => {
                    return <Chip clickable
                                 color='primary'
                                 size='small'
                                 style={{margin: 2}}
                                 label={c.name} key={c.id} 
                                 onDelete={() => handleRemove(c)}/>
                })
            }
            {
                props.genres.map(c => {
                    return <Chip clickable
                                 size='small'
                                 style={{margin: 2}}
                                 label={c.name} key={c.id} 
                                 onClick={() => handleAdd(c)}/>
                })
            }
            
        </div>
    )
}

export default Genres
