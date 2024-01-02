const MyButton = ({ type, onClick, text }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
    // className을 배열로 만들어 type마다
  );
};

MyButton.defaultProps = {
  type: "defalt",
};

export default MyButton;
