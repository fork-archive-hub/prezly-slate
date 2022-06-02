import type { Extension, OnKeyDown } from '@prezly/slate-commons';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

export function combineOnKeyDown(
    editor: Editor,
    extensions: Extension[],
    onKeyDownList: OnKeyDown[],
) {
    return function (event: KeyboardEvent) {
        onKeyDownList.forEach((onKeyDown) => {
            onKeyDown(event, editor);
        });

        extensions.forEach(({ onKeyDown }) => {
            onKeyDown?.(event, editor);
        });
    };
}
