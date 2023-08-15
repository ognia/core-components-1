import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from 'react';

export type StyleColors = {
    default: {
        [key: string]: string;
    };
    inverted: {
        [key: string]: string;
    };
};

export type ComponentProps = {
    /**
     * Тип кнопки
     * @default secondary
     */
    view?:
        | 'accent'
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'outlined' // deprecated
        | 'filled' // deprecated
        | 'transparent' // deprecated
        | 'link'
        | 'ghost';

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Размер компонента
     * @default m
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

    /**
     * Растягивает компонент на ширину контейнера
     * @default false
     */
    block?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для спиннера
     */
    spinnerClassName?: string;

    /**
     * Выводит ссылку в виде кнопки
     */
    href?: string;

    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    Component?: ElementType;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Показать лоадер
     * @default false
     */
    loading?: boolean;

    /**
     * Не переносить текст кнопки на новую строку
     * @default false
     */
    nowrap?: boolean;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;

    /**
     * Основные стили компонента.
     */
    styles: { [key: string]: string };

    /**
     * Стили компонента для default и inverted режима.
     */
    colorStylesMap: StyleColors;
};

export type AnchorBaseButtonProps = ComponentProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export type NativeBaseButtonProps = ComponentProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type BaseButtonProps = Partial<AnchorBaseButtonProps | NativeBaseButtonProps>;

export type AnchorButtonProps = Omit<BaseButtonProps, 'styles' | 'colorStylesMap'> &
    AnchorHTMLAttributes<HTMLAnchorElement>;
export type NativeButtonProps = Omit<BaseButtonProps, 'styles' | 'colorStylesMap'> &
    ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = Partial<AnchorButtonProps | NativeButtonProps> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};