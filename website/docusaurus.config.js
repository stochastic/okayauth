// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "OkayAuth",
  tagline: "World's Okayest Open Source OAuth2 Provider",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://okayauth.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "stochastic", // Usually your GitHub org/user name.
  projectName: "okayauth", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/stochastic/okayauth/tree/main/website/docs",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/stochastic/okayauth/tree/main/website/blog",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],[
      /** @type {import('redocusaurus').PresetEntry} */
      "redocusaurus",
      {
        specs: [
          {
            spec: "static/openapi.yaml",
            route: "/api",
          },
        ],
        theme: {
          primaryColor: "#7f2e85",
          primaryColorDark: "#ff52f1"
        }
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/okayauth-social-card.png",
      navbar: {
        title: "OkayAuth",
        logo: {
          alt: "OkayAuth Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "getting-started",
            position: "left",
            label: "Docs",
          },
          {
            label: 'API',
            position: 'left',
            to: '/api',
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/stochastic/okayauth",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/docs/getting-started",
              },
              {
                label: "What is OkayAuth?",
                to: "/docs/what-is-okayauth",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/okayauth",
              },
              {
                label: "Discord",
                href: "https://discord.gg/gh4EcMSTkz",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/stochastic",
              },
              {
                label: "Twitch",
                href: "https://twitch.tv/okayauth",
              },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/stochastic/okayauth",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OkayAuth`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
