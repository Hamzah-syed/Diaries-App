import { Server, hasMany, Model, Factory, belongsTo, Response } from "miragejs";
//routes user function
import user from "./routes/user";
import * as diary from "./routes/diary";
import * as entry from "./routes/entry";

export const handleError = (error: any, message = "error Ocuured") => {
  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};
export const setupServer = (env: string): Server => {
  return new Server({
    environment: env ?? "development",

    models: {
      entry: Model.extend({
        diary: belongsTo(),
      }),

      diary: Model.extend({
        entry: hasMany(),
        user: belongsTo(),
      }),
      user: Model.extend({
        diary: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        name: "hamzah",
        email: "test@abc.com",
        password: "123",
      }),
    },
    seeds: (server): any => {
      server.create("user");
    },

    routes(): void {
      this.urlPrefix = "https://diaries.app";

      //to get entries of particular dairy
      this.get("/diaries/entries/:id", entry.getEntries);
      //to get post of particular users
      this.get("/diaries/:id", diary.getDiaries);

      //to check signin
      this.post("/auth/login", user.signin);
      //to make signup
      this.post("/auth/signup", user.signup);

      //create diary
      this.post("/diaries/", diary.createDiary);
      //create entry
      this.post("/diaries/entry/:id", entry.addEntry);

      //update entry
      this.put("/diaries/entry/:id", entry.updateEntry);
      //update diary
      this.put("/diaries/:id", diary.updateDiary);
    },
  });
};
