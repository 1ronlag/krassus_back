const express = require("express");
const app = express();
const cors = require("cors");

const CsbInspector = require("csb-inspector");
CsbInspector();

const morganBody = require("morgan-body");
morganBody(app);

app.use(cors());

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server encendido en puerto ${PORT}`);
});

module.exports = app;
