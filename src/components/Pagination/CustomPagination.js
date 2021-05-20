import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


const CustomPagination = (props) => {

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark'
        },
        typography: {
            fontSize: 15,
        }
    });
    
    const handleChange = (page) => {
        props.setPage(page);
        window.scroll(0, 0);
    };
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 20,
        }}>
        <ThemeProvider theme={darkTheme}>
            <Pagination hideNextButton hidePrevButton onChange={(e) => handleChange(e.target.textContent)} count={props.numOfPages} color="primary"></Pagination>
        </ThemeProvider>
        </div>
    )
}

CustomPagination.defaultProps = {
    numOfPages: 10
}

export default CustomPagination
