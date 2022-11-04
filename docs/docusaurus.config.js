// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Immich",
  tagline:
    "Self-hosted photo and video backup solution directly from your mobile phone",
  url: "https://documentation.immich.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "immich-app", // Usually your GitHub org/user name.
  projectName: "immich", // Usually your repo name.
  deploymentBranch: "main",
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
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,

          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/immich-app/immich/tree/main/docs/",
        },
        // blog: {
        //   showReadingTime: true,
        //   editUrl: "https://github.com/immich-app/immich/tree/main/docs/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: "site_announcement_immich",
        content: `⚠️ The project is under <strong>very active</strong> development. Expect bugs and changes. Do not use as a <strong>single source</strong> to store of your photos and videos!`,
        backgroundColor: "#593f00",
        textColor: "#ffefc9",
        isCloseable: false,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: false,
        },
      },
      navbar: {
        logo: {
          alt: "Immich University Logo",
          src: "img/color-logo.png",
          srcDark: "img/logo.png",
        },
        items: [
          {
            to: "/docs/overview/introduction",
            position: "right",
            label: "Documentation",
          },
          // { to: "/blog", label: "Blog", position: "right" },
          {
            href: "https://github.com/immich-app/immich",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Overview",
            items: [
              {
                label: "Welcome",
                to: "/docs/overview/introduction",
              },
              {
                label: "Installation",
                to: "/docs/installation/requirements",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.com/invite/D8JsnBEuKb",
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
                href: "https://github.com/immich-app/immich",
              },
            ],
          },
        ],
        copyright: `Immich is available as open source under the terms of the MIT License.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
