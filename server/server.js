const express = require("express");
const app = express();

app.use(express.static("./public"));

app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

const planetData = require("./planetData.json");
app.get("/api/planets", (req, res) => {
    res.json(planetData);
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`I'm listening on PORT ${process.env.PORT || 8080}`);
});
