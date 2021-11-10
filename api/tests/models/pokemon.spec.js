const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
    });
  });
});

describe("Pokemon Model", function () {
  beforeEach(function () {
    return Pokemon.sync({ force: true });
  });
  describe("Validations", function () {
    it("no se puede crear sin un nombre", function (done) {
      Pokemon.create({
        vida: 1,        
      })
        .then(() => done("No debería haberse creado"))
        .catch(() => done());
    });
  });
});




