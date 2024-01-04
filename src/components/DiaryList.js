import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신 순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");

  // 최신순인지 오래된 순인지 if문으로 분기처리 후 정렬된 리스트를 반환
  const getProcessedDiaryList = () => {
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
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
