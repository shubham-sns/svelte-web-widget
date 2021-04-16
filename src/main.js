import App from "./App.svelte";

const guideRoot = document.createElement("div");
guideRoot.id = "__announcements__";
document.body.appendChild(guideRoot);

const app = new App({
  target: guideRoot,
});

export default app;
