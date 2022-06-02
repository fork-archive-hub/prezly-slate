import type { ListsEditor } from '@prezly/slate-lists';
import type { ElementNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

import type { RichBlocksAwareEditor } from './modules/editor';
import type { TableEditor, Nodes } from './slate-tables';

export interface MyTableNode extends Nodes.TableNode {
    type: 'table';
}

export interface MyTableRowNode extends Nodes.TableRowNode {
    type: 'table-row';
}

export interface MyTableCellNode extends Nodes.TableCellNode {
    type: 'table-cell';
}

export * from './components';
export * as Icons from './icons';
export * from './modules/editor';
export { EditableWithExtensions } from './modules/editable';

export type { SearchProps as CoverageSearchProps } from './extensions/coverage';
export { createEmbed } from './extensions/embed';
export type { SearchProps as PressContactsSearchProps } from './extensions/press-contacts';
export { JobDescription } from './extensions/press-contacts';
export { ElementType as RichElementType } from './extensions/rich-formatting';
export type { User } from './extensions/user-mentions';

export type { ResultPromise, UploadcareOptions } from './modules/uploadcare';
export { withUploadcare } from './modules/uploadcare';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor &
            ReactEditor &
            HistoryEditor &
            ListsEditor &
            RichBlocksAwareEditor &
            TableEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}
