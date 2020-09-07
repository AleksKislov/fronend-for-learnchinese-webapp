import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import "moment/locale/ru";

const TextCard = ({ text }) => {
  const { title, pic_url, tags, length, description, level, date, name, comments_id, _id } = text;

  Moment.locale("ru");
  return (
    <div className='card my-2'>
      <div className='card-body row'>
        <Link to={`/texts/${_id}`}>
          <div style={{ position: "relative" }} className='col-md-3'>
            <img className='mr-3' src={`${pic_url}`} style={imgStyle} alt='Picture' />
            <div style={imgText}>蝴蝶</div>
          </div>
        </Link>
        <div className='col-md-6'>
          <Link to={`/texts/${_id}`}>
            <h4 className='card-title'>{title}</h4>
          </Link>
          <h6 className='card-subtitle mb-1 text-muted'>
            <em>{Moment(date).format("lll")}</em>
          </h6>
          <div className='mb-2'>
            <span className='text-muted'>Тэги: </span>
            {tags.map((tag, ind) => (
              <span key={ind} className='badge badge-pill badge-info ml-1'>
                {tag}
              </span>
            ))}
          </div>
          <h6 className='card-subtitle mb-2'>
            <span className='text-muted'>Автор: </span>
            {name}
          </h6>
          <h6 className='card-subtitle mb-2'>
            <span className='text-muted'>Уровень: </span>
            {level}
          </h6>
          <h6 className='card-subtitle mb-2'>
            <span className='text-muted'>Кол-во знаков: </span>
            {length}
          </h6>
          <p className='card-text'>{description}</p>

          <div className=''>
            <Link to={`/texts/${_id}`}>
              <button className='btn btn-outline-info'>
                Комментарии {comments_id.length > 0 && <span>{comments_id.length}</span>}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const imgStyle = {
  // width: "100%",
  borderRadius: "8px",
  opacity: "0.7"
};

const imgText = {
  fontSize: "2rem",
  color: "black",
  fontWeight: "bold",
  textShadow: "1px 1px 1px white, 2px 2px 1px white",
  position: "absolute",
  width: "5rem",
  // top: "85%",
  // left: "25%",
  // transform: "translate(-50%, -50%)"
  marginTop: "-3.5rem",
  marginLeft: "1rem"
};

export default TextCard;
