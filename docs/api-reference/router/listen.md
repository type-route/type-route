---
title: <Router>.listen
sidebar_label: listen
---

```tsx
<Router>.listen(navigationHandler: (nextRoute: Route, previousRoute: Route | null) => false | void): () => void;
```

The `listen` function will create a new route change listener. Whenever the application route changes this function will be called with the next matching route. If the given url does not match any route in that router an object with a `false` value for the `name` property and an empty object for the `params` property will be returned.

Returning `false` from the navigation handler function will abort the url change. Read the [Preventing Navigation](../../guides/preventing-navigation.md) guide for more information on how this works.

#### Example

```tsx
const { listen } = createRouter({
  home: defineRoute("/"),
  post: defineRoute({ postId: param.path.string }, p => `/post/${p.postId}`)
});

// Creates a new listener
const removeListener = listen(nextRoute => {
  console.log(nextRoute);
  // logs:
  // { name: false, params: {} }
  // or
  // { name: "home", params: {} }
  // or
  // { name: "post", params: { postId: "abc" }}
  // (where "abc" is whatever was matched from the url)
});

// Removes the listener
removeListener();
```
