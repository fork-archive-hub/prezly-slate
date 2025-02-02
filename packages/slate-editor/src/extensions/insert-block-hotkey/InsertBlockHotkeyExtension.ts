import type { Extension } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import { noop } from 'lodash-es';
import type { Editor, Element } from 'slate';

import { insertBlockAbove, insertBlockBelow } from './lib';

export const EXTENSION_ID = InsertBlockHotkeyExtension.name;

const isModEnter = isHotkey('mod+enter');
const isShiftModEnter = isHotkey('shift+mod+enter');

interface Parameters {
    createDefaultElement: (props?: Partial<Element>) => Element;
    onInserted?: (editor: Editor) => void;
}

export function InsertBlockHotkeyExtension({
    createDefaultElement,
    onInserted = noop,
}: Parameters): Extension {
    return {
        id: EXTENSION_ID,
        onKeyDown: (event, editor) => {
            if (isShiftModEnter(event) && insertBlockAbove(editor, createDefaultElement)) {
                event.preventDefault();
                onInserted(editor);
                return;
            }

            if (isModEnter(event) && insertBlockBelow(editor, createDefaultElement)) {
                event.preventDefault();
                onInserted(editor);
                return;
            }
        },
    };
}
