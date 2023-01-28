import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";

import { z } from "zod";

extendZodWithOpenApi(z);
const registry = new OpenAPIRegistry();

const ClientCredentialsBasicAuth = registry.registerComponent(
  "securitySchemes",
  "clientCredentialsBasicAuth",
  {
    description:
      "The client ID and secret are sent as the username and password of an HTTP Basic Auth request.",
    type: "http",
    scheme: "basic",
  }
);

const ClientIdentifier = registry.register(
  "ClientIdentifier",
  z.string().openapi({
    example: "a1b2c3d4e5f6g7h8i9j0",
    description:
      "The client ID assigned on registration. Cannot be changed by the client - if the value sent by the client when updating a registration does not match the current value, the request will be rejected.",
  })
);

const ClientCredentialsRequest = registry.register(
  "ClientCredentialsRequest",
  z.strictObject({
    grant_type: z.literal("client_credentials"),
    client_id: ClientIdentifier,
    client_secret: z.string().openapi({
      example: "a1b2c3d4e5f6g7h8i9j0",
      description: "Client secret assigned on registration.",
    }),
    scope: z.string().optional(),
  })
);

const TokenRequest = registry.register(
  "TokenRequest",
  z.discriminatedUnion("grant_type", [ClientCredentialsRequest])
);

const TokenResponse = registry.register(
  "TokenResponse",
  z.object({
    access_token: z.string().openapi({
      example: "a1b2c3d4e5f6g7h8i9j0.a1b2c3d4e5f6g7h8i9j0.a1b2c3d4e5f6g7h8i9j0",
      description: "The newly-obtained access token",
    }),
    token_type: z.enum(["bearer"]).openapi({
      description:
        "The type of the token. Currently only bearer tokens are emitted.",
    }),
    expires_in: z.number().optional().openapi({
      example: 3600,
      description: "The lifetime of the access token, in seconds.",
    }),
    refresh_token: z.string().optional().openapi({
      description:
        "The refresh token to use, for an 'authorization_code' token request.",
    }),
    scope: z.string().optional().openapi({
      description: "The effective scope of the newly-obtained token.",
    }),
  })
);

const TokenErrorResponse = registry.register(
  "TokenErrorResponse",
  z.object({
    error: z
      .enum([
        "invalid_request",
        "invalid_client",
        "invalid_grant",
        "unauthorized_client",
        "unsupported_grant_type",
        "invalid_scope",
      ])
      .openapi({
        description:
          "A machine-readable category for the error, as in [RFC 6749, §4.1.2.1](https://tools.ietf.org/html/rfc6749#section-4.1.2.1).",
      }),
    error_description: z.string().optional().openapi({
      description:
        "A human-readable error message that gives details about the error.",
    }),
    error_uri: z.string().optional().openapi({
      description: "A URL that gives more information about the error.",
    }),
  })
);

registry.registerPath({
  operationId: "ClientCredentialsToken",
  path: "/oauth/token",
  tags: ["Token Management"],
  method: "post",
  summary: "Request an access token",
  description: `The token endoint, as described in [RFC 6749 §3.2](https://www.rfc-editor.org/rfc/rfc6749.html#section-3.2), used in three
  cases:
   * Authorization Code Grant [RFC 6749 §4.1](https://www.rfc-editor.org/rfc/rfc6749.html#section-4.1), with the PKCE
     extension [RFC 7636 §4.5](https://www.rfc-editor.org/rfc/rfc7636.html#section-4.5);
   * Client Credentials Grant [RFC 6749 §4.4](https://www.rfc-editor.org/rfc/rfc6749.html#section-4.4);
   * Token Refresh [RFC 6749 §6](https://www.rfc-editor.org/rfc/rfc6749.html#section-6);`,
  //security: [{ [ClientCredentialsBasicAuth.name]: [] }],
  security: [],
  request: {
    body: {
      description: "IDK some stuff",
      required: true,
      content: {
        ["application/x-www-form-urlencoded"]: {
          schema: TokenRequest,
        },
      },
    },
  },
  responses: {
    [200]: {
      description: "New access token generated.",
      content: {
        "application/json": {
          schema: TokenResponse,
        },
      },
    },
    [400]: {
      description: "Some parameters were invalid.",
      content: {
        "application/json": {
          schema: TokenErrorResponse,
        },
      },
    },
  },
});

export const { definitions } = registry;
