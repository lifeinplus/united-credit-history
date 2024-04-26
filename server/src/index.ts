import express from "express";

const port = 8000;
const app = express();

app.get("/", async (req, res) => {
    res.send("555");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
