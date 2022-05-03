import type { Extension } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

import { isMenuHotkey, MENU_TRIGGER_CHARACTERS, shouldShowMenuButton } from './lib';

const FLOATING_ADD_MENU_EXTENSION_ID = 'FloatingAddMenuExtension';

function isTriggerInput(event: KeyboardEvent) {
    return MENU_TRIGGER_CHARACTERS.some((tiggerKey) =>
        isHotkey(tiggerKey, { byKey: true }, event.nativeEvent),
    );
}

export function FloatingAddMenuExtension(toggleMenu: (open?: boolean) => void): Extension {
    return {
        id: FLOATING_ADD_MENU_EXTENSION_ID,
        onKeyDown(event, editor) {
            if (isMenuHotkey(event) && shouldShowMenuButton(editor)) {
                event.preventDefault();
                event.stopPropagation();
                toggleMenu();
                return;
            }

            if (isTriggerInput(event) && shouldShowMenuButton(editor)) {
                toggleMenu();
                return;
            }
        },
    };
}
