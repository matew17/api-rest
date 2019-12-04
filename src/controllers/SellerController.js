import { encrypt, decrypt } from '../utils/decrypt';
import { handleErrors } from '../utils/error-handler';
import Role from '../models/RoleModel';
import Seller from '../models/SellerModel';

exports.getByID = (req, res) => {
    Seller.findById(req.params.id, (err, data) => {
        handleErrors(res, data, err);

        if (data.nit) {
            data.nit = decrypt(data.nit);
            res.json(data);
        }

    }).populate('role');
};

exports.getAll = (req, res) => {
    Seller.find({}, (err, data) => {
        handleErrors(res, data, err);

        data.forEach((seller, i) => {
            data[i].nit = decrypt(seller.nit);;
        });

        res.json(data);
    }).populate('role');
};

exports.create = (req, res) => {
    if (req.body && req.body.nit && req.body.role) {
        req.body.nit = encrypt(req.body.nit);
        req.body.active = true;
        req.body.penalty = 0.07;

        _getRoleValue(req.body.role)
            .then(data => {
                req.body.comission = data.commissionType.value;

                // Saving on data base
                _save(req.body)
                    .then((data) => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.send(err);
                    });
            })
            .catch(err => {
                res.send(err);
            });
    } else {
        res.send({ error: 'Missing content on body' });
    }
};

exports.delete = (req, res) => {
    let deactivateData;

    if (
        req.body &&
        req.body.penalty &&
        req.body.role &&
        req.params &&
        req.params.id
    ) {
        _getRoleValue(req.body.role)
            .then(data => {
                // Missing commissionType
                if (!data && !data.commissionType && !data.commissionType.value) {
                    res.send({ error: 'Missing commision' });
                }

                deactivateData = {
                    active: false,
                    comission: _canculatePenalty(req.body.penalty, data.commissionType.value)
                };

                Seller.findOneAndUpdate({ _id: req.params.id }, deactivateData,
                    (err, data) => {
                        handleErrors(res, data, err);

                        res.json(data);
                    });
            })
            .catch(err => {
                res.send(err);
            });

    } else {
        res.send({ error: 'Missing content' });
    }
};

exports.update = (req, res) => {
    let updateData = {
        nit: encrypt(req.body.nit),
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        address: req.body.address
    };

    Seller.findOneAndUpdate({ _id: req.params.id }, updateData, (err, data) => {
        handleErrors(res, data, err);

        res.json(data);
    });
};

function _getRoleValue(id) {
    return Role.findById(id).populate('commissionType');
}

function _save(data) {
    const seller = new Seller(data);

    return seller.save();
};

function _canculatePenalty(penalty, commission) {
    // RoleCommissionTypeValue - (RoleCommissionTypeValue * (PenaltyPercentage / 100))
    return commission - (commission * (penalty / 100));
}
