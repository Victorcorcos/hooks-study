import React from "react";
import ReactDOM from "react-dom";
import { getMySDKComponents } from "./index";

let hotReloadOn = false;
let masterModule;
export const JinnoInit = (getMasterModule) => {
  masterModule = getMasterModule;

  if (hotReloadOn) {
    startHotReloadInAllApp();
  }
};

const startHotReloadInAllApp = () => {
  if (masterModule && masterModule.hot && hotReloadOn) {
    masterModule.hot.accept();
  }
};

export const stopHotReload = () => {
  hotReloadOn = false;
};

export function checkIfToStartHotReload(clientId) {
  if (hotReloadOn) {
    startHotReload(clientId);
  } else {
    let detail = { clientId };
    var event = new CustomEvent("jinnoOpenCanvas", {
      detail: detail,
    });
    document.dispatchEvent(event);
  }
}

export function startHotReload(clientId, onlyUpdate = false) {
  if (onlyUpdate && !hotReloadOn) {
    return;
  }

  let component = getMySDKComponents().find((comp) => comp.typeId === clientId);
  if (!component) {
    return;
  }
  let Component = component.Component; //the react component
  let forwardModule = component.forwardModule; //the module - for the hot reload
  let params = component.params ? component.params : {};
  let injectComponentId = params.injectComponentId; //the element id for injecting the coded
  let props = params.props;
  props.injectComponentId = injectComponentId;

  hotReloadOn = true;
  if (forwardModule && forwardModule.hot) {
    if (forwardModule && forwardModule.hot) {
      // module.hot.decline();
      forwardModule.hot.accept();
    }
    startHotReloadInAllApp();
  }

  try {
    if (document.getElementById(injectComponentId)) {
      ReactDOM.render(
        React.createElement(Component, props, null),
        document.getElementById(injectComponentId)
      );
    }
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener("toggleHotReload", function (e) {
  if (e && e.detail && e.detail.hotReloadStatus !== undefined) {
    hotReloadOn = e.detail.hotReloadStatus;
  }

  if (hotReloadOn) {
    startHotReloadInAllApp();
  }
});
