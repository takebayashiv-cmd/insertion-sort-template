import { Node } from "./node.mjs";
import { Pointer } from "./pointer.mjs";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function removeChildren(elem) {
  while (elem.childNodes.length > 0) {
    elem.removeChild(elem.childNodes[0]);
  }
}

function createApp() {
  // put private variables here
  const self = {
    handleOk: handleOk,
    handleNextPos: handleNextPos,
    handleLocate: handleLocate,
    handleInsert: handleInsert
  };

  // ====== API for application =======
  function handleOk() {
    console.log('handleOk called');
  }

  function handleNextPos() {

  }

  function handleLocate() {

  }

  async function handleInsert() {

  }
  // ======= End of API for application ===

  // ======= helper functions ========
  function getNodeById(id) {
    for (let i = 0; i < node_array.length; i++) {
      const nd = node_array[i];
      if (Number(nd.g.id) === id) {
        return nd;
      }
    }
  }

  function resetIds() {
    for (let i = 0; i < node_array.length; i++) {
      node_array[i].g.setAttribute("id", i);
    }
  }
  // ======== end of helper functions =======
  
  return self;
}

function init() {
  console.log("init called");
  const myApp = createApp();
  const ok_button = document.getElementById("ok_button");
  ok_button.addEventListener("click", () => {
    myApp.handleOk();
  });
}
