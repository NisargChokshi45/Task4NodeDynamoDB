const request = require("supertest");
const app = require("./../../app");
const { errorFunction } = require("./../../utils/errorFunction");
const { createMovieTable, deleteMovieTable } = require("./../../models/movie");

describe('Testing Movie Controller', () => {

  beforeAll(() => {
    createMovieTable();
  })

  afterAll(() => {
    deleteMovieTable();
  })

  test("should Throw an Error Adding a Movie - Data Required", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara"
    };

    const body = errorFunction(true, '"year" is required');

    const response = await request(app)
      .post("/addMovie")
      .send(payload);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Adding a Movie - Data Required", async () => {
    const payload = {
      year: 2011
    };

    const body = errorFunction(true, '"title" is required');

    const response = await request(app)
      .post("/addMovie")
      .send(payload);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(body);
  });

  test("should Add a Non-existing Movie", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
      year: 2011,
      info: {
        directors: ["Zoya Akhtar"],
        rating: 7.8,
        actors: ["Hritik Roshan", "Abhay Deol"],
      },
    };

    const body = errorFunction(false, "Movie Added", payload)

    const response = await request(app)
      .post("/addMovie")
      .send(payload);
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Adding an Existing Movie", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
      year: 2011,
      info: {
        directors: ["Zoya Akhtar"],
        rating: 7.8,
        actors: ["Hritik Roshan", "Abhay Deol"],
      },
    };

    const body = errorFunction(true, "Movie Already Exists", {});

    const response = await request(app)
      .post("/addMovie")
      .send(payload);
    expect(response.statusCode).toBe(302);
    expect(response.body).toStrictEqual(body);
  });

  test("should Get an Existing Movie", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
      year: 2011,
    };

    const body = errorFunction(false, "Movie Details", {
      title: "Zindagi Na Milegi Dobara",
      year: 2011,
      info: {
        directors: ["Zoya Akhtar"],
        rating: 7.8,
        actors: ["Hritik Roshan", "Abhay Deol"],
      },
    })

    const response = await request(app)
      .post("/getMovie")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Getting a Movie - Data Required", async () => {
    const payload = {
      year: 2011
    };

    const body = errorFunction(true, "Data required to Get Movie")

    const response = await request(app)
      .post("/getMovie")
      .send(payload);
    expect(response.statusCode).toBe(406);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Getting a Movie - Data Required", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara"
    };

    const body = errorFunction(true, "Data required to Get Movie")

    const response = await request(app)
      .post("/getMovie")
      .send(payload);
    expect(response.statusCode).toBe(406);
    expect(response.body).toStrictEqual(body);
  });

  test("should Update an Existing Movie", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
      year: 2011,
      info: {
        directors: ["Zoya Akhtar", "Farhan Akhtar"],
        rating: 8.2,
        actors: ["Hritik Roshan", "Abhay Deol", "Katrina Kaif"],
      },
    };

    const body = errorFunction(false, "Movie Updated", payload);

    const response = await request(app)
      .post("/updateMovie")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Updating a Movie - Data Required", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara"
    };

    const body = errorFunction(true, '"year" is required');

    const response = await request(app)
      .post("/updateMovie")
      .send(payload);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Updating a Movie - Data Required", async () => {
    const payload = {
      year: 2011
    };

    const body = errorFunction(true, '"title" is required');

    const response = await request(app)
      .post("/updateMovie")
      .send(payload);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Updating a Movie - Data Required", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
      year: 2011
    };

    const body = errorFunction(true, "Error Updating Movie")

    const response = await request(app)
      .post("/updateMovie")
      .send(payload);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(body);
  });

  test("should Delete an Existing Movie", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
      year: 2011,
    };

    const body = errorFunction(
      false,
      "Movie Deleted",
      {
        title: "Zindagi Na Milegi Dobara",
        year: 2011,
        info: {
          directors: ["Zoya Akhtar", "Farhan Akhtar"],
          rating: 8.2,
          actors: ["Hritik Roshan", "Abhay Deol", "Katrina Kaif"],
        },
      }
    )

    const response = await request(app)
      .post("/deleteMovie")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Deleting a Movie - Data Required", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
    };

    const body = errorFunction(true, "Data required to Delete Movie")

    const response = await request(app)
      .post("/deleteMovie")
      .send(payload);
    expect(response.statusCode).toBe(406);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Deleting a Movie - Data Required", async () => {
    const payload = {
      year: 2011
    };

    const body = errorFunction(true, "Data required to Delete Movie")

    const response = await request(app)
      .post("/deleteMovie")
      .send(payload);
    expect(response.statusCode).toBe(406);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Getting a Non-existing Movie", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
      year: 2011,
    };

    const body = errorFunction(true, "Movie Not Found")

    const response = await request(app)
      .post("/getMovie")
      .send(payload);
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Updating a Non-Existing Movie", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
      year: 2011,
      info: {
        directors: ["Zoya Akhtar", "Farhan Akhtar"],
        rating: 8.2,
        actors: ["Hritik Roshan", "Abhay Deol", "Katrina Kaif"],
      },
    };

    const body = errorFunction(true, "Movie Not Found")

    const response = await request(app)
      .post("/updateMovie")
      .send(payload);
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Deleting a Non-existing Movie", async () => {
    const payload = {
      title: "Zindagi Na Milegi Dobara",
      year: 2011,
    };

    const body = errorFunction(true, "Movie Not Found")

    const response = await request(app)
      .post("/deleteMovie")
      .send(payload);
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual(body);
  });

  test("should Get all Movies from a Given Year - Zero Movie", async () => {
    const payload = {
      year: 2020
    };

    const body = errorFunction(false, "Movie Details", []);

    const response = await request(app)
      .post("/getAllMoviesInYear")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(body);
  });

  test("should Get all Movies from a Given Year - Single Movie", async () => {
    const payload = {
      year: 2011
    };

    const response = await request(app)
      .post("/getAllMoviesInYear")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].title).toBe("Bridesmaids");
  });

  test("should Get all Movies from a Given Year - N Movies", async () => {
    const payload = {
      year: 2013
    };

    const response = await request(app)
      .post("/getAllMoviesInYear")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(57);
  });

  test("should Throw an Error Getting all Movies from a Given Year - Data Required", async () => {
    const body = errorFunction(true, "Data required to Get All the Movies")
    const response = await request(app)
      .post("/getAllMoviesInYear");
    expect(response.statusCode).toBe(406);
    expect(response.body).toStrictEqual(body);
  });

  test("should Get all Movies Starting with a Letter - Zero Movie", async () => {
    const payload = {
      year: 2013,
      startsWith: "K"
    };

    const body = errorFunction(false, "Movie Details", []);

    const response = await request(app)
      .post("/getAllMoviesStartsWith")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(body);
  });

  test("should Get all Movies Starting with a Letter - Single Movie", async () => {
    const payload = {
      year: 2013,
      startsWith: "j"
    };

    const response = await request(app)
      .post("/getAllMoviesStartsWith")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].title).toBe("jOBS");
  });

  test("should Get all Movies Starting with a Letter - N Movies", async () => {
    const payload = {
      year: 2013,
      startsWith: "E"
    };

    const response = await request(app)
      .post("/getAllMoviesStartsWith")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(4);
  });

  test("should Throw an Error Getting all Movies Starting with a Letter - Data Required", async () => {
    const payload = {
      year: 2013,
    };

    const body = errorFunction(true, "Data required to Get All the Movies")

    const response = await request(app)
      .post("/getAllMoviesStartsWith")
      .send(payload);
    expect(response.statusCode).toBe(406);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Getting all Movies Starting with a Letter - Data Required", async () => {
    const payload = {
      startsWith: "E"
    };

    const body = errorFunction(true, "Data required to Get All the Movies")

    const response = await request(app)
      .post("/getAllMoviesStartsWith")
      .send(payload);
    expect(response.statusCode).toBe(406);
    expect(response.body).toStrictEqual(body);
  });

  test("should Get all Movies from a given Year Range - Zero Movie", async () => {
    const payload = {
      startingYear: 2020,
      endingYear: 2021
    };

    const body = errorFunction(false, "Movie Details", []);

    const response = await request(app)
      .post("/getAllMoviesInRange")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(body);
  });

  test("should Get all Movies from a given Year Range - Single Movie", async () => {
    const payload = {
      startingYear: 2009,
      endingYear: 2010
    };

    const response = await request(app)
      .post("/getAllMoviesInRange")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].title).toBe("Insidious");
  });

  test("should Get all Movies from a given Year Range - N Movies", async () => {
    const payload = {
      startingYear: 2011,
      endingYear: 2013
    };

    const response = await request(app)
      .post("/getAllMoviesInRange")
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(68);
  });

  test("should Throw an Error Getting all movies from a given Year Range - Data Required", async () => {
    const payload = {
      startingYear: 2011
    };

    const body = errorFunction(true, "Data required to Get All the Movies");

    const response = await request(app)
      .post("/getAllMoviesInRange")
      .send(payload);
    expect(response.statusCode).toBe(406);
    expect(response.body).toStrictEqual(body);
  });

  test("should Throw an Error Getting all movies from a given Year Range - Data Required", async () => {
    const payload = {
      endingYear: 2011
    };

    const body = errorFunction(true, "Data required to Get All the Movies");

    const response = await request(app)
      .post("/getAllMoviesInRange")
      .send(payload);
    expect(response.statusCode).toBe(406);
    expect(response.body).toStrictEqual(body);
  });
});
