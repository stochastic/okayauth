---
description: What (and why) is OkayAuth
id: what-is-okayauth
title: What is OkayAuth?
---

# What is OkayAuth?

OkayAuth is an open source OAuth2/OIDC[^1] provider designed for modern edge environments (currently Cloudflare).
It's aim is to be fast, secure, zero ops, and low cost.

[^1]: Currently only `client_credentials` flow, because that's all I needed.

# Why did I create OkayAuth?

I needed to secure a developer API and was disappointed by Cognito and Auth0. Their pricing and service limits didn't make sense for me. I found it was actually quite easy to implement the necessary functions on Cloudflare Workers and thought I'd open source it. 

# Why Cloudflare

1. It's fast - Cloudflare Workers run at the edge (closest to your users) and their Web Crypto API implementation is written in Rust.
2. It's zero-ops - Cloudflare Workers is serverless. Deploys use Terraform.
3. It's relatively low cost - You can generate 1,000,000 JSON Web Tokens for less than $1.50. 

# Is OkayAuth spec compliant?

No but that's the goal. You can be a hero and help me finish implementing the various RFCs that make up OAuth and OIDC.