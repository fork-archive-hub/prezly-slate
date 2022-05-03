import type { ListsEditor, ListsSchema } from '@prezly/slate-lists';
import { ListType, withLists, withListsReact } from '@prezly/slate-lists';
import {
    BULLETED_LIST_NODE_TYPE,
    isHeadingNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
} from '@prezly/slate-types';
import type { Editor } from 'slate';

import { createParagraph } from '#modules/editor-v4-paragraphs';

const SCHEMA: ListsSchema = {
    isConvertibleToListTextNode(node) {
        return isParagraphNode(node) || isHeadingNode(node) || isQuoteNode(node);
    },
    isDefaultTextNode: isParagraphNode,
    isListNode(node, type?) {
        if (type === ListType.ORDERED) {
            return isListNode(node, NUMBERED_LIST_NODE_TYPE);
        }
        if (type === ListType.UNORDERED) {
            return isListNode(node, BULLETED_LIST_NODE_TYPE);
        }
        return isListNode(node);
    },
    isListItemNode,
    isListItemTextNode,
    createDefaultTextNode(props = {}) {
        return createParagraph(props);
    },
    createListNode(type: ListType = ListType.UNORDERED, { children } = {}) {
        return {
            type: type === ListType.ORDERED ? NUMBERED_LIST_NODE_TYPE : BULLETED_LIST_NODE_TYPE,
            children: children ?? [this.createListItemNode()],
        };
    },
    createListItemNode({ children } = {}) {
        return {
            type: LIST_ITEM_NODE_TYPE,
            children: children ?? [this.createListItemTextNode()],
        };
    },
    createListItemTextNode({ children } = {}) {
        return {
            type: LIST_ITEM_TEXT_NODE_TYPE,
            children: children ?? [{ text: '' }],
        };
    },
};

export function withListsFormatting<T extends Editor>(editor: T): T & ListsEditor {
    return withListsReact(withLists(SCHEMA)(editor));
}
