import React from "react";
import ReactDOM from "react-dom";
import { checkIfToStartHotReload, JinnoInit } from "./JinnoHotReload";
import detectIfToShowInstallExtension from "./checkIfShowInstallPopup";
let mySDKComponents = [];

function generateSession() {
  return "jinno" + Math.random().toString(36).substr(2, 9);
}
document.addEventListener("getAllComponents", function (e) {
  mySDKComponents.forEach((item) => {
    let detail = { clientId: item.typeId, params: item.params };
    var event = new CustomEvent("saveComponent", {
      detail: detail,
    });
    document.dispatchEvent(event);
  });
});

export function getMySDKComponents() {
  return mySDKComponents;
}

function checkIfItdev() {
  if (
    typeof process === "undefined" ||
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === "development"
  ) {
    // dev code
    return true;
  } else {
    // production code
    return false;
  }
}

export default function Jinno(
  component,
  id,
  forwardModule,
  props = {},
  properties = {}
) {
  if (!id && component && component.name) {
    id = component.name;
  } else if (!id || !component || (!component.name && !id)) {
    console.error(
      "You have to add id to Jinno, example: Jinno(myComponent,'[myComponentId:string]')"
    );
  }

  detectIfToShowInstallExtension();

  let findComponent = mySDKComponents.find((comp) => comp.typeId === id);
  let componentElementId =
    findComponent && findComponent.elementId
      ? findComponent.elementId
      : generateSession();

  let jinnoFunctions = {
    setProps: (newProps) => {
      setProps(id, componentElementId, newProps);
    },
  };

  if (findComponent) {
    findComponent.forwardModule = forwardModule; // update the new module
    findComponent.Component = component; // update the new component

    if (findComponent.params) {
      findComponent.params.props = { ...props, ...findComponent.params.props }; // update the new props
    }

    checkIfToStartHotReload(id);
    //if we already added this component
    return jinnoFunctions;
  }

  try {
    id = id.replace(/[^A-Z0-9]/gi, "");
    id = id.charAt(0).toUpperCase() + id.slice(1);
  } catch (e) {
    console.error("Id is invalid, plaese use only chars and numbers");
  }

  const computedStyle = window.getComputedStyle(document.body);

  props.hiddenStyle = {
    direction: computedStyle["direction"],
    boxSizing: computedStyle["box-sizing"],
    textAlign: computedStyle["text-align"],
  };

  const params = {
    clientId: id,
    title: component && component.name ? component.name : "",
    injectComponentId: componentElementId,
    props: props ? JSON.stringify(props) : null,
    isReactComponent: isReactComponent(component),
    isDev: checkIfItdev(),
  };

  let data = {
    typeId: id,
    elementId: componentElementId,
    Component: component,
    forwardModule,
    params,
  };

  mySDKComponents.push(data);

  if (properties && properties.title) {
    params.title = properties.title;
  }

  if (properties && properties.width) {
    params.width = properties.width;
  }

  if (properties && properties.height) {
    params.height = properties.height;
  }

  // let classComponent = new JinnoComponent(data);
  // mySDKComponentsClass.push(classComponent)

  let detail = { clientId: id, params };
  var event = new CustomEvent("saveComponent", {
    detail: detail,
  });
  document.dispatchEvent(event);

  checkIfToStartHotReload(id);

  return jinnoFunctions;
}

function setProps(id, componentElementId, newProps) {
  let findComponent = mySDKComponents.find((comp) => comp.typeId === id);
  let oldProps =
    findComponent && findComponent.params && findComponent.params.props
      ? findComponent.params.props
      : {};
  if (typeof oldProps === "string") {
    try {
      oldProps = JSON.parse(oldProps);
    } catch (e) {
      oldProps = {};
    }
  }

  let setNewProps = { ...oldProps, ...newProps };
  if (findComponent.params) {
    findComponent.params.props = setNewProps;
  }

  RenderComponent(componentElementId, setNewProps);
}

const RenderComponent = (id, props) => {
  let findComponent = mySDKComponents.find((comp) => {
    return comp.elementId === id;
  });
  if (findComponent && findComponent.Component) {
    if (findComponent.params) {
      findComponent.params.props = { ...findComponent.params.props, ...props }; //update the props if we have something from the server
      props = findComponent.params.props;
    }

    let Component = findComponent.Component;
    let element = document.getElementById(id);
    if (element) {
      let ReactElement = React.createElement(Component, props, null);
      ReactDOM.render(ReactElement, element);
    }
  }
};

function isReactComponent(Component) {
  if (typeof Component !== "function") {
    return false;
  }
  let isReact = React.isValidElement(Component); //check that it's a valid react element
  let haveReturn = String(Component).includes("return"); //check that the function have a return

  // return isReact && haveReturn
  return haveReturn;
}

document.addEventListener(
  "sendDataToJino",
  function (e) {
    //listener on changed nodeId
    if (e && e.detail && e.detail.function === "RenderComponent") {
      let data = e.detail ? e.detail.data : {};
      let props = data && data.props ? data.props : {};
      if (typeof props === "string") {
        try {
          props = JSON.parse(props);
        } catch (e) {}
      }
      let id = data && data.id ? data.id : {};

      if (React && ReactDOM) {
        RenderComponent(id, props);
      } else {
        RenderOnInit.push({ id, props });
      }
    }
  },
  false
);

// var React;
// var ReactDOM;
var RenderOnInit = [];
export function JinnoInitReact(ReactNpm, ReactDOMNpm) {
  React = ReactNpm;
  ReactDOM = ReactDOMNpm;

  RenderOnInit.map((item) => {
    RenderComponent(item.id, item.props);
  });
  RenderOnInit = [];
}

export const showJinno = () => {
  let scriptLink = "https://jinno-sdk.s3.amazonaws.com/sdk.js";
  var script = document.createElement("script");
  script.src = scriptLink;

  document.head.appendChild(script);
};

export { JinnoInit };
