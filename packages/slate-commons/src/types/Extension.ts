import type { Node } from 'slate';

import type { DecorateFactory } from './DecorateFactory';
import type { DeserializeHtml } from './DeserializeHtml';
import type { Normalize } from './Normalize';
import type { OnDOMBeforeInput } from './OnDOMBeforeInput';
import type { OnKeyDown } from './OnKeyDown';
import type { RenderElement } from './RenderElement';
import type { RenderLeaf } from './RenderLeaf';
import type { WithOverrides } from './WithOverrides';

export interface Extension {
    id: string;
    decorate?: DecorateFactory;
    deserialize?: DeserializeHtml;
    isInline?: (node: Node) => boolean;
    isRichBlock?: (node: Node) => boolean;
    isVoid?: (node: Node) => boolean;
    normalizeNode?: Normalize | Normalize[];
    onDOMBeforeInput?: OnDOMBeforeInput;
    onKeyDown?: OnKeyDown | null;
    renderElement?: RenderElement;
    renderLeaf?: RenderLeaf;
    withOverrides?: WithOverrides;

    /**
     * Array of types of elements that can appear ONLY at the root of the editor value.
     * If they appear somewhere deeper, nested (e.g. when pasting content from various sources)
     * they will be lifted up to the root of the editor.
     */
    rootTypes?: string[];
}
