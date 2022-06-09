# React micro-frontends using [single-spa](https://single-spa.js.org)

This is a demo application built using micro-frontend architecture with the help of [single-spa](https://single-spa.js.org). If you want to learn about micro-frontends, check these:

- [Micro-frontends.org](https://micro-frontends.org)
- [Single-SPA **Concept: Microfrontends**](https://single-spa.js.org/docs/microfrontends-concept)

In this repository I merged (kinda) two react application into one, but can be further developed separately. And created an easy building process.

> Full instruction (blog) of how I managed to do so is available here, [React Micro-frontend and Single SPA from create-react-app](https://khanshaheb.notion.site/khanshaheb/React-Micro-frontend-and-Single-SPA-from-create-react-app-fbcd4cfee58641e7bbbe06970904afbb) or in this [Instructions.md](./Instructions.md) file.

## Build and Run

Only one command is enough to build and run the application:

```bash
docker-compose up
```

Now visit [`http://localhost:9000`](http://localhost:9000) to see the app in production.

If you don't want to use docker then run the `local-build.sh` file, a `build` folder will be created in the root directory, then go to [`http://localhost:9000`](http://localhost:9000) to view the app.

> Because of using `live-server`, client side routing might be glitchy in the second approach.

## Development

I've made a single command to run all of the application at once. Just run `run-all.sh` command and the application will run in development mode on [`http://localhost:9000`](http://localhost:9000). Any changes in local files, will be effective immediately.

## Standalone Development

If you want to develop any app separately, run `npm run start:standalone` inside the application folder, and the application will start separately in standalone mode.
