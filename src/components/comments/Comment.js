import React from "react";
import { connect } from "react-redux";
import { setCommentToDelete } from "../../actions/comments";
import { dateToStr, addressToUser } from "../../actions/helpers";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

const Comment = ({ comment, currentUser, isAuthenticated, setCommentToDelete }) => {
  const { avatar, text, name, date, user, _id } = comment;
  const dateAndTime = dateToStr(date);

  // const addressToUser = () => {
  //   document.getElementById("textForm").value += `@@[${user}]{${name}}@@, `;
  // };

  return (
    <div className='card my-2' id={_id}>
      <div className='card-body' style={customStyle}>
        <div>
          <Tippy
            content='Кликните, чтобы обратиться к пользователю в комментарии'
            placement='bottom'
          >
            <img
              className='mr-3'
              src={`https:${avatar}`}
              style={imgStyle}
              alt='Avatar'
              onClick={() => addressToUser(user, name)}
            />
          </Tippy>
        </div>
        <div style={{ width: "100%" }}>
          {isAuthenticated && (currentUser._id === user || currentUser.role === "admin") && (
            <button
              className='btn btn-sm btn-danger float-right'
              data-toggle='modal'
              data-target='#confirmModal'
              onClick={e => setCommentToDelete(comment)}
            >
              <i className='fas fa-trash-alt'></i>
            </button>
          )}

          <p className='card-text' dangerouslySetInnerHTML={{ __html: text }}></p>
          <h6 className='card-subtitle mb-2 text-muted'>
            <Link to={`/user/${user}`}>{name}</Link> | <em>{dateAndTime}</em>
          </h6>
        </div>
      </div>
    </div>
  );
};

const imgStyle = {
  width: "40px",
  borderRadius: "8px"
};

const customStyle = {
  display: "flex"
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.user
});

export default connect(mapStateToProps, { setCommentToDelete })(Comment);
