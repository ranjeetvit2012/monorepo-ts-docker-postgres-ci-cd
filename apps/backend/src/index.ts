import express from 'express';
import db from "@repo/db/client"
const app = express()
const port = 8080



app.use(express.json());

app.get("/users", (req, res) => {
  db.user.findMany()
    .then((users:any) => {
      res.json(users);
    })
    .catch((err:any) => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  db.user.create({
    data: {
      username,
      password
    }
  })
    .then((user:any) => {
      res.status(201).json(user);
    })
    .catch((err:any) => {
      res.status(500).json({ error: err.message });
    });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
