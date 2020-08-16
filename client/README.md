# Phanalytics Client

The client is a VueJS app which is deployed at [phanalytics.app](https://phanalytics.app). The [element-ui component library](https://element.eleme.io/#/) and [Bulma CSS Framework](https://bulma.io/) are both leveraged.

The app points at a deployed (AWS Lambda) instance of the backend. The API integration can be found under [src/api](/client/src/api/index.js).

The Vuex store is used to handle data fetching, including the state of the loaded data (unloaded, loading, loaded, error loading) and appropriately display information to the client.

[Vega](https://vega.github.io/) is used for the histogram visualization. I've recently won a data visualization competition with my Vega and D3 visualizations which can be [found here](https://observablehq.com/@robert-moore/shark-tank).

## Getting Started

### Project setup

```cli
yarn install
```

#### Compiles and hot-reloads for development

```cli
yarn serve
```

#### Compiles and minifies for production

```cli
yarn build
```
