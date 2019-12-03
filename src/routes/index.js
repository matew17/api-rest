// import notebook from '../controllers/notebookController';
import commissionTypes from '../controllers/CommissionTypeController';
import roles from '../controllers/RoleController';
import sellers from '../controllers/SellerController';

export default (app) => {
    // app.route('/notes')
    //     .get(notebook.getAllNotes)
    //     .post(notebook.createNote);

    // app.route('/notes/:noteId')
    //     .get(notebook.getNote)
    //     .put(notebook.updateNote)
    //     .delete(notebook.deleteNote);

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

    // app.route('/sellers/:id')
    // .get(roles.getByID)
    // .delete(roles.delete);
};
