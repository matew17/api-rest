// import notebook from '../controllers/notebookController';
import commissionTypes from '../controllers/CommissionTypeController';

export default (app) => {
    // app.route('/notes')
    //     .get(notebook.getAllNotes)
    //     .post(notebook.createNote);

    // app.route('/notes/:noteId')
    //     .get(notebook.getNote)
    //     .put(notebook.updateNote)
    //     .delete(notebook.deleteNote);

    app.route('/commission-types')
        .get(commissionTypes.getAll)
        .post(commissionTypes.create);

    app.route('/commission-types/:id')
        .get(commissionTypes.getByID)
        .delete(commissionTypes.delete);
};
