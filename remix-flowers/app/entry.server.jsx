import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";

const ABORT_DELAY = 5000;

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

function handleBotRequest(request, status, headers, context) {
  return new Promise((resolve, reject) => {
    let didError = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={context} url={request.url} />,
      {
        onAllReady() {
          const body = new PassThrough();
          headers.set("Content-Type", "text/html");
          resolve(new Response(body, { status, headers }));
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(request, status, headers, context) {
  return new Promise((resolve, reject) => {
    let didError = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={context} url={request.url} />,
      {
        onShellReady() {
          const body = new PassThrough();
          headers.set("Content-Type", "text/html");
          resolve(new Response(body, { status, headers }));
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
