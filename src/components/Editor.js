import "./Editor.css";
import { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { emotionList, getFormattedDate } from "../util";
import EmotionItem from "./EmotionItem";

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate(); // useNavigate 호출 시 클라이언트 사이드 렌더링 방식으로 페이지를 이동하는 함수 반환

    const [state, setState] = useState({ // 인수로 new Date를 전달해 오늘 날짜가 되도록 설정
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });
    const handleChangeDate = (e) => { // 날짜 변경 이벤트 핸들러
        setState({
            ...state,
            date: e.target.value,
        });
    };

    const handleChangeContent = (e) => { // 글상자의 이벤트 핸들러
        setState({
            ...state,
            content: e.target.value,
        });
    };

    const handleSubmit = () => { // 작성 완료 버튼의 이벤트 핸들러
        onSubmit(state);
    };

    const handleOnGoBack = () => { // 취소하기 버튼의 이벤트 핸들러
        navigate(-1);
    };

    const handleChangeEmotion = (emotionId) => { // 감정이미지 클릭 이벤트 핸들러
        setState({
            ...state,
            emotionId,
        });
    };

    useEffect(() => { // props로 받은 initData를 의존성 배열에 저장
        if (initData) { // falsy한 값 변화 없음 / truthy한 값이라면 if문 수행
            setState({ // initData와 동명의 프로퍼티 값으로 설정
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleChangeDate} />
                </div>
            </div>
            <div className="editor_section">
                {/* 감정 */}
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.id}
                            {...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input+wrapper">
                    <textarea placeholder="오늘은 어땠나요?" value={state.content} onChange={handleChangeContent} />
                </div>
            </div>
            <div className="editor_section">
                <Button text={"취소하기"} onClick={handleOnGoBack} />
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Editor;