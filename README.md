# Pin Simple

> Pinterest, but just the pictures

## Getting Started

1. Set up SSL for localhost by following this [local cert generator](https://github.com/dakshshah96/local-cert-generator) tool

1. Follow the "Create your app" section of the [Pinterest API overview](https://developers.pinterest.com/docs/api/overview/)

1. Add `https://localhost:8888/callback` as a Redirect URI in your Pinterest app

1. Install dependencies

   ```bash
   npm install && npm run client:install
   ```

1. Start her up

   ```bash
   npm run dev
   ```

## Vue Things

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
