import { img_300, unavailable } from '../../config/config'
import './SingleContent.css'
import Badge from '@material-ui/core/Badge';
import ContentModal from '../ContentModal/ContentModal'
const SingleContent = (props) => {
    return (
        <ContentModal media_type={props.media_type} id={props.id} overview={props.overview} profile_path={props.profile_path}>
            <Badge badgeContent={props.vote_average} color={props.vote_average > 8 ? 'secondary' : 'primary'} />
            <img className='poster' src={ props.path ? ` ${img_300}/${props.path}` : unavailable }></img>
            <b className='title'>{props.title}</b>
            <span className='subTitle'>
                {props.media_type === 'tv' ? 'TV Series' : 'Movie'}
                <span className='subTitle'>{props.date}</span>
            </span>
        </ContentModal>
    )
}

export default SingleContent
