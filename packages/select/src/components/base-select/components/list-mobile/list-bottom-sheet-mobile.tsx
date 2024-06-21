import React, { FC, ReactNode, RefObject } from 'react';

import { getDataTestId } from '@alfalab/core-components-shared';

import { useListBottomSheetMobileProps } from './hooks';

import mobileStyles from '../../mobile.module.css';

type ListMobileProps = {
    open: boolean;
    menuRef: RefObject<HTMLDivElement>;
    scrollableContainerRef: RefObject<HTMLDivElement>;
    closeMenu: () => void;
    handleEntered: (node: HTMLElement, isAppearing: boolean) => void;
    renderSearch: () => ReactNode;
    renderOptionsList: () => ReactNode;
} & ReturnType<typeof useListBottomSheetMobileProps>;

export const ListBottomSheetMobile: FC<ListMobileProps> = (props) => {
    const {
        BottomSheet,
        dataTestId,
        open,
        label,
        placeholder,
        footer,
        swipeable,
        showSearch,
        bottomSheetProps,
        menuRef,
        scrollableContainerRef,
        closeMenu,
        handleEntered,
        renderSearch,
        onScroll,
        renderOptionsList,
    } = props;

    if (BottomSheet) {
        return (
            <BottomSheet
                dataTestId={getDataTestId(dataTestId, 'bottom-sheet')}
                open={open}
                className={mobileStyles.sheet}
                contentClassName={mobileStyles.sheetContent}
                containerClassName={mobileStyles.sheetContainer}
                title={label || placeholder}
                actionButton={footer}
                stickyHeader={true}
                hasCloser={true}
                swipeable={swipeable}
                initialHeight={showSearch ? 'full' : 'default'}
                {...bottomSheetProps}
                sheetContainerRef={menuRef}
                scrollableContainerRef={scrollableContainerRef}
                onClose={() => {
                    closeMenu();
                    bottomSheetProps?.onClose?.();
                }}
                transitionProps={{
                    ...bottomSheetProps?.transitionProps,
                    onEntered: handleEntered,
                }}
                bottomAddons={
                    <React.Fragment>
                        {renderSearch()}
                        {bottomSheetProps?.bottomAddons}
                    </React.Fragment>
                }
                containerProps={{
                    ...bottomSheetProps?.containerProps,
                    onScroll,
                }}
            >
                {renderOptionsList()}
            </BottomSheet>
        );
    }

    return null;
};
