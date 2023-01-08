'use strict';

export const formatDate = date => {
    const dateStr = new Date(date).toISOString();
    const newDate = dateStr.slice(0, 10);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return new Date(newDate).toLocaleDateString('es-ES', options);
};
