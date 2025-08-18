const express = require('express');
const users= require('./MOCK_DATA.json');
const app = express();
const fs = require('fs');   

const PORT = 8000;

//middleware to serve static files
app.use(express.urlencoded({extended: false}))

app.get("/users",(req,res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')};
        ${users.map(user => `<li>${user.gender}</li>`).join('')};
    </ul>
    `;
    res.send(html);
})

//REST api
app.use(express.json());
app.get('/api/users', (req,res) =>{
    return res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post('/api/users', (req,res) => {
    const body = req.body;
   users.push(body);
   fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
       if (err) {
           return res.status(500).json({status:"error"});
       }
       return res.json({status:"success"});
   });
});

app.patch('/api/users/:id', (req,res) => {
    
   const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ status: "user not found" });
    }

    // Update user fields
    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "error" });
        }
        return res.json({ status: "success", user: users[userIndex] });
    });
});
app.delete('/api/users/:id', (req,res) => {
   const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ status: "user not found" });
    }

    users.splice(userIndex, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "error" });
        }
        return res.json({ status: "success" });
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})