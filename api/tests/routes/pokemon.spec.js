/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("get /pokemon", () => {
    it("get de todos los pokemons", async () =>
      await agent
        .get("/api/pokemon/")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body[0].name).to.equal("bulbasaur");
        })).timeout(15000);
  });

  describe("get /pokemon/id", () => {
    it("tengo que obtener un 200 y un name: bulbasaur", async () =>
      await agent
        .get("/api/pokemon/1")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.name).to.equal("bulbasaur");
        })).timeout(15000);
  });

  describe("get /pokemon/name=bulbasaur", () => {
    it("tengo que obtener un 200 y un name: bulbasaur", async () =>
      await agent
        .get("/api/pokemon?name=bulbasaur")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body[0].name).to.equal("bulbasaur");
        })).timeout(15000);
  });

  describe("post /pokemon/", () => {
    it("tegno que obetner un pokemon de nombre felipe", async () =>
      await agent
        .post("/api/pokemon/")
        .send({ name: "felipe" })
        .expect(201)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.name).to.equal("felipe");
        })).timeout(15000);
  });

  // describe("get /pokemon/id", () => {
  //   it("tengo que obtener un 'Request failed with status code 404' ", async () =>
  //     await agent
  //       .get("/api/pokemon/1000")
  //       .expect("Request failed with status code 404")).timeout(15000);
  // });
});
