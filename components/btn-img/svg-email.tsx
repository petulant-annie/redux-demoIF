import * as React from 'react';

interface ISvgEmailProps {
  fill: string;
}
const SvgEmail: React.SFC<ISvgEmailProps> = (props) => {
  return (
    <svg
      {...props}
      className="redirect-img"
    >
      <defs>
        <path
          id="mgk1a"
          // tslint:disable-next-line:max-line-length
          d="M487.154 630a3.85 3.85 0 0 1 3.846 3.846v7.692a3.85 3.85 0 0 1-3.846 3.847h-12.308a3.85 3.85 0 0 1-3.846-3.847v-7.692a3.85 3.85 0 0 1 3.846-3.846h12.308m-12.308 1.538c-.93 0-1.728.557-2.094 1.351l7.677 6.141c.337.27.806.27 1.141 0l7.678-6.14a2.308 2.308 0 0 0-2.094-1.352h-12.308m12.308 12.308a2.31 2.31 0 0 0 2.308-2.308v-6.85l-6.93 5.544a2.44 2.44 0 0 1-3.063 0l-6.93-5.544v6.85a2.31 2.31 0 0 0 2.307 2.308h12.308"
        />
        <path
          id="mgk1c"
          d="M461 621a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v34a3 3 0 0 1-3 3h-34a3 3 0 0 1-3-3z"
        />
        <clipPath id="mgk1b">
          <use xlinkHref="#mgk1a" />
        </clipPath>
      </defs>
      <image
        // tslint:disable-next-line:max-line-length
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAWUlEQVRYR+3SwQkAIAwEQdN/0bGI/YiM/wWZ3Ozunoff+GC8DsEIeAgSrAK1t0GCVaD2NkiwCtTeBglWgdrbIMEqUHsbJFgFam+DBKtA7W2QYBWovQ1+L3gByAWficgIGYEAAAAASUVORK5CYII="
        transform="translate(-461 -618)"
      />
      <g clipPath="url(#mgk1b)" transform="translate(-461 -618)" opacity="0.8">
        <use data-fill={true} xlinkHref="#mgk1c" />
      </g>
    </svg>
  );
};

export default SvgEmail;
