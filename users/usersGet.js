const getUsers = (app, users) => {
    app.get("/users", (req, res) => {
        res.status(200).send({ users });
    });
};

export default getUsers;
