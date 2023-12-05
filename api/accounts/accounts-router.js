const router = require("express").Router();
const midware = require("./accounts-middleware");
const Accounts = require("./accounts-model");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", midware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json(req.account);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  midware.checkAccountPayload,
  midware.checkAccountNameUnique,
  async (req, res, next) => {
    // DO YOUR MAGIC
    let { name, budget } = req.body;
    name = name.trim();
    try {
      const newAccount = await Accounts.create({ name, budget });
      res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  midware.checkAccountId,
  midware.checkAccountPayload,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      let { name, budget } = req.body;
      name = name.trim();
      const updatedAccount = await Accounts.updateById(req.params.id, {
        name,
        budget,
      });
      res.json(updatedAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", midware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deletedAccount = await Accounts.deleteById(req.params.id);
    res.json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  // DO YOUR MAGIC
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;
