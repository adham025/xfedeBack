export const ApiDocumentation = {
  version: "1.0.0",
  baseUrl: "/api/v1",
  routes: [
    {
      path: "/developer",
      methods: {
        GET: "Get all developers",
        POST: "Create a new developer",
        GET_ID: "Get a single developer by ID",
        PATCH_ID: "Update a developer by ID",
        DELETE_ID: "Delete a developer by ID",
      },
    },
    {
      path: "/project",
      methods: {
        GET: "Get all projects",
        POST: "Create a new project",
        GET_ID: "Get a single project by ID",
        PATCH_ID: "Update a project by ID",
        DELETE_ID: "Delete a project by ID",
      },
    },
    {
      path: "/property",
      methods: {
        GET: "Get all properties",
        POST: "Create a new property",
        GET_ID: "Get a single property by ID",
        PATCH_ID: "Update a property by ID",
        DELETE_ID: "Delete a property by ID",
      },
    },
  ],
};
