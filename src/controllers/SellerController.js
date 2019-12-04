import Seller from '../models/SellerModel';
import { encrypt, decrypt } from '../utils/decrypt';

import Role from '../models/RoleModel';

// exports.getByID = (req, res) => {
//     Seller.findById(req.params.id, (err, data) => {
//         if (err) {
//             res.send(err);
//         }

//         res.json(data);
//     }).populate('commissionType');
// };

exports.getAll = (req, res) => {
    Seller.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }

        data.forEach((seller, i) => {
            let decrypted = decrypt(seller.nit);

            data[i].nit = decrypted;
        });

        res.json(data);
    }).populate('role');
};

exports.create = (req, res) => {
    if (req.body && req.body.nit && req.body.role) {
        req.body.nit = encrypt(req.body.nit);
        req.body.active = true;

        _getRoleValue(req.body.role)
            .then(data => {
                req.body.penalty = data.commissionType.value;

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
        res.send({ error: 'Missing content on body' })
    }
};

function _save(data) {
    const seller = new Seller(data);

    return seller.save();
};

function _getRoleValue(id) {
    return Role.findById(id).populate('commissionType');
}


// exports.delete = (req, res) => {
//     Seller.remove({
//         _id: req.params.id
//     }, (err) => {
//         if (err) {
//             res.send(err);
//         }

//         res.json({
//             message: `note ${req.params.id} successfully deleted`
//         });
//     });
// };
