const { AuthAPIClient, DataAPIClient } = require("truelayer-client");
const app = require("express")();
const envalid = require("envalid");
const parser = require("body-parser");

// Get environment variables
const env = envalid.cleanEnv(process.env, {
    CLIENT_ID: envalid.str(),
    CLIENT_SECRET: envalid.str(),
    REDIRECT_URI: envalid.url({ default: "http://localhost:5000/truelayer-redirect" })
});

// Create TrueLayer auth client instance - automatically picks up env vars
const authClient = new AuthAPIClient();

// Redirect to the auth dialog
app.get("/", (req, res) => {
    const authURL = authClient.getAuthUrl(env.REDIRECT_URI, ["info"], "nonce", "form_post", "state", true);
    res.redirect(authURL);
});

// Express body parser setup
app.use(parser.urlencoded({ extended: true }));

// Receiving post request
app.post("/truelayer-redirect", async (req, res) => {
    const code = req.body.code;
    const tokens = await authClient.exchangeCodeForToken(env.REDIRECT_URI, code);

    // Hit info endpoint for identity data
    const info = await DataAPIClient.getInfo(tokens.access_token);

    res.set("Content-Type", "text/plain");
    res.send("Info: " + JSON.stringify(info, null, 2));
});

app.listen(5000, () => {
    console.log("Example app listening on port 5000...");
});
