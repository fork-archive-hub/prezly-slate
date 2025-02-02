import type { NewsroomContact } from '@prezly/sdk';
import type { ContactInfo } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderContact } from '#icons';
import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import { createContactNode } from '../../press-contacts';
import type { Props as PlaceholderElementProps } from '../components/PlaceholderElement';
import {
    type Props as BaseProps,
    SearchInputPlaceholderElement,
} from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

export function ContactPlaceholderElement({
    children,
    element,
    format = 'card',
    getSuggestions,
    removable,
    renderEmpty,
    renderSuggestion,
    renderSuggestionsFooter,
    ...props
}: ContactPlaceholderElement.Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSelect = useFunction((id: NewsroomContact['uuid'], contact: ContactInfo) => {
        EventsEditor.dispatchEvent(editor, 'contact-dialog-submitted', {
            contact_id: id,
        });

        replacePlaceholder(editor, element, createContactNode({ contact, reference: id }));
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
    });

    return (
        <SearchInputPlaceholderElement<ContactInfo>
            {...props}
            element={element}
            // Core
            format={format}
            icon={PlaceholderContact}
            title="Click to insert a site contact"
            description="Add a site contact to your story"
            // Input
            getSuggestions={getSuggestions}
            renderEmpty={renderEmpty}
            renderSuggestion={renderSuggestion}
            renderSuggestions={(props) => (
                <SearchInput.Suggestions
                    activeElement={props.activeElement}
                    query={props.query}
                    suggestions={props.suggestions}
                    footer={renderSuggestionsFooter?.(props)}
                >
                    {props.children}
                </SearchInput.Suggestions>
            )}
            inputTitle="Site contact"
            inputDescription="Select a contact to insert"
            inputPlaceholder="Search for contacts"
            onSelect={handleSelect}
            removable={removable}
        >
            {children}
        </SearchInputPlaceholderElement>
    );
}

export namespace ContactPlaceholderElement {
    export interface Props
        extends Omit<
                BaseProps<ContactInfo>,
                | 'onSelect'
                | 'icon'
                | 'title'
                | 'description'
                | 'inputTitle'
                | 'inputDescription'
                | 'inputPlaceholder'
                | 'renderSuggestions'
            >,
            Pick<PlaceholderElementProps, 'removable'> {
        element: PlaceholderNode<PlaceholderNode.Type.CONTACT>;
        renderSuggestionsFooter?: BaseProps<ContactInfo>['renderSuggestions'];
    }
}
