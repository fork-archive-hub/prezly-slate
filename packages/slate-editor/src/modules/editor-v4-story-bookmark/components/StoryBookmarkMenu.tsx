import type { Story } from '@prezly/sdk';
import { StoryBookmarkLayout } from '@prezly/slate-types';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import React from 'react';

import type { OptionsGroupOption } from '#components';
import { Toggle, VStack } from '#components';
import { Button, ButtonGroup, OptionsGroup, Toolbox } from '#components';
import { Delete, ItemsLayoutHorizontal, ItemsLayoutVertical, ExternalLink } from '#icons';

interface Props {
    element: StoryBookmarkNode;
    story: Story;
    withNewTabOption: boolean | undefined;
    onClose: () => void;
    onRemove: () => void;
    onUpdate: (
        attrs: Partial<Pick<StoryBookmarkNode, 'show_thumbnail' | 'layout' | 'new_tab'>>,
    ) => void;
}

const CARD_LAYOUT_OPTIONS: OptionsGroupOption<StoryBookmarkLayout>[] = [
    {
        value: StoryBookmarkLayout.VERTICAL,
        label: 'Vertical',
        icon: (props) => <ItemsLayoutVertical fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
    {
        value: StoryBookmarkLayout.HORIZONTAL,
        label: 'Horizontal',
        icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
];

export function StoryBookmarkMenu({
    element,
    story,
    withNewTabOption = true,
    onClose,
    onRemove,
    onUpdate,
}: Props) {
    const isLayoutChangeable = story.oembed.thumbnail_url && element.show_thumbnail;
    const activeLayout = isLayoutChangeable ? element.layout : StoryBookmarkLayout.VERTICAL;

    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Story bookmark settings
            </Toolbox.Header>

            <Toolbox.Section noPadding>
                <ButtonGroup>
                    {[
                        <Button
                            type="link"
                            key="edit"
                            variant="clear"
                            icon={ExternalLink}
                            iconPosition="right"
                            fullWidth
                            target="_blank"
                            disabled={!story.links.edit}
                            href={story.links.edit ?? 'javascript:void(0)'}
                        >
                            Edit
                        </Button>,
                        <Button
                            type="link"
                            key="preview"
                            variant="clear"
                            icon={ExternalLink}
                            iconPosition="right"
                            fullWidth
                            target="_blank"
                            disabled={!story.links.preview}
                            href={story.links.preview ?? 'javascript:void(0)'}
                        >
                            Preview
                        </Button>,
                    ]}
                </ButtonGroup>
            </Toolbox.Section>

            <Toolbox.Section caption="Preview image">
                <Toggle
                    name="show_preview"
                    value={element.show_thumbnail}
                    disabled={!story.oembed.thumbnail_url}
                    onChange={(show_thumbnail) => onUpdate({ show_thumbnail })}
                >
                    Show preview image
                </Toggle>
            </Toolbox.Section>

            <Toolbox.Section caption="Card layout">
                <VStack spacing="2-5">
                    <OptionsGroup
                        name="layout"
                        disabled={!isLayoutChangeable}
                        options={CARD_LAYOUT_OPTIONS}
                        selectedValue={activeLayout}
                        onChange={(layout) => onUpdate({ layout })}
                        columns={3}
                    />

                    {withNewTabOption && (
                        <Toggle
                            name="new_tab"
                            value={element.new_tab}
                            onChange={(new_tab) => onUpdate({ new_tab })}
                        >
                            Open in new tab
                        </Toggle>
                    )}
                </VStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button variant="clear-faded" icon={Delete} fullWidth onClick={onRemove}>
                    Remove Story bookmark
                </Button>
            </Toolbox.Footer>
        </>
    );
}
