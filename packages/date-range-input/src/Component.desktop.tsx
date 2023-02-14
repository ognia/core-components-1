import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';

import { DateRangeInput, DateRangeInputProps } from './components/date-range-input/Component';

export type DateRangeInputDesktopProps = Omit<DateRangeInputProps, 'view'>;

export const DateRangeInputDesktop = forwardRef<HTMLInputElement, DateRangeInputDesktopProps>(
    (props, ref) => <DateRangeInput {...props} ref={ref} />,
);
