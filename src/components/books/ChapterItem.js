import React from "react";
import { Link } from "react-router-dom";

const ChapterItem = ({ chapter, ind, bookId }) => {
  const { chineseTitle, russianTitle, chapterId } = chapter;

  const onClick = async e => {};

  return (
    <tr onClick={e => onClick(e)}>
      <td>{ind + 1}</td>
      <td>{chineseTitle}</td>
      <td>
        <Link to={`/books/${bookId}/${chapterId}/0`}>{russianTitle}</Link>
      </td>
    </tr>
  );
};

export default ChapterItem;
