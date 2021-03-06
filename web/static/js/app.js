// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

const slug = document.location.pathname.split("/")[1];
const requestUrl = document.location.protocol + "//" + document.location.host + "/" + slug;
const elmDiv = document.getElementById('elm-main');
const app = Elm.embed(Elm.HttpSpy, elmDiv, {requests: null, requestUrl: requestUrl});

socket.connect();
const requestChannel = socket.channel("requests:" + slug);

requestChannel.join()
  .receive("ok", resp => console.log("joined the request channel", resp))
  .receive("error", reason => console.error("join failed", reason));

requestChannel.on("request", app.ports.requests.send);

window.HttpSpy = app;
