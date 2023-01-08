import Category from './Category.js';
import Price from './Price.js';
import Property from './Property.js';
import User from './User.js';
import Message from './Message.js';

// // Crea la FK en Property
// Price.hasOne(Property, {
//     foreignKey: 'price_id',
//     as: 'property',
// });
// leerlo como Property tiene 1 Price
Property.belongsTo(Price, {
    foreignKey: 'price_id',
    as: 'price',
});

// // Crea la FK en Price
// Property.hasOne(Price, {
//     // foreignKey: 'property_id',
//     // as: 'property',
// });

// =========== derecha a izquierda  -  Crea la FK en Property
// Category.hasMany(Property, {
//     foreignKey: 'category_id',
// });
Property.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Property.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 1 Porterty tienen Muchos Messages - crea en messages
Property.hasMany(Message, { foreignKey: 'property_id', as: 'messages' });

// 1 Message tiene solo 1 Property
Message.belongsTo(Property, { foreignKey: 'property_id', as: 'property' });
Message.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { Price, Property, Category, User, Message };
