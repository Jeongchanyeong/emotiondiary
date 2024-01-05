import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신 순" },
  { value: "oldest", name: "오래된 순" },
];

const emotionFilterList = [
  { value: "all", name: "모든 감정" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [emotionFilter, setEmotionFilter] = useState("all");

  // 최신순인지 오래된 순인지 if문으로 분기처리 후 정렬된 리스트를 반환
  const getProcessedDiaryList = () => {
    const filterCallback = (it) => {
      if (emotionFilter === "good") {
        return parseInt(it.emotion) <= 3;
      } else {
        return parseInt(it.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        // 문자열이 들어올 수 있기 때문에 parseInt 사용
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // 최신, 오래된 순으로 정렬하는데 배열내장함수 sort를 사용하게 되면 원본배열 자체가 정렬되기 떄문에깊은 복사를 통해 데이터를 붙여넣음
    // 배열인 diaryList를 문자열로 반환되어 JSON.parse를 통해 배열로 바뀌어 copyList에 저장
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      emotionFilter === "all"
        ? copyList
        : copyList.filter((it) => filterCallback(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          {/* 최신, 오래된 순 filter select */}
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          {/* 감정 filter select */}
          <ControlMenu
            value={emotionFilter}
            onChange={setEmotionFilter}
            optionList={emotionFilterList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("./new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content}
          {it.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
