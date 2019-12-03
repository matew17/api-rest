import Role from '../models/RoleModel';
// import CommissionType from '../models/CommissionTypeModel'

exports.getByID = (req, res) => {
    Role.findById(req.params.id, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.json(data);
    }).populate('commissionType');
};

exports.getAll = (req, res) => {
    Role.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.json(data);
    }).populate('commissionType');
};

exports.create = (req, res) => {
    const role = new Role(req.body);

    role.save((err, data) => {
        if (err) {
            res.send(err);
        }

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
            message: `note ${req.params.id} successfully deleted`
        });
    });
};
