import { noop } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import { useLatest } from '#lib';

interface Actions {
    onOperationEnd: () => void;
    onOperationStart: () => void;
}

export default function usePendingOperation(
    onIsOperationPendingChange: (isOperationPending: boolean) => void = noop,
): Actions {
    const [operationsSemaphore, setOperationsSemaphore] = useState<number>(0);
    const onIsOperationPendingChangeRef = useLatest(onIsOperationPendingChange);
    const isOperationPending = operationsSemaphore > 0;

    useEffect(() => {
        onIsOperationPendingChangeRef.current(isOperationPending);
    }, [isOperationPending, onIsOperationPendingChangeRef]);

    const onOperationStart = useCallback(() => {
        setOperationsSemaphore((value) => value + 1);
    }, []);

    const onOperationEnd = useCallback(() => {
        setOperationsSemaphore((value) => value - 1);
    }, []);

    return {
        onOperationEnd,
        onOperationStart,
    };
}
