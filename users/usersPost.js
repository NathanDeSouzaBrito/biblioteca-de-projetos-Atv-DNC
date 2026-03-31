const postUsers = (app, users) => {
    app.post("/users", (req, res) => {
        console.log(req)
        
        const body = req.body
        users.push(body)
        res.status(201).send("Usuario criado com sucesso")
    })
}

export default postUsers