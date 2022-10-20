# React Toy Project 🧸

Apenas um pequeno projeto para testar alguns **react hooks**.

* **`useMemo`**
1. memoriza o **valor** resultante de uma função
2. executa a função **assim que o componente é renderizado**
3. fica em cache até que o array de dependências mude

* **`useCallback`**
1. memoriza uma **função**
2. executa a função **apenas quando é chamada diretamente**
3. fica em cache até que o array de dependências mude

* **`useRef`**
1. mantém o valor **independente de renderizações**

* **`memo`**
1. memoriza o **componente inteiro** ao invés de uma função / valor de uma função


# How to Run 💻

```js
npm start
```


# References 🌐

1. https://kinsta.com/pt/blog/usecallback-react/#:~:text=useCallback%20vs%20usarMemo&text=A%20diferen%C3%A7a%20chave%20%C3%A9%20que,voc%C3%AA%20pode%20chamar%20mais%20tarde
2. https://pt.stackoverflow.com/questions/405781/qual-%C3%A9-a-diferen%C3%A7a-entre-os-hooks-usememo-e-usecallback-do-react



# Disclaimer ℹ️

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
