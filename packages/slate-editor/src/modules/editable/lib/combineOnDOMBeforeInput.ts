import type { Extension, OnDOMBeforeInput } from '@prezly/slate-commons';
import type { ReactEditor } from 'slate-react';

export function combineOnDOMBeforeInput(
    editor: ReactEditor,
    extensions: Extension[],
    onDOMBeforeInputList: OnDOMBeforeInput[],
) {
    return function (event: Event) {
        onDOMBeforeInputList.forEach((onDOMBeforeInput) => {
            onDOMBeforeInput(event, editor);
        });

        extensions.forEach(({ onDOMBeforeInput }) => {
            onDOMBeforeInput?.(event, editor);
        });
    };
}
