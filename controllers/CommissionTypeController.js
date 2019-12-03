import commissionType from '../models/CommissionTypeModel.js';

exports.getByID = (req, res) => {
    commissionType.findById(req.params.id, (err, commissionType) => {
        if (err) {
            res.send(err);
        }

        res.json(commissionType);
    });
};

exports.getAll = (req, res) => {
    commissionType.find({}, (err, comissionTypes) => {
        if (err) {
            res.send(err);
        }

        res.json(comissionTypes);
    });
};

exports.create = (req, res) => {
    const commissionType = new commissionType(req.body);

    commissionType.save((err, note) => {
        if (err) {
            res.send(err);
        }

        res.json(note);
    });
};


exports.delete = (req, res) => {
    commissionType.remove({
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
