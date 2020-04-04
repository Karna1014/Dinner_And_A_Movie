
const PORT = process.env.PORT || 3005;
// Create an instance of the express app.

const app = express();
// Set Handlebars as the default templating engine.

app.use(express.static("public"));
//Parse app body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});
