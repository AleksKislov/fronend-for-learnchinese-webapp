import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, addDislike, loadPost } from "../../actions/posts";

const Post = ({ post, addLike, addDislike }) => {
  const { text, name, avatar, date, title, _id, tag, comments_id, likes, dislikes } = post;
  const tagTheme = {
    wish: "Пожелание",
    bug: "Недочет на Сайте",
    news: "Новости Проекта"
  };

  const dateAndTime = dateToStr(date);
  const badgeColor = tag === "news" ? "info" : tag === "bug" ? "danger" : "success";

  return (
    <div className='card my-2'>
      <div className='card-body' style={customStyle}>
        <div>
          <img className='mr-3' src={`https:${avatar}`} style={imgStyle} alt='Avatar' />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <h4 className='card-title'>{title}</h4>
            <span className={`mx-2 badge badge-${badgeColor}`}>{tagTheme[tag]}</span>
          </div>
          <h6 className='card-subtitle mb-2 text-muted'>
            {name} | <em>{dateAndTime}</em>
          </h6>
          <p className='card-text' dangerouslySetInnerHTML={{ __html: text }}></p>
          <div className=''>
            <button className='btn btn-light mb-1' onClick={() => addLike(_id)}>
              <i className='fas fa-thumbs-up'></i> {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button className='btn btn-light mx-2 mb-1' onClick={() => addDislike(_id)}>
              <i className='fas fa-thumbs-down'></i>{" "}
              {dislikes.length > 0 && <span>{dislikes.length}</span>}
            </button>
            <Link to={`/posts/${_id}`}>
              <button className='btn btn-outline-info mb-1'>
                Комментарии {comments_id.length > 0 && <span>{comments_id.length}</span>}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const dateToStr = date => {
  const str = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const rusDate = str.toLocaleDateString("ru-RU", options); // 22 авг. 2020 г.
  return `${rusDate}, ${date.slice(11, 16)}`;
};

const imgStyle = {
  width: "40px",
  borderRadius: "8px"
};

const customStyle = {
  display: "flex"
};

export default connect(null, { addDislike, addLike })(Post);
