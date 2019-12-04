import { handleErrors } from '../utils/error-handler';
import Role from '../models/RoleModel';

exports.getByID = (req, res) => {
    Role.findById(req.params.id, (err, data) => {
        handleErrors(res, data, err);

        res.json(data);
    }).populate('commissionType');
};

exports.getAll = (req, res) => {
    Role.find({}, (err, data) => {
        handleErrors(res, data, err);

        res.json(data);
    }).populate('commissionType');
};

exports.create = (req, res) => {
    const role = new Role(req.body);

    role.save((err, data) => {
        handleErrors(res, data, err);

        res.json(data);
    });
};

exports.delete = (req, res) => {
    Role.remove({
        _id: req.params.id
    }, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({
            message: `${req.params.id} successfully deleted`
        });
    });
};
