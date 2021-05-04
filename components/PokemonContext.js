import { useReducer, useEffect } from 'react';

const reducer = (info, newInfo) => {
    return {
        ...info, ...newInfo
    };
}
