import commissionTypes from '../controllers/CommissionTypeController';
import roles from '../controllers/RoleController';
import sellers from '../controllers/SellerController';

export default (app) => {
    // Commission Types
    app.route('/commission-types')
        .get(commissionTypes.getAll)
        .post(commissionTypes.create);

    app.route('/commission-types/:id')
        .get(commissionTypes.getByID)
        .delete(commissionTypes.delete);

    // Roles
    app.route('/roles')
        .get(roles.getAll)
        .post(roles.create);

    app.route('/roles/:id')
        .get(roles.getByID)
        .delete(roles.delete);

    // Sellers
    app.route('/sellers')
        .get(sellers.getAll)
        .post(sellers.create);

    app.route('/sellers/:id')
        .get(sellers.getByID)
        .put(sellers.update)
        .delete(sellers.delete);
};
