# Ajax Client

Observable based HTTP client on top of [rxjs/ajax](https://rxjs-dev.firebaseapp.com/api/ajax/ajax) for browser and node.js.

## Using

```ts
const ajaxClient = new AjaxClient();

ajaxClient.post<PostUserResponse, PostUserBody>('/users', { name: ... }, { headers: ... }).subscribe((userRes) => {
  [...]
});
```

## TypeScript

Ajax client is coded entirely in TypeScript.

## Building/Testing

- `npm install`
- `npm run build`
- `npm run lint`
- `npm run test` or `npm run test:watch`
