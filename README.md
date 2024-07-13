## Node version

```bash
  Node 20.10.0
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# install package
$ yarn install

# dev mode
$ yarn dev
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Structure

```bash
/public
/src
├── /@handles
├── /apis
├── /controllers
├── /app
│   ├── [locale]
│   │   ├── @admin
│   │   │   ├── (cms)
│   │   │   ├── (public)
│   │   ├── @customer
│   │   ├── layout.tsx
│   ├── api
├── /configs
│   ├── toast
├── /constants
├── /hooks
├── /libraries
│   ├── common
│   │   ├── buttons
│   │   ├── checkbox
│   │   ├── form
│   │   ├── inputs
│   │   ├── pagination
│   │   ├── radio
│   │   ├── table
│   │   ├── upload
│   │   ├── hydrate-wrap.tsx
│   │   ├── index.ts
│   ├── icons
│   ├── layouts
│   ├── theme-switcher
│   ├── top-loader
│   ├── base-init.tsx
│   ├── portal-init.tsx
├── /styles
│   ├── themes
│   ├── globals.scss
│   ├── top-loader.scss
├── /types
├── /utils
│   ├── apis
│   ├── helpers
│   ├── navigation
│   ├── router-events
│   ├── themes
│   ├── upload
│   ├── dictionaries.ts
│   ├── section.ts
├── /middleware.ts
```

## 
## Stay in touch

- Author - [Stable Bui](https://github.com/vungbt)

## License

Nest is [MIT licensed](LICENSE).
