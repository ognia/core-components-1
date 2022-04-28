import React, { FC, MouseEvent, useMemo } from 'react';
import cn from 'classnames';
import { IconButton } from '@alfalab/core-components-icon-button';
import { Button } from '@alfalab/core-components-button';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import { ChevronBackMIcon } from '@alfalab/icons-glyph/ChevronBackMIcon';
import { formatPeriod, getYearSelectorValue, shiftValues } from './utils';

import styles from './index.module.css';
import { monthName } from '../../utils';

export type PeriodType = 'range' | 'day' | 'week' | 'month' | 'quarter' | 'year';

export type PeriodSliderProps = {
    /**
     * Активная дата или период
     */
    value?: Date | [Date, Date];

    /**
     * Тип периода
     */
    periodType?: PeriodType;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Отключает кнопку назад
     */
    prevArrowDisabled?: boolean;

    /**
     * Отключает кнопку вперед
     */
    nextArrowDisabled?: boolean;

    /**
     * Скрывает заблокированные кнопки
     */
    hideDisabledArrows?: boolean;

    /**
     * Возможность выбора месяца и года, если periodType 'month'
     */
    isMonthAndYearSelectable?: boolean;

    /**
     * Отображать ли текущий год, если isMonthAndYearSelectable true
     */
    showCurrentYearSelector?: boolean;

    /**
     * Функция для форматирование выбранного периода
     */
    periodFormatter?: (valueFrom: Date, valueTo: Date, periodType: PeriodType) => string;

    /**
     * Обработчик нажатия кнопки переключения на назад
     */
    onPrevArrowClick?: (
        event: MouseEvent<HTMLButtonElement>,
        payload: {
            value: Date;
            valueFrom: Date;
            valueTo: Date;
            periodType: PeriodType;
        },
    ) => void;

    /**
     * Обработчик нажатия кнопки переключения на вперед
     */
    onNextArrowClick?: (
        event: MouseEvent<HTMLButtonElement>,
        payload: {
            value: Date;
            valueFrom: Date;
            valueTo: Date;
            periodType: PeriodType;
        },
    ) => void;

    /**
     * Обработчик нажатия на селектор месяца
     */
    onMonthClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик нажатия на селектор года
     */
    onYearClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const PeriodSlider: FC<PeriodSliderProps> = ({
    value,
    periodType = 'month',
    className,
    periodFormatter = formatPeriod,
    prevArrowDisabled = false,
    nextArrowDisabled = false,
    hideDisabledArrows = false,
    isMonthAndYearSelectable = false,
    showCurrentYearSelector = false,
    onPrevArrowClick = () => null,
    onNextArrowClick = () => null,
    onMonthClick,
    onYearClick,
    dataTestId,
}) => {
    const [valueFrom, valueTo] = useMemo(() => {
        let from: Date;
        let to: Date;

        if (!value) return [undefined, undefined];

        if (Array.isArray(value)) {
            [from, to] = value;
        } else {
            [from, to] = [value, value];

            if (periodType === 'week') {
                from = startOfWeek(from, { weekStartsOn: 1 });
                to = endOfWeek(from, { weekStartsOn: 1 });
            }
        }

        return [from, to];
    }, [periodType, value]);

    const yearSelectorValue = useMemo(() => {
        return valueFrom ? getYearSelectorValue(valueFrom, showCurrentYearSelector) : '';
    }, [showCurrentYearSelector, valueFrom]);

    const showArrow = (direction: 'prev' | 'next') => {
        if (hideDisabledArrows) {
            const disabled = direction === 'prev' ? prevArrowDisabled : nextArrowDisabled;
            return !disabled && valueFrom;
        }

        return true;
    };

    const handleNextArrowClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (!valueFrom || !valueTo) return;

        const newValues = shiftValues(valueFrom, valueTo, periodType, 'next');

        onNextArrowClick(event, {
            value: newValues.valueFrom,
            valueFrom: newValues.valueFrom,
            valueTo: newValues.valueTo,
            periodType,
        });
    };

    const handlePrevArrowClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (!valueFrom || !valueTo) return;

        const newValues = shiftValues(valueFrom, valueTo, periodType, 'prev');

        onPrevArrowClick(event, {
            value: newValues.valueFrom,
            valueFrom: newValues.valueFrom,
            valueTo: newValues.valueTo,
            periodType,
        });
    };

    return (
        <div
            className={cn(styles.component, className)}
            aria-live='polite'
            data-test-id={dataTestId}
        >
            {showArrow('prev') && (
                <IconButton
                    size='xs'
                    className={styles.arrow}
                    icon={ChevronBackMIcon}
                    onClick={handlePrevArrowClick}
                    disabled={prevArrowDisabled || !valueFrom}
                    aria-label='Предыдущий период'
                />
            )}

            {/* eslint-disable-next-line no-nested-ternary */}
            {valueFrom && valueTo ? (
                periodType === 'month' && isMonthAndYearSelectable ? (
                    <span className={styles.period}>
                        <Button view='ghost' size='l' onClick={onMonthClick}>
                            {monthName(valueFrom)}
                        </Button>
                        {yearSelectorValue && (
                            <Button
                                className={styles.yearSelectorButton}
                                view='ghost'
                                size='l'
                                onClick={onYearClick}
                            >
                                {yearSelectorValue}
                            </Button>
                        )}
                    </span>
                ) : (
                    <span className={styles.period}>
                        {periodFormatter(valueFrom, valueTo, periodType)}
                    </span>
                )
            ) : (
                <span className={cn(styles.period, styles.empty)}>Укажите период</span>
            )}

            {showArrow('next') && (
                <IconButton
                    size='xs'
                    className={styles.arrow}
                    icon={ChevronBackMIcon}
                    onClick={handleNextArrowClick}
                    disabled={nextArrowDisabled || !valueFrom}
                    aria-label='Следующий период'
                />
            )}
        </div>
    );
};
