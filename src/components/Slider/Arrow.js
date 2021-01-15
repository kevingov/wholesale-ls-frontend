/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import leftArrow from "../../assets/left-arrow-icon.png";
import rightArrow from "../../assets/right-arrow-icon.png";

const Arrow = ({ direction, handleClick, fullScreenMode }) => {
  const arrowSize = fullScreenMode ? "50px" : "30px";
  return (
    <div
      onClick={(e) => handleClick(e)}
      css={css`
        display: flex;
        position: absolute;
        top: 50%;
        ${direction === "right" ? `right: 25px` : `left: 25px`};
        height: 30px;
        width: 30px;
        justify-content: center;
        opacity: 0.9;
        border-radius: 50%;
        cursor: pointer;
        align-items: center;
        transition: transform ease-in 0.1s;
        &:hover {
          transform: scale(1.1);
        }
        img {
          transform: translateX(${direction === "left" ? "-2" : "2"}px);
          &:focus {
            outline: 0;
          }
        }
      `}
    >
      {direction === "right" ? (
        <img
          alt='right arrow icon'
          style={{ width: arrowSize, height: arrowSize }}
          src={rightArrow}
        />
      ) : (
        <img
          alt='left arrow icon'
          style={{ width: arrowSize, height: arrowSize }}
          src={leftArrow}
        />
      )}
    </div>
  );
};

export default Arrow;
