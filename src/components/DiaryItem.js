const DiaryItem = ({ id, emotion, content, date }) => {
  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_ing_wrapper",
          `emotion_ing_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DiaryItem;
