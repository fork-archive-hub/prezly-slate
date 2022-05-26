import type { LinkNode } from '@prezly/slate-types';
import * as React from 'react';
import { useState } from 'react';
import { RootCloseWrapper } from 'react-overlays';

import { Button, Input, Toggle, Toolbox, VStack } from '#components';
import { Delete, Link } from '#icons';
import { HREF_REGEXP, normalizeHref } from '#lib';

interface Props {
    node: LinkNode | null;
    canUnlink: boolean;
    withNewTabOption: boolean;
    onBlur: () => void;
    onChange: (props: Pick<LinkNode, 'href' | 'new_tab'>) => void;
    onClose: () => void;
    onUnlink: () => void;
}

export function LinkMenu({
    node,
    canUnlink,
    withNewTabOption,
    onBlur,
    onChange,
    onClose,
    onUnlink,
}: Props) {
    const [href, setHref] = useState(node?.href ?? '');
    const [new_tab, setNewTab] = useState(node?.new_tab ?? true);

    function handleSave() {
        onChange({ href: normalizeHref(href), new_tab });
    }

    return (
        <RootCloseWrapper onRootClose={onBlur}>
            <Toolbox.Panel style={{ width: 320 }}>
                <Toolbox.Header withCloseButton onCloseClick={onClose}>
                    Link settings
                </Toolbox.Header>
                <Toolbox.Section>
                    <form
                        onSubmit={function (event) {
                            event.preventDefault();
                            handleSave();
                        }}
                    >
                        <VStack spacing="2">
                            <VStack spacing="2">
                                <VStack spacing="2-5">
                                    <VStack spacing="1-5">
                                        <Toolbox.Caption>Link</Toolbox.Caption>
                                        <Input
                                            autoFocus
                                            name="href"
                                            value={href}
                                            onChange={setHref}
                                            icon={Link}
                                            pattern={HREF_REGEXP.source}
                                            placeholder="Paste link"
                                            title="Please input a valid URL"
                                        />
                                    </VStack>

                                    {withNewTabOption && (
                                        <Toggle name="new_tab" value={new_tab} onChange={setNewTab}>
                                            Open in new tab
                                        </Toggle>
                                    )}
                                </VStack>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    fullWidth
                                    round
                                    disabled={!href}
                                >
                                    Save
                                </Button>
                            </VStack>
                        </VStack>
                    </form>
                </Toolbox.Section>
                <Toolbox.Footer>
                    <Button
                        variant="clear-faded"
                        icon={Delete}
                        fullWidth
                        disabled={!canUnlink}
                        onClick={onUnlink}
                    >
                        Unlink text
                    </Button>
                </Toolbox.Footer>
            </Toolbox.Panel>
        </RootCloseWrapper>
    );
}
