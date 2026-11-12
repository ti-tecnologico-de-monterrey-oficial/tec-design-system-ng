import '../../../../../shared/assets/styles/components/_value-counter.scss';
import {
  defaultValueCounterFormatter,
  formatValueCounter,
  splitValueCounter,
} from '../../_shared/logic/components/value-counter';
import type { BmbValueCounterFormatter } from '../../_shared/types/components/value-counter';

export interface BmbValueCounterProps {
  label?: string;
  value?: string;
  progress?: string;
  textFormatSeparator?: string;
  textFormat?: BmbValueCounterFormatter;
}

export const BmbValueCounter = ({
  label = '',
  value = '',
  progress = '',
  textFormatSeparator = '',
  textFormat = defaultValueCounterFormatter,
}: BmbValueCounterProps) => {
  const separator = textFormatSeparator || '/';
  const formattedText = formatValueCounter(progress, value, textFormat);
  const { progress: progressValue, total: totalValue } = splitValueCounter(
    formattedText,
    separator,
  );

  return (
    <section
      className="bmb_value-counter"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--bmb-gap-xs)',
      }}
    >
      <h3 className="bmb_value-counter-label">{label}</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--bmb-gap-xs)',
        }}
      >
        {progressValue && (
          <>
            <span className="bmb_value-counter-progress">
              {progressValue}
            </span>
            <span className="bmb_value-counter-slash">{separator}</span>
          </>
        )}
        <span className="bmb_value-counter-value">{totalValue}</span>
      </div>
    </section>
  );
};
