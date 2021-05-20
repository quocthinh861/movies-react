const useGenre = (selectedGenres) => {
    if(selectedGenres.length < 1)
    {
        return "";
    }
    const GenreIds = selectedGenres.map(c => c.id);
    let result = '';
    for(let i = 0; i < GenreIds.length; i++)
    {
        if(i !=  GenreIds.length - 1)
            result += GenreIds[i] + ',';
        else 
            result += GenreIds[i];
    }
    return result; 
    /* **** Better way: **** 

    return GenreIds.reduce((acc, num) => acc + "," + num);
    
    */
};

export default useGenre;