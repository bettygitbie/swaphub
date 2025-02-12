import { Description } from "@mui/icons-material";
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
              },
            },
          },
        },
        "/allusers": {
          get: {
            tags: ["Users"],
            summary: "Get all users",
            description: "Get all users. This is done by Admin only",
            responses: {
              200: {
                description: "Users found.",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Users found",
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "There are no users.",
              },
              500: {
                description: "Internal server error.",
              },
            },
          },
        },
        "/user": {
          get: {
            tags: ["Users"],
            summary: "Get single user information",
            description: "Get single user information",
            responses: {
              200: {
                description: "User found",
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
              404: {
                description: "User not found! Please signin.",
              },
              500: {
                description: "Internal server error.",
              },
            },
          },
        },
        '/profile':{
          put: {
            tags: ['Users'],
            description: 'Update the user\'s profile',
            summary: 'update user\'s profile',
          }
        },
        '/items/item':{
          get: {
            tags:['Items'],
            description: 'Get all items sorted',
            summary: 'Get all items',
            responses:{
              200: {
                description: 'Items found',
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Items found",
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "There are no items.",
              },
            }
          }
        },
        '/items/[id]':{
          patch:{
            tags:['Items'],
            description: 'Patch/edit item by Id',
            summary: 'edit item',
            requestBody:{
              content:{
                'application/json':{
                  schema:{
                    type: 'object',
                    properties: {
                      name:{
                        type:'string',
                        example: 'Test Item',
                      },
                      description: {
                        type: 'string',
                        example: 'This is a test item'
                      },
                      price: {
                        type: 'float',
                        example: 4.99,
                      },
                      status:{
                        type:'string',
                        example: 'available'
                      }
                    }
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Item updated successfully.',
                content: {
                  'application/json':{
                    schema:{
                      type: 'object',
                      properties: {
                        name:{
                          type:'string',
                          example: 'Test Item',
                        },
                        description: {
                          type: 'string',
                          example: 'This is a test item'
                        },
                        price: {
                          type: 'float',
                          example: 3.99,
                        },
                        status:{
                          type:'string',
                          example: 'sold'
                        }
                      }
                    }
                  }
                }
              },
              
            },
          }
        },
        security: [],
      },
    },
  });
  return spec;
};
