# Jinno-npm

Jinno is a development environment for UI components. It allows you to browse a component library, view the different states of each component.

# NPM
npm install --save jinno

# Usage 
1. Install the chrome extension 
[https://chrome.google.com/webstore/detail/nggpkpfmdkbaakpndblpandmldendooa](https://chrome.google.com/webstore/detail/nggpkpfmdkbaakpndblpandmldendooa)

2. Add your first component to Jinno
```
Import Jinno from 'jinno'

const MyComponent = ()=>{ return <span>exalmpe</span>}

Jinno(MyComponent,'[component id]')//Choose an Id from your component
```

# Options

### Component Id
Choose your components id so Jinno will always know which props to connect for this function 
```
Jinno(MyComponent,[component id])
```

### Component props
Send the default props of the component
```
let component = Jinno(MyComponent,[component id])
component.setProps({myprops:1})
```