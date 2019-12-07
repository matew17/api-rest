function handleErrors(res, data, err) {
    if (err) {
        res.send(err);
    }

    if (err === null && !data) {
        res.status(404).send({ err: 404 })
    }
}

export { handleErrors };
