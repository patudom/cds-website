# cds-website

This repository contains the source code for the CosmicDS website. The website is created using [Vue.js](https://vuejs.org/) and uses [Vuetify](https://vuetifyjs.com/en/) for styling.

## Project structure

For contributors, a brief breakdown of the project structure is as follows:
- The top-level directory primarily contains various configuration files, along with the license.
- The `public` directory is the home for static content that we want exposed to users - for example, `public/cosmicds.jpg` will be accessible in the built webpage as `<root-url>/cosmicds.jpg`.
- The `src` directory contains the Vue source code. Currently all of the code is written in TypeScript. Continuing this would be a good practice, but one of the benefits of Vue is that using TypeScript or not can be controlled at a component level. `App.vue` and `main.ts` are the primary entry points for the page, although they contain almost no content themselves.
  * `assets` is for static content that won't get exposed to the user (that is, it won't get its own URL).
  * `components`, and its sub-folders, are for Vue components, ideally ones that will get re-used across multiple pages. The components that define a specific route should be placed in `views` (see below). For a more thorough explanation, see [this StackOverflow answer](https://stackoverflow.com/a/50866150).
  * `layouts` contains the layouts that we want to define across the site. This project is set up to use a layout-based system reminiscent of something like [Nuxt](https://nuxtjs.org/). This setup allows us to create views and components without worrying about the overall page layout (e.g. the nav bar, footer, etc). `layouts/AppLayout.vue` is the layout-managing component, and will automatically update the layout (if necessary) on a route change. In the current project configuration, layouts are set by the current route, with `layouts/DefaultLayout.vue` serving as the layout is no layout is specified. See the `router` section below for how to specify a layout.
  * `mixins` contain any mixins that we want to use. To use a mixin in a component, the component should inherit from the output of the `Mixins` function from [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator), rather than that package's `Vue` class.
  * `plugins` contains any plugins that we want to use. These get imported in `main.ts`.
  * `router` contains the necessary code for the Vue router. To define a new route, add a new entry to `routes` in `router/index.ts`. Each route should have the structure:
  ```
  {
    path: string = "/the-route-to-use",
    name: "Route name",
    component: ComponentToUse,
    meta: {
      layout: "LayoutName"
    }
  }
  ```
  Here `ComponentToUse` is the component class from `views` that should serve as the main component of the route, and `meta.layout` is the name of the layout component that you want (not a reference to the component itself). If `meta.layout` is not specified, the default layout will be used. Lazy-loading of components is possible through the `importComponent` function in `router/index.ts`. An instance of the component class will automatically be placed inside the specified layout.
  * `store` contains the Vuex store, which is split into various modules. Currently, `website` contains website-level settings, while `api` contains functionality for interacting with the CosmicDS API. The Vuex store in this repository uses the decorators from [vuex-property-decorators](https://github.com/championswimmer/vuex-module-decorators).
  * `utils` contains any utility code that doesn't fit elsewhere.
  * `views` is intended to contain the components for the actual routes, or "pages", that a user will visit. Basically, anything that gets its own URL should be a component in `views`.
  * 

## Building and testing

The site can be built using `npm run build`. Linting (using ESLint) can be performed using `npm run lint`  Assuming there are no errors, you can run the development server for local testing using `npm run serve`.

## Deployment

On any update to the main branch, the website is rebuilt and deployed to GitHub Pages via a GitHub Actions workflow.
