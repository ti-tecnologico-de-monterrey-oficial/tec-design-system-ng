import '../../../../../shared/assets/styles/components/_grade-value.scss';
import { truncateGradeValue } from '../../_shared/logic/components/grade-value';
import type { IBmbGradeType } from '../../_shared/types/components/grade-value';
import type { IBmbContrast } from '../../_shared/types/colors';

export interface BmbGradeValueProps {
  appearanceContrast?: IBmbContrast;
  type?: IBmbGradeType;
  score?: number | string;
}

export const BmbGradeValue = ({
  appearanceContrast = 'default',
  type = 'main-grade',
  score = 0,
}: BmbGradeValueProps) => {
  const classes = [
    'bmb_grade-value',
    appearanceContrast === 'primary' && 'bmb_grade-value-appearance-main',
    appearanceContrast === 'alternative' &&
      'bmb_grade-value-appearance-alternative',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {type === 'main-grade' ? (
        <svg
          className="bmb_grade-value-main"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          height="58px"
          width="50px"
          viewBox="0 0 485.688 485.688"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0}></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M364.269,453.155H121.416L0,242.844L121.416,32.533h242.853l121.419,210.312L364.269,453.155z M131.905,434.997h221.878 l110.939-192.152L353.783,50.691H131.905L20.966,242.844L131.905,434.997z" />
          <text alignmentBaseline="baseline" textAnchor="middle" transform="rotate(270,240,240)">
            <tspan className="bmb_grade-value-main-score" x={250} y={300}>
              {truncateGradeValue(score)}
            </tspan>
          </text>
        </svg>
      ) : (
        <div className="bmb_grade-value-partial">
          <span className="bmb_grade-value-partial-score">{score}</span>
        </div>
      )}
    </div>
  );
};
