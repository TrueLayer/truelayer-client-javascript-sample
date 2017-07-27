const { AuthAPIClient, DataAPIClient } = require("truelayer-client");
const app = require("express")();
const envalid = require("envalid");

// Get environment variables
const env = envalid.cleanEnv(process.env, {
    CLIENT_ID: envalid.str(),
    CLIENT_SECRET: envalid.str(),
    REDIRECT_URI: envalid.url({ default: "http://localhost:5000/truelayer-redirect" })
});

// Create auth client instance - automatically picks up env vars
const authClient = new AuthAPIClient();

// Define array of permission scopes
const scopes = ["info", "accounts", "balance", "transactions", "offline_access"]

// Construct url and redirect to the auth dialog
app.get("/", (req, res) => {
    const authURL = authClient.getAuthUrl(env.REDIRECT_URI, scopes, "foobar");
    res.redirect(authURL);
});

// Get 'code' querystring parameter and hit data api
app.get("/truelayer-redirect", async (req, res) => {
    const code = req.query.code;
    const tokens = await authClient.exchangeCodeForToken(env.REDIRECT_URI, code);

    // Hit info endpoint for identity data
    const info = await DataAPIClient.getInfo(tokens.access_token);

    res.set("Content-Type", "text/plain");
    res.send("Info: " + JSON.stringify(info, null, 2));
});

app.listen(5000, () => console.log("Example app listening on port 5000..."));
