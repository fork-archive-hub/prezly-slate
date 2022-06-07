import type { DeserializeElement, Extension } from '@prezly/slate-commons';

export function getElementDeserializers(extensions: Extension[]): DeserializeElement {
    const elementFallbacks = extensions.reduce(
        (deserializers, extension) =>
            combineDeserializers(deserializers, extension.deserialize?.elementFallback ?? {}),
        {},
    );

    const elements = extensions.reduce(
        (deserializers, extension) =>
            combineDeserializers(deserializers, extension.deserialize?.element ?? {}),
        {},
    );

    return combineDeserializers(elementFallbacks, elements);
}

export function combineDeserializers(base: DeserializeElement, override: DeserializeElement) {
    return Object.keys(override).reduce((result, tagName) => {
        return {
            ...result,
            [tagName]: combine(base[tagName], override[tagName]),
        };
    }, base);
}

type Deserializer = DeserializeElement[string];

function combine(base: Deserializer | undefined, override: Deserializer | undefined): Deserializer {
    if (override && base) {
        return (element) => override(element) ?? base(element);
    }
    return override ?? base ?? noop;
}

function noop() {
    return undefined;
}
