function handleErrors(res, data, err) {
    if (err) {
        res.send(err);
    }

    if (err === null && !data) {
        res.send({ err: 404 })
    }
}

export { handleErrors };
