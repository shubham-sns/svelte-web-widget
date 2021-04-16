<script>
  import { onMount } from "svelte";

  // constants
  // const VEEMO_APP_URL = "http://127.0.0.1:9002";
  const APP_URL = "<-- your iframe web url-->";
  const fetchURL = `<--your fetch url-->`;

  let config = window.config;

  // local vars
  let isHidden = true;

  //  same as componentDidMount
  onMount(async () => {
    await fetch(fetchURL)
      .then((res) => res.json())
      .then((res) => {
        const response = res.payload;
        config = {
          ...window.config,
          ...response.settings,
        };
      });

    // select all custom id and add show-event to them on "mount"
    setTimeout(() => {
      if (config.customSelector && config.htmlSelector) {
        // get selector text without #
        const idSelector = config.htmlSelector.replace(/^#/, "");
        //  get list of elements with thast id
        const listOfSelector = document.querySelectorAll("#" + idSelector);

        // loop over those elements and add event listener
        listOfSelector.forEach((element) => {
          // I dont know why i am adding this styles
          element.style.position = "relative";
          element.style.display = "flex";
          // add event listener
          element.addEventListener("click", show);
        });
      }
    }, 3000);
  });

  const hide = () => {
    isHidden = true;
  };

  const show = () => {
    isHidden = false;
  };
</script>

<!-- * apply `hidden-md` only if config.hideOnMobile is true -->
<div
  class:hidden-md={config.hideOnMobile}
  class="guideSelector"
  style={`${config.slideDirection === "RIGHT" ? "right: 30px" : "left:30px"}`}
  on:click={show}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-bell"
    ><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path
      d="M13.73 21a2 2 0 0 1-3.46 0"
    /></svg
  >
</div>

<div on:click={hide} class={`veemo-modal ${isHidden ? "hidden" : "block"}`}>
  <div class="iframe-container">
    <div
      class="close-btn"
      on:click={hide}
      style={`${
        config.slideDirection === "RIGHT" ? "right:20px" : "left:400px"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x"
        ><line x1="18" y1="6" x2="6" y2="18" /><line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
        /></svg
      >
    </div>

    <iframe
      class={`guide_releases`}
      style={isHidden
        ? `${config.slideDirection === "RIGHT" ? "right" : "left"}:-450px`
        : `${config.slideDirection === "RIGHT" ? "right" : "left"}:0px`}
      src={APP_URL}
      title="Announcement Widget"
      frameborder="0"
    />
  </div>
</div>

<style>
  /* modal styles */
  .veemo-modal {
    height: 100%;
    width: 100%;
    position: fixed;
    -webkit-transition: opacity 0.2s ease-in;
    -o-transition: opacity 0.2s ease-in;
    transition: opacity 0.2s ease-in, background 0.8s;
    opacity: 1;
    z-index: 9999999999;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .hidden {
    display: none;
    background: rgba(0, 0, 0, 0);
  }

  .block {
    display: block;
    background: rgba(0, 0, 0, 0.8);
  }

  /* close button styles */
  .close-btn {
    position: absolute;
    top: 23px;
    width: 24px;
    z-index: 100000000000;
    cursor: pointer;
    opacity: 0.5;
  }
  .close-btn:hover {
    opacity: 1;
  }

  /* guide selector styles */
  .guideSelector {
    color: #fff;
    background: #007bfe;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06),
      0 2px 32px 0 rgba(0, 0, 0, 0.16);
    cursor: pointer;
    transition: 5s ease all;
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    /*position */
    bottom: 30px;
    /* view */
    /* transform: scale(0);
    opacity: 0; */
  }

  /* guide iframe styles */
  .guide_releases {
    position: absolute;
    width: 450px;
    min-height: 100vh;
    transition: -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
    background: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  }

  .show-releases {
    right: 0;
  }

  .hide-releases {
    right: -450px;
  }

  /* config styles */
  @media (max-width: 768px) {
    .hidden-md {
      display: none !important;
    }
  }
</style>
