import { EditorCommands } from '@prezly/slate-commons';
import type { VideoNode } from '@prezly/slate-types';
import { isVideoNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

const shape: Record<keyof VideoNode, true> = {
    type: true,
    uuid: true,
    url: true,
    oembed: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantVideoAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isVideoNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
