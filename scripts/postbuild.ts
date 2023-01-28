import * as yaml from "yaml";
import { OpenAPIGenerator } from "@asteasolutions/zod-to-openapi";
import { definitions } from "../src/schema.js";
import { writeFileSync } from "node:fs";

// Generate schema
const generator = new OpenAPIGenerator(definitions, "3.0.3");

let doc = generator.generateDocument({
  info: {
    contact: {
      name: "OkayAuth",
      email: "info@okayauth.com",
      url: "https://okayauth.com",
    },
    license: {
      name: "MIT",
      url: "https://okayauth.com",
    },
    version: "1.0.0",
    title: "OkayAuth Auth Server",
    description: "OpenID Connect and OAuth 2.0 server",
  },
  servers: [{ url: "https://auth.okayauth.com" }],
  tags: [
    {
      name: "Token Management",
      description: "Get or revoke access and refresh tokens.",
    },
  ],
});

// Write to file
writeFileSync("openapi.yaml", yaml.stringify(doc));

export {};
