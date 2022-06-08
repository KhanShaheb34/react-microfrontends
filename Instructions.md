# React Micro-frontend and Single SPA from create-react-app

What? What is a micro-frontend?

Did you ever heard of micro-service architecture? Where a backend application is broken into some semi-independent services, and then developed by different team may be using different technologies. Micro-frontend is the same but it is for frontend of an application. This is a new pattern where web application UIs (front ends) are composed from semi-independent fragments that can be built by different teams using different technologies. Ok! Enough talking. You want to learn more? Check these out:

- [Micro-frontends.org](https://micro-frontends.org)
- [Single-SPA **Concept: Microfrontends**](https://single-spa.js.org/docs/microfrontends-concept)

Let’s get into work now. Let’s assume that you’re building a large website and different parts of your web app is built using `ReactJS` separately. You want to combine them in a way that, they can be developed further as independent applications. And it should be easy to add a sub application, or remove any part from your beautiful web app.

Suppose there are three parts of your application:

- first-app
- second-app
- navbar

And you want to combine them in a way that route `/first` will open the `first-app`, route `/second` will open the `second-app` and the `navbar` will be shown in every page. Both the `first-app` and `second-app` was created using `create-react-app`. So we have to convert it to a `single-spa` application. Btw, `single-spa` is a javascript framework that made implementing micro-frontend so easy (not always). To learn more about `single-spa` [check the doc](https://single-spa.js.org/docs/getting-started-overview).

The steps for combining these applications and adding a nav bar to move from one app to another:

1. Converting both of our `create-react-app` sub applications to `single-spa` applications
2. Creating a root application (`root-config`)
3. Registering our sub applications to the root application
4. Fix routes inside our react applications
5. Make the application easily build and deploy

## Converting a `create-react-app` to a `single-spa` application

This one may be the hardest and confusing part of the full process. I tried all of the four processes mentioned in the [official documentation](https://single-spa.js.org/docs/faq/#create-react-app), but they didn’t work. So I had to make some tweaks. Let’s get started.

> ⚠️ Don’t forget to commit your changes before following these steps

At first open a react application and uninstall `react-scripts`, remove all scripts from `package.json` and run this command:

```bash
npx create-single-spa . --moduleType app-parcel --framework react --skipInstall
```

It will ask which package manager you want to use, if you want to use typescript or not, the name of your organisation and application. After answering the prompts, it will ask if it should overwrite certain files including `package.json`. Type `y` and give permission to overwrite those files. Version of some the `npm` packages will be changed as `single-spa` uses `react@17` by default. Revert those version changes and run `npm install`. May be `react@18` support will be available by the time you are reading this blog.

Now delete your `src/index.ts` file and `public` folder. The contents of public folder will be handled somewhere else. A new entry-point, `src/orgname-appname.ts`, will be created for your react application. But you might have some providers, router config, css imports in the `src/index.ts` file. Move them to either `src/App.tsx` or to the entry-point file.

Currently your entry-point is pointing to another react application exported from `src/root.component.tsx`. Delete this file, and import your application from `src/App.tsx` to `src/orgname-appname.ts`.

Now remove `eslintConfig` from `package.json` or move them to the `.eslintrc` file. Our work here is done so far. To check if everything is working properly, run:

```bash
npm run start:standalone -- --port 8500
```

If you see your beautiful website working properly on [`http://localhost:8500`](http://localhost:8500), then you can move to the next step, creating the `root-config` application.

## Creating a root application (`root-config`)

Root-config is the root application for your micro-frontend. Sub application bootstrap, mount, unmount, intra-app routing will be handled by this application. To know more about this application, [check this out](https://single-spa.js.org/docs/configuration).

Go to your application root directory and run this command to create a root application:

```bash
npx create-single-spa --moduleType root-config --layout root-app
```

To check everything is working correctly, run `npm start` and go to [`http://localhost:9000/`](http://localhost:9000/).

## Registering our sub applications to the root application

Now you have to register your applications. Go to `src/index.ejs` on `root-app` and find `systemjs-importmap`. You will find two script blocks. One is for shared dependencies, another one is for registering application. As we are using ReactJS, we have to add `react` and `react-dom` on the shared dependency import map. And it will look like this:

```html
<script type="systemjs-importmap">
  {
    "imports": {
      "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js",
      "react": "https://unpkg.com/react@18/umd/react.development.js",
      "react-dom": "https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    }
  }
</script>
```

Then in another import map, you have to import the JS files of the projects you want to add in this single-spa. Ours is two application, `first-app`, `second-app` and `navbar`. Running on port `8500`, `8501` and `8502` respectively. So we will write it like this:

```html
<% if (isLocal) { %>
<script type="systemjs-importmap">
  {
    "imports": {
      "@orgname/root-config": "//localhost:9000/orgname-root-app.js",
      "@orgname/first-app": "//localhost:8500/orgname-first-app.js",
      "@orgname/second-app": "//localhost:8501/orgname-second-app.js",
      "@orgname/navbar": "//localhost:8502/orgname-navbar.js"
    }
  }
</script>
<% } %>
```

You can remove the first import if you want.

Now we have to register our applications to respective paths. Go to `src/microfrontend-layout.html` and add these routes like this:

```html
<single-spa-router>
  <main>
    <nav>
      <application name="@orgname/navbar"></application>
    </nav>
    <route path="first">
      <application name="@orgname/first-app"></application>
    </route>
    <route path="second">
      <application name="@orgnam/second-app"></application>
    </route>

    <route path="/" exact/>
      <h1>Welcome to a Micro-frontend App</h1>
    </route>

    <route default>
      <h1 class="not-found">404 Not Found</h1>
    </route>
  </main>
</single-spa-router>
```

Now if you run `npm start` you’ll see the homepage with the nav bar. Your application will be mounted on `/first` and `/second` paths. Go to one of them, to see your beautiful application.

What? You don’t see your application? Did you use client side routing? Using something like `react-router`?

## Fix routes inside our react applications

Add `/first` before every route path and internal links of your beautiful application. Do the same for all applications that have client side routing. Add the path specified in the root application to the start of all of the routes and internal links inside your application.

Add these types of line on all applications’ routers:

```html
<Route path="/" element="{<Navigate" to="/first" replace />} />
```

This will help, when you’d develop your applications separately. Now, you can this command on each application with corresponding port to start the apps:

```bash
npm start -- --port {port}
```

And run this command from the root application:

```bash
npm start
```

Go to [`http://localhost:9000`](http://localhost:9000) and see your beautiful applications merged together. Now let’s go to the final part.

## Make the application ready for build and deploy

The most interesting part. How’d you make it easy to build and deploy your application? I used docker and nginx for building and serving my application. Here is the `dockerfile` I wrote to build a react app:

```docker
FROM node:18-alpine

RUN ["mkdir", "-p", "/usr/src", "/usr/build/first"]
WORKDIR /usr/src
COPY ./package.json .
COPY ./package-lock.json .
RUN ["npm", "ci", "--prefer-offline", "--no-audit"]

COPY . .
RUN ["npm", "run", "build"]
CMD ["cp", "-r", "./dist/.", "/usr/build/first"]
```

And kind of similar `dockerfile` for root application:

```docker
FROM node:18-alpine

RUN ["mkdir", "-p", "/usr/src", "/usr/build"]
WORKDIR /usr/src
COPY ./package.json .
COPY ./package-lock.json .
RUN ["npm", "ci", "--prefer-offline", "--no-audit"]

COPY . .
RUN ["npm", "run", "build"]
CMD ["cp", "-r", "./dist/.", "/usr/build"]
```

I used a shared volume for the build folders, so all of the build folders ultimately ended up in the same directory. My `docker-compose.yml` looks like this:

```yaml
version: "3.9"
services:
  firstapp:
    build: ./first-app
    volumes:
      - build:/usr/build
  secondapp:
    build: ./second-app
    volumes:
      - build:/usr/build
  navbar:
    build: ./navbar
    volumes:
      - build:/usr/build
  rootapp:
    build: ./root-app
    volumes:
      - build:/usr/build
  nginx:
    build: ./nginx
    volumes:
      - build:/usr/share/nginx/html
    ports:
      - 9000:80
    depends_on:
      - firstapp
      - secondapp
      - navbar
      - root
volumes:
  build:
```

As nginx does not support client side routing out of the box, I had to write a custom configuration file and replace the `/etc/nginx/conf.d/default.conf` with it:

```nginx
server {
 listen 80;
 listen [::]:80;
 root /usr/share/nginx/html;
  location / {
    try_files $uri /index.html;
  }
}
```

Now only one command is enough to build and start a server:

```bash
docker-compose up
```

Boom! Now visit [`http://localhost:9000`](http://localhost:9000) to see your beautiful app in production.

> ❗ A demo micro-frontend application is available on this repository. Check it out, of you have any confusion: [KhanShaheb34/react-microfrontend](https://github.com/KhanShaheb34/react-microfrontend)
