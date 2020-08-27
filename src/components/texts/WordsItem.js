import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  removeWord,
  setModalWord,
  loadUserWordsLen,
  addWord,
  loadUserWords
} from "../../actions/userWords";

const WordsItem = ({
  removeWord,
  lexicon,
  hideFlag,
  setModalWord,
  loadUserWordsLen,
  loadUserWords,
  addWord
}) => {
  let { chinese, pinyin, translation, fromSearch } = lexicon;

  const [clicked, setClicked] = useState(false);

  const onClick = e => {
    if (!fromSearch) {
      const tagName = e.target.tagName;

      if (tagName !== "BUTTON") {
        removeWord(chinese);

        setTimeout(() => {
          loadUserWordsLen();
        }, 100);
      }
    }
  };

  let russian = translation
    .replace(/\[b\]\\\[o\\\]\d\[\/b\]/g, "")
    .replace(/\[b\]/g, "<span class='tippyBold'>")
    .replace(/\[\/b\]/g, "</span>")
    .replace(/\[c\]/g, "<span class='tippyColor'>")
    .replace(/\[\/c\]/g, "</span>")
    .replace(/\[p\]/g, "<span class='tippyColor tippyItalic'>")
    .replace(/\[\/p\]/g, "</span>")
    .replace(/\[i\]/g, "<span class='tippyItalic'>")
    .replace(/\[\/i\]/g, "</span>")
    .replace(/\[m1\]/g, "<span class='tippyParagraph'>")
    .replace(/\[m\d\]/g, "<span class='tippyExample'>")
    .replace(/\[\/m\]/g, "</span>")
    .replace(/\[\*\]\[ex\]/g, "<span class='tippyExs'>")
    .replace(/\[\/ex\]\[\/\*\]/g, "</span>")
    .replace(/\\\[(.{1,})\\\]/g, "($1)");

  if (russian.length > 2000) {
    const ind = russian.slice(800, russian.length).indexOf("<span class='tippyExample'>");
    russian = russian.slice(0, ind + 800);
  }

  const showModal = e => {
    lexicon.russian = lexicon.translation;
    setModalWord(lexicon);
  };

  const updateVocabulary = async () => {
    if (!clicked) {
      setClicked(true);
      await addWord({
        pinyin: lexicon.pinyin,
        russian: lexicon.translation,
        chinese: lexicon.chinese
      });
      setTimeout(() => {
        loadUserWords();
        loadUserWordsLen();
      }, 100);
    }
  };

  const moreButton = (
    <button
      className='btn btn-sm btn-warning'
      onClick={e => showModal(e)}
      data-toggle='modal'
      data-target='#exampleModal'
    >
      Больше
    </button>
  );

  return (
    <tr onClick={e => onClick(e)}>
      <td>
        <h4>{!hideFlag.chinese && chinese}</h4>
      </td>
      <td>{!hideFlag.pinyin && pinyin}</td>
      <td dangerouslySetInnerHTML={{ __html: !hideFlag.translation ? russian : "" }}></td>
      <td>{moreButton}</td>
      {fromSearch && (
        <td>
          <button className='btn btn-sm btn-info' onClick={e => updateVocabulary(e)}>
            {clicked ? <i className='fas fa-minus'></i> : <i className='fas fa-plus'></i>}
          </button>
        </td>
      )}
    </tr>
  );
};

WordsItem.propTypes = {
  lexicon: PropTypes.object.isRequired,
  removeWord: PropTypes.func.isRequired
  // loadLengths: PropTypes.func.isRequired
};

export default connect(null, {
  removeWord,
  setModalWord,
  loadUserWordsLen,
  addWord,
  loadUserWords
})(WordsItem);
