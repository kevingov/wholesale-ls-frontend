/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const Slide = ({ content, preventClose }) => (
  <div id='slide-wrapper' css={SlideWrapperCSS}>
    <div
      onClick={preventClose}
      css={css`
        height: 100%;
        width: 100%;
        background-image: url("${content}");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        -webkit-backface-visibility: hidden;
      `}
    />
  </div>
);

const SlideWrapperCSS = css`
  height: 100%;
  width: 100%;
`;

export default Slide;
