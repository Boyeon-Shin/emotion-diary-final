import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";


const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  const goBack = () => { // 뒤로 가기 이벤트가 동작하는 함수
      navigate(-1);
  }
  const onSubmit = (data) => { // 작성 완료 버튼 클릭시 호출, data - 정보를 담은 객체
      const { date, content, emotionId } = data;
      onCreate(date, content, emotionId);
      navigate("/", { replace:true });
  };

  return (
      <div>
          <Header // 이벤트 핸들러로 goBack을 설정
              title={"새 일기 쓰기"}
              leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
          />
          <Editor onSubmit={onSubmit} />
      </div>
  );
};

export default New;