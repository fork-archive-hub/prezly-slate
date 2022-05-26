import type { DeserializeHtml } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

import { detectMarks, parseSerializedElement } from './lib';
import { ElementType } from './types';

export function createDeserialize(parameters: { blocks: boolean }): DeserializeHtml {
    const deserialize: DeserializeHtml = {
        element: {
            [ElementType.BLOCK_QUOTE]: () => ({ type: PARAGRAPH_NODE_TYPE }),
            [ElementType.BULLETED_LIST]: () => ({ type: PARAGRAPH_NODE_TYPE }),
            [ElementType.HEADING_ONE]: () => ({ type: PARAGRAPH_NODE_TYPE }),
            [ElementType.HEADING_TWO]: () => ({ type: PARAGRAPH_NODE_TYPE }),
            [ElementType.LINK]: () => ({ type: PARAGRAPH_NODE_TYPE }),
            [ElementType.LIST_ITEM]: () => ({ type: PARAGRAPH_NODE_TYPE }),
            [ElementType.LIST_ITEM_TEXT]: () => ({ type: PARAGRAPH_NODE_TYPE }),
            [ElementType.NUMBERED_LIST]: () => ({ type: PARAGRAPH_NODE_TYPE }),
            BLOCKQUOTE: () => ({ type: PARAGRAPH_NODE_TYPE }),
            BR: () => ({ type: PARAGRAPH_NODE_TYPE }),
            H1: () => ({ type: PARAGRAPH_NODE_TYPE }),
            H2: () => ({ type: PARAGRAPH_NODE_TYPE }),
            H3: () => ({ type: PARAGRAPH_NODE_TYPE }),
            H4: () => ({ type: PARAGRAPH_NODE_TYPE }),
            H5: () => ({ type: PARAGRAPH_NODE_TYPE }),
            H6: () => ({ type: PARAGRAPH_NODE_TYPE }),
            LI: () => ({ type: PARAGRAPH_NODE_TYPE }),
            OL: () => ({ type: PARAGRAPH_NODE_TYPE }),
            UL: () => ({ type: PARAGRAPH_NODE_TYPE }),
        },
        leaf: {
            A: detectMarks,
            ABBR: detectMarks,
            ACRONYM: detectMarks,
            AUDIO: detectMarks,
            B: detectMarks,
            BDI: detectMarks,
            BDO: detectMarks,
            BIG: detectMarks,
            BR: detectMarks,
            BUTTON: detectMarks,
            CANVAS: detectMarks,
            CITE: detectMarks,
            CODE: detectMarks,
            DATA: detectMarks,
            DATALIST: detectMarks,
            DEL: detectMarks,
            DFN: detectMarks,
            EM: detectMarks,
            EMBED: detectMarks,
            I: detectMarks,
            IFRAME: detectMarks,
            IMG: detectMarks,
            INPUT: detectMarks,
            INS: detectMarks,
            KBD: detectMarks,
            LABEL: detectMarks,
            MAP: detectMarks,
            MARK: detectMarks,
            METER: detectMarks,
            NOSCRIPT: detectMarks,
            OBJECT: detectMarks,
            OUTPUT: detectMarks,
            PICTURE: detectMarks,
            PROGRESS: detectMarks,
            Q: detectMarks,
            RUBY: detectMarks,
            S: detectMarks,
            SAMP: detectMarks,
            SCRIPT: detectMarks,
            SELECT: detectMarks,
            SLOT: detectMarks,
            SMALL: detectMarks,
            SPAN: detectMarks,
            STRONG: detectMarks,
            SUB: detectMarks,
            SUP: detectMarks,
            SVG: detectMarks,
            TEMPLATE: detectMarks,
            TEXTAREA: detectMarks,
            TIME: detectMarks,
            U: detectMarks,
            TT: detectMarks,
            VAR: detectMarks,
            VIDEO: detectMarks,
            WBR: detectMarks,
        },
    };

    if (parameters.blocks) {
        Object.assign(deserialize.element ?? {}, {
            [ElementType.BLOCK_QUOTE]: createDeserializeElement(parseSerializedElement),
            [ElementType.BULLETED_LIST]: createDeserializeElement(parseSerializedElement),
            [ElementType.HEADING_ONE]: createDeserializeElement(parseSerializedElement),
            [ElementType.HEADING_TWO]: createDeserializeElement(parseSerializedElement),
            [ElementType.LIST_ITEM]: createDeserializeElement(parseSerializedElement),
            [ElementType.LIST_ITEM_TEXT]: createDeserializeElement(parseSerializedElement),
            [ElementType.NUMBERED_LIST]: createDeserializeElement(parseSerializedElement),
            BLOCKQUOTE: () => ({ type: ElementType.BLOCK_QUOTE }),
            DIV: (element: HTMLDivElement) => {
                if (element.parentNode?.nodeName === 'LI') {
                    return { type: ElementType.LIST_ITEM_TEXT };
                }

                return { type: PARAGRAPH_NODE_TYPE };
            },
            H1: () => ({ type: ElementType.HEADING_ONE }),
            H2: () => ({ type: ElementType.HEADING_TWO }),
            H3: () => ({ type: ElementType.HEADING_TWO }),
            H4: () => ({ type: ElementType.HEADING_TWO }),
            H5: () => ({ type: ElementType.HEADING_TWO }),
            H6: () => ({ type: ElementType.HEADING_TWO }),
            LI: () => ({ type: ElementType.LIST_ITEM }),
            OL: () => ({ type: ElementType.NUMBERED_LIST }),
            P: (element: HTMLParagraphElement) => {
                if (element.parentNode?.nodeName === 'LI') {
                    return { type: ElementType.LIST_ITEM_TEXT };
                }

                return { type: PARAGRAPH_NODE_TYPE };
            },
            UL: () => ({ type: ElementType.BULLETED_LIST }),
        });
    }

    return deserialize;
}
