import React, { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import axios from "axios";
import RatingItem from "./RatingItem";

const ActiveUserTable = ({}) => {
  useEffect(() => {
    loadData();
  }, []);

  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const { data } = await axios.get("/api/texts/statistics");
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='row'>
      <div className='col-sm-3'>
        <div className='card bg-light mb-3'>
          <div className='card-body'>
            <h4 className='card-title'>Наши Герои</h4>
            <p className='card-text'>
              Эти герои делятся текстами и переводами с остальными читателями.
              <br />
              PS: Согласно этому рейтингу те, кто публикует новые тексты, будут получать
              определенные перки на сайте. Мы пока не придумали какие :)
            </p>
            <p className='card-text text-danger'>Таблица будет дополняться.</p>
          </div>
        </div>
      </div>

      <div className='col-sm-9'>
        <div class='table-responsive'>
          <table className='table table-hover text-center '>
            <thead>
              <tr className='table-info'>
                <th rowSpan='2' className='align-middle'>
                  Рейтинг
                </th>
                <th rowSpan='2' className='align-middle'>
                  Пользователь
                </th>
                <th colSpan='2'>Опубликовал</th>
              </tr>
              <tr className='table-info'>
                <th>Текстов</th>
                <th>Иероглифов</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((user, ind) => <RatingItem key={user.userid} user={user} ind={ind} />)
              ) : (
                <tr>
                  <td colSpan='4'>
                    <Spinner />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveUserTable;
