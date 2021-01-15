/** @jsx jsx */
import { useRef, useState, useEffect } from "react";
import { css, jsx } from "@emotion/react";
import Slide from "./Slide";
import SliderContent from "./SliderContent";
import Arrow from "./Arrow";
import Dots from "./Dots";
import focusIcon from "../../assets/focus-icon.png";

/**
 * @function Slider
 */
const Slider = (props) => {
  const sliderRef = useRef(null);
  const transition = 0.45;
  const [sliderWidth, setSliderWidth] = useState(null);
  const [translate, setTranslate] = useState(0);

  const {
    slides,
    toggleFullScreen,
    fullScreenMode,
    updateActiveIndex,
    activeIndex,
  } = props;

  useEffect(() => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      setSliderWidth(sliderWidth);
      if (activeIndex !== 0) {
        setTranslate(activeIndex * sliderWidth);
      }
    }
  }, []);

  useEffect(() => {
    if (sliderWidth) setTranslate(activeIndex * sliderWidth);
  }, [activeIndex]);

  // ########## TASK: trigger rerender of Window resize < 990px ###########

  const preventClose = (e) => {
    if (fullScreenMode) e.stopPropagation();
  };

  const nextSlide = (e) => {
    preventClose(e);
    if (activeIndex === slides.length - 1) {
      return updateActiveIndex(0);
    }
    updateActiveIndex(activeIndex + 1);
  };

  const prevSlide = (e) => {
    preventClose(e);
    if (activeIndex === 0) {
      return updateActiveIndex(slides.length - 1);
    }
    updateActiveIndex(activeIndex - 1);
  };

  return (
    <div id='slider' ref={sliderRef} css={SliderCSS}>
      {sliderWidth && (
        <SliderContent
          translate={translate}
          transition={transition}
          width={sliderWidth * slides.length}
        >
          {slides.map((slide, i) => (
            <Slide
              key={slide + i}
              content={slide}
              preventClose={preventClose}
            />
          ))}
        </SliderContent>
      )}
      <Arrow
        fullScreenMode={fullScreenMode}
        direction='left'
        handleClick={prevSlide}
      />
      <Arrow
        fullScreenMode={fullScreenMode}
        direction='right'
        handleClick={nextSlide}
      />
      <Dots slides={slides} activeIndex={activeIndex} />
      {!fullScreenMode && (
        <div css={FocusIconCSS}>
          <img
            style={{ width: "15px", height: "15px" }}
            src={focusIcon}
            onClick={() => toggleFullScreen(activeIndex)}
          />
        </div>
      )}
    </div>
  );
};

const SliderCSS = css`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
`;

const FocusIconCSS = css`
  position: absolute;
  display: flex;
  bottom: 20px;
  right: 20px;
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  background: #e2e2e2;
  transition: transform ease-in 0.1s;
  &:hover {
    transform: scale(1.1);
  }
  img {
    &:focus {
      outline: 0;
    }
  }
`;

export default Slider;
