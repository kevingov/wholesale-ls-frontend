/** @jsx jsx */
import { useRef, useState, useEffect } from "react";
import { css, jsx } from "@emotion/react";
import Slide from "./Slide";
import SliderContent from "./SliderContent";
import Arrow from "./Arrow";
import Dots from "./Dots";

/**
 * @function Slider
 */
const Slider = (props) => {
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(null);
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
  });

  const { translate, transition, activeIndex } = state;

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, []);

  const nextSlide = () => {
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * sliderWidth,
    });
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (props.slides.length - 1) * sliderWidth,
        activeIndex: props.slides.length - 1,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * sliderWidth,
    });
  };

  return (
    <div id='slider' ref={sliderRef} css={SliderCSS}>
      {sliderWidth && (
        <SliderContent
          translate={translate}
          transition={transition}
          width={sliderWidth * props.slides.length}
        >
          {props.slides.map((slide, i) => (
            <Slide key={slide + i} content={slide} />
          ))}
        </SliderContent>
      )}

      <Arrow direction='left' handleClick={prevSlide} />
      <Arrow direction='right' handleClick={nextSlide} />

      <Dots slides={props.slides} activeIndex={activeIndex} />
    </div>
  );
};

const SliderCSS = css`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

export default Slider;
