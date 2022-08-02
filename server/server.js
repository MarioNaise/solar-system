const express = require("express");
const app = express();

app.use(express.static("./public"));

app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});

const planetData = require("./planetData.json");
app.get("/api/planets", (req, res) => {
    res.json(planetData);
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`I'm listening on PORT ${process.env.PORT || 8080}`);
});
