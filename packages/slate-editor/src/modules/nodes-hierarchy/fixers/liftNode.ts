import { Editor, Element, Path, Transforms } from 'slate';
import type { NodeEntry } from 'slate';

export function liftNode(editor: Editor, [, path]: NodeEntry, noParentSplit?: boolean) {
    const ancestor = Editor.above(editor, { at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    if (noParentSplit) {
        Transforms.moveNodes(editor, { at: path, to: Path.parent(path), voids: true });
    } else {
        Transforms.liftNodes(editor, { at: path, voids: true });
    }

    return true;
}
