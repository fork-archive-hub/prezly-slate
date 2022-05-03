/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_NODE_TYPE, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import { createHyperscript, createText } from 'slate-hyperscript';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-p': {
                children?: ReactNode;
            };
            'h-placeholder-mention': {
                children?: ReactNode;
                key: string;
            };
        }
    }
}

export const jsx = createHyperscript({
    elements: {
        'h-p': { type: PARAGRAPH_NODE_TYPE },
        'h-placeholder-mention': { type: PLACEHOLDER_NODE_TYPE },
    },
    creators: {
        'h-text': createText,
    },
});
