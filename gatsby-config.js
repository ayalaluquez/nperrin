module.exports = {
  siteMetadata: {
    baseTitle: 'Work',
    title: 'Norman Perrin',
    description: 'Work website of Norman Perrin.',
    author: '@NormanPerrinOK',
    keywords: 'work, programmer, programador, systems, sistemas, norman, perrin, nperrin, comunidadit, utn, argentina',
    host: 'https://work.nperrin.io',
    rootHost: 'https://nperrin.io',
    twitter: 'https://twitter.com/NormanPerrinOK',
    linkedin: 'https://www.linkedin.com/in/norman-perrin/',
    github: 'https://github.com/normanperrin',
    youtube: 'https://www.youtube.com/channel/UCHHiHCFtw64RFvujf6Klzng',
    source: 'https://github.com/NormanPerrin/nperrin/tree/work/',
    excludedLinks: [
      '/dev-404-page/',
      '/404/',
      '/credits/',
      '/error/'
    ]
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/past-work`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/icons`,
        name: 'icons',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/icons`
        }
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'images'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './static/favicon.png',

        appName: null,
        appDescription: null,
        developerName: 'Norman Perrin',
        developerURL: 'https://nperrin.io/',
        dir: 'auto',
        lang: 'en',
        background: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    }
  ]
}