// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const path = require('path')

/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
const themeConfig = {
  defaultMode: 'dark',
  disableSwitch: true,
  navbar: {
    logo: {
      alt: 'Over the Years Logo',
      src: 'img/logo.svg',
    },
    items: [
      {
        type: 'doc',
        docId: 'book',
        position: 'left',
        label: 'The Book',
      },
      {
        href: 'https://cameronaziz.dev',
        label: 'About Me',
        position: 'right',
      },
    ],
  },
  // prism: {
  //   theme: lightCodeTheme,
  //   darkTheme: darkCodeTheme,
  // },
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Over the Years',
  tagline: 'Sharable Typescript knowledge to help fellow expert engineers.',
  url: 'https://typescript.cameronaziz.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'cameronaziz',
  projectName: 'over-the-years',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig,
  plugins: [
    path.resolve(__dirname, 'plugins', 'webpack'),
    [
      path.resolve(__dirname, 'plugins', 'dynamic-routes'),
      {
        routes: [
          {
            path: '/writer',
            exact: false,
            component: '@site/src/routes/writer/index.tsx'
          },
          {
            path: '/notes',
            exact: false,
            component: '@site/src/routes/reader/index.tsx'
          }
        ]
      }
    ],
  ],
}

module.exports = config
