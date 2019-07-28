const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*')
        .from('users')
        .where({ id: id })
        .then(user => {
            if (user.length) {
                return res.json(user[0])
            } else {
                return res.status(404).json("Not found")
            }

        })
        .catch(err => res.status(404).json("Error getting users"))
}

module.exports={
    handleProfileGet
}