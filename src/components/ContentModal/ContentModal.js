import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { img_500, unavailable } from '../../config/config'
import './ContentModal.css'
import YouTubeIcon from '@material-ui/icons/YouTube';
import Gallery from '../Carousel/Carousel';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    '&:hover': {
      backgroundColor: 'red'
    }
  }
}));

export default function ContentModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState({});
  const [video, setVideo] = React.useState();
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/${props.media_type}/${props.id}?api_key=6ee6c42558d75845efae40fb542cf6c3&language=en-US`);
    const data = await response.json();
    setContent(data);
  };

  const fetchVideo = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/${props.media_type}/${props.id}/videos?api_key=6ee6c42558d75845efae40fb542cf6c3&language=en-US`);
    const data = await response.json();
    setVideo(data.results ? (data.results[0] ? data.results[0].key : '' ) : '');
  };

  

  React.useEffect(() => {
     fetchData();
     fetchVideo();
  }, [content, video]);

  return (
    <div>
      <div onClick={handleOpen} className="media">
        {
            props.children
        }
        <div class='movie_over'>
          <h2>Overview</h2>
          <p>{props.overview}</p>
        </div>
      </div>
      <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
      >
        <Fade in={open}>
          {content && (
                <div className={classes.paper}>
                  <div className="ContentModal">
                    <img
                      src={
                        content.poster_path
                          ? `${img_500}/${content.poster_path}`
                          : unavailable
                      }
                      alt={content.name || content.title}
                      className="ContentModal__portrait"
                    />
                    <img
                      src={
                        content.backdrop_path
                          ? `${img_500}/${content.backdrop_path}`
                          : unavailable
                      }
                      alt={content.name || content.title}
                      className="ContentModal__landscape"
                    />
                    <div className="ContentModal__about">
                      <span className="ContentModal__title">
                        {content.name || content.title} (
                        {(
                          content.first_air_date ||
                          content.release_date ||
                          "-----"
                        ).substring(0, 4)}
                        )
                      </span>
                      {content.tagline && (
                        <i className="tagline">{content.tagline}</i>
                      )}

                      <span className="ContentModal__description">
                        {content.overview}
                      </span>
                      <div>
                        <Gallery media_type={props.media_type} id={props.id}/> 
                      </div>
                      <Button
                        className= {classes.button}
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch the Trailer
                      </Button>
                    </div>
                  </div>
                </div>
              )
            }
        </Fade>
      </Modal>
    </div>
  );
}