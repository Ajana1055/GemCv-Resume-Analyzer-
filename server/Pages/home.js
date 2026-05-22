const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try{
  const { text } = req.body;

  res.json({
    message: `You wrote: ${text}`
  });
}
catch(err){
  res.json({
    message:`INTERNAL ERR ${err}`
  })
}
});

module.exports = router;
