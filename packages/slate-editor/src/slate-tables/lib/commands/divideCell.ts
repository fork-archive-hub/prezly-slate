import type { Location } from 'slate';
import { Editor } from 'slate';
import { Transforms } from 'slate';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import type { CellSides } from '../utils/types';

export function divideCell(
    editor: Editor,
    location: Location | undefined = editor.selection ?? undefined,
    side: CellSides,
) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);

    if (!traverse) {
        return false;
    }

    const { activeCell } = traverse;

    if (side === 'above' || side === 'bellow') {
        const currentRowSpan = TableCellNode.getCellRowspan(activeCell.node);

        if (currentRowSpan <= 1) {
            return false;
        }

        if (side === 'above') {
            Transforms.removeNodes(editor, { at: activeCell.nodePath });
            Transforms.insertNodes(
                editor,
                [TableCellNode.createTableCellNode(editor, { ...activeCell.node, rowspan: 1 })],
                {
                    at: activeCell.nodePath,
                },
            );

            const at = activeCell.cellBelow?.virtualPathWithRow;

            Transforms.insertNodes(
                editor,
                [
                    TableCellNode.createTableCellNode(
                        editor,
                        {
                            ...activeCell.node,
                            rowspan: TableCellNode.calculateCellRowSpan(activeCell.node, '-', 1),
                        },
                        activeCell.node.children,
                    ),
                ],
                {
                    at,
                },
            );

            editor.focusEditor(editor);
        } else {
            TableCellNode.update(
                editor,
                {
                    rowspan: TableCellNode.calculateCellRowSpan(activeCell.node, '-', 1),
                },
                activeCell.nodePath,
            );

            Transforms.insertNodes(
                editor,
                [TableCellNode.createTableCellNode(editor, { ...activeCell.node, rowspan: 1 })],
                {
                    at: activeCell.cellBelowReal?.cellAbove?.virtualPathWithRow,
                },
            );

            editor.focusEditor(editor);
        }
    }

    if (side === 'left' || side === 'right') {
        const otherCell = side === 'left' ? activeCell.cellLeft : activeCell.cellRight;

        if (!otherCell) {
            return false;
        }

        if (activeCell.compareHeight(otherCell) !== 0) {
            return false;
        }

        if (side === 'left') {
            const endOfLeftCell = Editor.end(editor, otherCell.nodePath);
            Transforms.insertNodes(editor, activeCell.node.children, { at: endOfLeftCell });

            TableCellNode.update(
                editor,
                {
                    colspan: TableCellNode.calculateCellColSpan(
                        otherCell.node,
                        '+',
                        TableCellNode.getCellColspan(activeCell.node),
                    ),
                },
                otherCell.nodePath,
            );

            editor.focusEditor(editor);

            Transforms.removeNodes(editor, { at: activeCell.nodePath });
        } else {
            const endOfActiveCell = Editor.end(editor, activeCell.nodePath);
            Transforms.insertNodes(editor, otherCell.node.children, { at: endOfActiveCell });

            TableCellNode.update(
                editor,
                {
                    colspan: TableCellNode.calculateCellColSpan(
                        activeCell.node,
                        '+',
                        TableCellNode.getCellColspan(otherCell.node),
                    ),
                },
                activeCell.nodePath,
            );

            editor.focusEditor(editor);

            Transforms.removeNodes(editor, { at: otherCell.nodePath });
        }
    }

    return false;
}
