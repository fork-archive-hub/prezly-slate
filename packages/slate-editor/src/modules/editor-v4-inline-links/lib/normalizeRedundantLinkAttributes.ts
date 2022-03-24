import { EditorCommands } from '@prezly/slate-commons';
import type { LinkNode } from '@prezly/slate-types';
import { isLinkNode } from '@prezly/slate-types';
import type { Editor, Node, NodeEntry } from 'slate';

const shape: Record<keyof LinkNode, true> = {
    type: true,
    href: true,
    new_tab: true,
    children: true,
};

const ALLOWED_LINK_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantLinkAttributes(editor: Editor, [node, path]: NodeEntry<Node>) {
    if (isLinkNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_LINK_ATTRIBUTES,
        );
    }

    return false;
}
