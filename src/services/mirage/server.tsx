import { Server, hasMany, Model, Factory, belongsTo, Response } from "miragejs";

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
    environment: env ?? "developent",

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
    },
  });
};
