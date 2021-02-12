import { Editor, Element, NodeEntry, Path } from 'slate';

import { ListsOptions } from '../types';

import isListItem from './isListItem';

const getParentListItem = (
    options: ListsOptions,
    editor: Editor,
    listItemPath: Path,
): NodeEntry<Element> | null => {
    const parentListItem = Editor.above(editor, {
        at: listItemPath,
        match: (node) => node.type === options.listItemType,
    });

    if (parentListItem && isListItem(options, parentListItem[0])) {
        return parentListItem;
    }

    return null;
};

export default getParentListItem;
