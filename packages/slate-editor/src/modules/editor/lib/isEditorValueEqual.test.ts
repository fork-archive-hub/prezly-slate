import { withoutNodes } from '@prezly/slate-commons';
import { isQuoteNode } from '@prezly/slate-types';
import { createEditor as createSlateEditor } from 'slate';

import { createEditor } from '#modules/editor';

import { isEditorValueEqual } from './isEditorValueEqual';

describe('slate-editor - isEditorValueEqual', () => {
    it('should consider structural equality', () => {
        const editor = createEditor(createSlateEditor(), () => []);

        const a = [
            {
                type: 'paragraph',
                children: [{ text: 'Hello', bold: true }],
            },
        ];
        const b = [
            {
                children: [{ bold: true, text: 'Hello' }],
                type: 'paragraph',
            },
        ];

        expect(isEditorValueEqual(editor, a, b)).toBe(true);
    });

    it('should run pre-serialization cleanup from extensions', () => {
        const editor = createEditor(createSlateEditor(), () => [
            {
                id: 'PreSerializationCleanup',
                serialize: (nodes) => withoutNodes(nodes, isQuoteNode),
            },
        ]);

        const a = [
            { type: 'paragraph', children: [{ text: 'A wise man once said:' }] },
            { type: 'block-quote', children: [{ text: 'Hello' }] },
        ];
        const b = [{ type: 'paragraph', children: [{ text: 'A wise man once said:' }] }];

        expect(isEditorValueEqual(editor, a, b)).toBe(true);
    });
});
