import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { type Location, type Point, Editor, Path, Transforms } from 'slate';

import { TablesEditor } from '../TablesEditor';

import { Traverse } from './Traverse';

export function onKeyDown(event: KeyboardEvent<Element>, editor: TablesEditor) {
    if (!editor.selection) {
        return;
    }

    let locationToSelect: Location | undefined = undefined;

    if (isHotkey('up', event)) {
        locationToSelect = onUpPress(editor);
    }

    if (isHotkey('down', event)) {
        locationToSelect = onDownPress(editor);
    }

    if (isHotkey('tab', event)) {
        locationToSelect = onTabPress(editor);
        event.preventDefault();
    }

    if (locationToSelect) {
        Transforms.select(editor, locationToSelect);
        event.stopPropagation();
        event.preventDefault();
    }
}

function onUpPress(editor: TablesEditor): Point | undefined {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell, matrix } = traverse;

    if (activeCell.row.isFirst) {
        return Editor.before(editor, matrix.path, { unit: 'block' });
    }

    const [, firstNodePath] = Editor.first(editor, activeCell.path);

    if (!Path.equals(editor.selection.anchor.path, firstNodePath)) {
        return undefined;
    }

    const { cellAbove } = activeCell;

    if (cellAbove) {
        return EditorCommands.findLeafPoint(
            editor,
            {
                path: cellAbove.path,
                offset: editor.selection.anchor.offset,
            },
            'lowest',
        );
    }

    return undefined;
}

function onDownPress(editor: TablesEditor): Point | undefined {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell, matrix } = traverse;

    if (activeCell.row.isLast) {
        return Editor.after(editor, matrix.path, { unit: 'block' });
    }

    const [, lastNodePath] = Editor.last(editor, activeCell.path);

    if (!Path.equals(editor.selection.anchor.path, lastNodePath)) {
        return undefined;
    }

    const { cellBelow } = activeCell;

    if (cellBelow) {
        return EditorCommands.findLeafPoint(
            editor,
            {
                path: cellBelow.path,
                offset: editor.selection.anchor.offset,
            },
            'highest',
        );
    }

    return undefined;
}

function onTabPress(editor: TablesEditor): Location | undefined {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell } = traverse;

    if (activeCell.row.isLast && activeCell.column.isLast) {
        TablesEditor.insertRowBelow(editor);
        return undefined;
    }

    return activeCell.nextCell?.path;
}
