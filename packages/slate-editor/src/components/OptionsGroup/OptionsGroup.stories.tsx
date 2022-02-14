import * as React from 'react';

import type { OptionsGroupOption } from '#components';
import { OptionsGroup } from '#components';
import { ItemsLayoutVertical, ItemsLayoutHorizontal } from '#icons';

export default {
    title: 'Components/OptionsGroup',
};

export function Base() {
    const [cardLayout, setCardLayout] = React.useState<
        typeof cardLayoutOptions[number]['value'] | undefined
    >('vertical');

    const cardLayoutOptions: OptionsGroupOption<'vertical' | 'horizontal' | 'disabled'>[] = [
        {
            value: 'vertical',
            label: 'Left',
            Icon: (props) => <ItemsLayoutVertical fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'horizontal',
            label: 'Center',
            Icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'disabled',
            label: 'Disabled',
            Icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
            disabled: true,
        },
    ];

    return (
        <div style={{ background: 'rgba(27, 27, 54, 0.96)', padding: 20 }}>
            <OptionsGroup
                name="card-layout"
                type="radio"
                options={cardLayoutOptions}
                selected={cardLayout}
                onChange={setCardLayout}
                columns={3}
            />
        </div>
    );
}
