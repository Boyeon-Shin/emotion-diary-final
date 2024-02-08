import React from "react";
import "./EmotionItem.css";

const EmotionItem = ({ id, img, name, onClick, isSelected }) => {  // 아이디, 주소, 이름, 동작 이벤트 핸들러, 선택 여부
    const handleOnClick = () => {
        onClick(id);
    };

    return (
        <div
            className={[
                "EmotionItem",
                isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`, // isSelected 값에 따라 다른 스타일 규칙 적용
            ].join(" ")}
            onClick={handleOnClick}
        >
            <img alt={`emotion${id}`} src={img} />
            <span>{name}</span>
        </div>
    );
};
export default React.memo(EmotionItem);