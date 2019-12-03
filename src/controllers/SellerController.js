import Seller from '../models/SellerModel';
import { encrypt, decrypt } from '../utils/decrypt';
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
    });
    // .populate('role');
};


exports.create = (req, res) => {
    if (req.body.nit) {
        req.body.nit = encrypt(req.body.nit);
        req.body.penalty = 0;
        req.body.active = true;

        // Saving on data base
        save(req.body).then((data) => {
            res.json(data);
        }).catch(err => {
            res.send(err);
        })
    }
};

function save(data) {
    const seller = new Seller(data);

    return seller.save();
};


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
