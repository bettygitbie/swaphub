import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "SwapHub Next Swagger API Documentation",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      paths: {
        "/": {
          get: {
            tags: ["Homepage"],
            summary: "Get to homepage",
            responses: {
              200: {
                description: "Show fetched items and search",
              },
            },
          },
        },
        "/login": {
          post: {
            tags: ["Authentication"],
            summary: "Allows user to login",
            description: "Logs the user in with email and password",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      email: {
                        type: "string",
                        description: "The user's email address",
                        example: "user@example.com",
                      },
                      password: {
                        type: "string",
                        description:
                          "The user's password (minimum 8 characters)",
                        example: "Password123",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              200: {
                description: "User login successfully.",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Login success",
                        },
                        success: {
                          type: "boolean",
                          example: true,
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "User does not exist or invalid password",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "User does not exist OR Invalid password.",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Internal server error",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/signup": {
          post: {
            tags: ["Authentication"],
            summary: "Allows user to register",
            description: "Logs the user in with email and password",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      email: {
                        type: "string",
                        description: "The user's email address",
                        example: "user@example.com",
                      },
                      password: {
                        type: "string",
                        description:
                          "The user's password (minimum 8 characters)",
                        example: "Password123",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              200: {
                description: "User registered successfully.",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "67abe8bc98863972d8b944df",
                        },
                        username: {
                          type: "string",
                          example: "John Doe",
                        },
                        email: { type: "string", example: "user@example.com" },
                        password: {
                          type: "string",
                          example:
                            "$2a$10$EHQSEWy0urcHeEGAmC498.g9GfOOiXTxr6whOAHE7cAC4l7M7IT4m",
                        },
                        isAdmin: {
                          type: "boolean",
                          example: false,
                        },
                        isVerified: {
                          type: "boolean",
                          example: false,
                        },
                        createdAt: {
                          type: "date",
                          example: "2025-02-11T14:15:52.555+00:00",
                        },
                        updatedAt: {
                          type: "date",
                          example: "2025-02-11T14:15:52.555+00:00",
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "User already exists.",
              },
              500: {
                description: "Internal server error.",
              }
            },
          },
        },
        security: [],
      },
    },
  });
  return spec;
};
