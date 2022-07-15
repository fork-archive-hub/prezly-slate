import { type NodeEntry, Editor, Element, Transforms } from 'slate';

import { isEqual, reject } from '#lodash';

import { EntryPointNode } from './EntryPointNode';

export type ElementFactory = (props?: Partial<Element>) => Element;

export function insertInitialEntryPoint(editor: Editor, [node, path]: NodeEntry): boolean {
    if (path.length === 0 && Editor.isEditor(node)) {
        const [firstNode] = node.children;
        if (!EntryPointNode.isEntryPoint(firstNode) && isInitialEntryPointRequired(editor)) {
            Transforms.insertNodes(editor, EntryPointNode.createEntryPoint(), { at: [0] });
            return true;
        }
    }
    return false;
}

export function deleteUnnecessaryInitialEntryPoint(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (path.length === 0 && Editor.isEditor(node)) {
        const [firstNode] = node.children;
        if (EntryPointNode.isEntryPoint(firstNode) && !isInitialEntryPointRequired(editor)) {
            console.log('Transforms.delete()', { at: [0] });
            Transforms.delete(editor, { at: [0] });
            return true;
        }
    }
    return false;
}

export function convertNonEmptyInitialEntryPoint(
    editor: Editor,
    [node, path]: NodeEntry,
    createDefaultTextElement: ElementFactory,
): boolean {
    if (EntryPointNode.isEntryPoint(node)) {
        if (node.children.length !== 1 || !isEqual(node.children, [{ text: '' }])) {
            Transforms.setNodes(editor, createDefaultTextElement(), {
                match: EntryPointNode.isEntryPoint,
                at: path,
            });
            return true;
        }
    }
    return false;
}

export function convertAdditionalEntryPoints(
    editor: Editor,
    [node, path]: NodeEntry,
    createDefaultTextElement: ElementFactory,
): boolean {
    if (Editor.isEditor(node)) {
        for (const [index, child] of node.children.entries()) {
            if (index > 0 && EntryPointNode.isEntryPoint(child)) {
                Transforms.setNodes(editor, createDefaultTextElement(), {
                    match: EntryPointNode.isEntryPoint,
                    at: [...path, index],
                });
                return true;
            }
        }
        return false;
    }
    return false;
}

export function deleteNestedInitialEntryPoint(editor: Editor, [node, path]: NodeEntry): boolean {
    if (path.length > 0 && Element.isElement(node)) {
        for (const [index, child] of node.children.entries()) {
            if (EntryPointNode.isEntryPoint(child)) {
                Transforms.delete(editor, {
                    at: [...path, index],
                });
                return true;
            }
        }
    }
    return false;
}

function isInitialEntryPointRequired(editor: Editor): boolean {
    const [firstNode] = reject(editor.children, EntryPointNode.isEntryPoint);

    return (
        Element.isElement(firstNode) && (editor.isRichBlock(firstNode) || editor.isVoid(firstNode))
    );
}
