import CommissionType from '../models/CommissionTypeModel.js';

exports.getByID = (req, res) => {
    CommissionType.findById(req.params.id, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.json(data);
    });
};

exports.getAll = (req, res) => {
    CommissionType.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.json(data);
    });
};

exports.create = (req, res) => {
    const commissionType = new CommissionType(req.body);

    commissionType.save((err, data) => {
        if (err) {
            res.send(err);
        }

        res.json(data);
    });
};


exports.delete = (req, res) => {
    CommissionType.remove({
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
