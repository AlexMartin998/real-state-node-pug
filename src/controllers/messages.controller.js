'use strict';

import { Property, Message, User } from './../models/index.js';
import { formatDate } from '../helpers/index.js';

export const renderMessages = async (req, res) => {
    const { propertyId: id } = req.params;
    try {
        const property = await Property.findByPk(id, {
            include: [
                {
                    model: Message,
                    as: 'messages',
                    include: {
                        model: User.scope('removePassword'),
                        as: 'user',
                    },
                },
            ],
        });
        if (!property || +property.user_id !== +req.authenticatedUser.id)
            return res.redirect('/properties/mine');

        // delete propertie and its img
        res.render('./properties/messages', {
            title: 'Mensajes',
            messages: property.messages,
            formatDate,
        });
    } catch (error) {
        console.log(error);
    }
};
