import * as React from 'react';

import { Button, VStack } from '#components';
import { ExternalLink, Delete, ItemsLayoutVertical, ItemsLayoutHorizontal } from '#icons';

export default {
    title: 'Components/Button',
};

export function Base() {
    return <Button>Base</Button>;
}

export function AsLink() {
    return (
        <Button type="link" href="#" variant="clear">
            Base
        </Button>
    );
}

export function WithIcon() {
    return (
        <VStack spacing="2">
            <div>
                <Button Icon={ExternalLink}>Icon left</Button>
            </div>
            <div>
                <Button Icon={ExternalLink} iconPosition="right">
                    Icon right
                </Button>
            </div>
            <div>
                <Button Icon={ExternalLink} iconPosition="right" />
            </div>
        </VStack>
    );
}

export function Variants() {
    return (
        <VStack spacing="2">
            <div>
                <Button variant="clear">Clear</Button>
            </div>

            <div>
                <Button round>Round</Button>
            </div>
        </VStack>
    );
}

export function States() {
    return (
        <VStack spacing="2">
            <div>
                <Button variant="clear" disabled>
                    Disabled
                </Button>
            </div>
        </VStack>
    );
}
