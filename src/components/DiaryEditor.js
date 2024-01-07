import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

export const getStringDate = (date) => {
  let year = date.getFullYear();

  let month = date.getMonth() + 1;

  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const DiaryEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();
  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로 가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘 날짜 선택</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
