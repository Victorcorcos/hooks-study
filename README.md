# React Toy Project 🧸

Apenas um pequeno projeto para testar alguns **react hooks**.

* **`useMemo`**
1. Memoriza o **valor** resultante de uma função
2. Executa a função **assim que o componente é renderizado**
3. Fica em cache até que o array de dependências mude

* **`useCallback`**
1. Memoriza uma **função**
2. Executa a função **apenas quando é chamada diretamente**
3. Fica em cache até que o array de dependências mude

* **`useRef`**
1. Mantém o valor **independente de renderizações**

* **`useContext`**
1. **Compartilha dados com múltiplos components**
2. Fornece uma maneira de passar dados pela árvore de componentes **sem passar manualmente os props a cada componente aninhado**

* **`useReducer`**
1. É usado para manipulações de estado (**state**) e de transições entre estados (**state transitions**) complexas.

* **`useDebugValue`**
1. Mostra uma **label** no DevTools ao lado do hook que chamou o `useDebugValue`
2. `useDebugValue(isLogged ? "Logged" : "Not logged")`

* **`useLayoutEffect`**
1. É um `useEffect` que só é chamado quando o DOM se altera

* **`memo`**
1. Memoriza o **componente inteiro** ao invés de uma função / valor de uma função


# How to Run 💻

```js
npm start
```


# References 🌐

1. https://kinsta.com/pt/blog/usecallback-react/#:~:text=useCallback%20vs%20usarMemo&text=A%20diferen%C3%A7a%20chave%20%C3%A9%20que,voc%C3%AA%20pode%20chamar%20mais%20tarde
2. https://pt.stackoverflow.com/questions/405781/qual-%C3%A9-a-diferen%C3%A7a-entre-os-hooks-usememo-e-usecallback-do-react
3. https://www.linkedin.com/pulse/usecallback-e-usememo-quando-usar-luiz-henrique/?originalSubdomain=pt
4. https://medium.com/reactbrasil/explicando-todos-react-hooks-com-exemplos-bba3a446828e



# Disclaimer ℹ️

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
