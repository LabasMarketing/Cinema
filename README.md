# 🎬Cinema

### 👨‍🎓Alunos
- Gustavo Carvalho
- Gabriel Labarca
- Rodrygo

## 🎯Objetivo
O objetivo desta POC (Prova de Conceito) é desenvolver um sistema de reserva de assentos para cinemas, utilizando as tecnologias React e Next.js, com dados armazenados em um arquivo JSON. O sistema permite a seleção, desmarcação e compra de assentos, além de exibir informações sobre o filme.

## 🛠️Funcionalidades

### Seleção de Assentos
O usuário pode selecionar e desmarcar assentos para reserva. Cada assento tem um status que pode ser:
- Livre (free)
- Selecionado (selected)
- Indisponível (unavailable)

### 💰Preços
O preço de cada assento é fixado em R$ 25,00. O valor total da reserva é atualizado à medida que o usuário seleciona ou desmarque assentos.

### 🚫Assentos Indisponíveis
O sistema marca automaticamente 8 pares consecutivos de assentos como "indisponíveis" ao carregar a página. Isso é feito de forma aleatória.

### 🛒Finalização da Compra
Quando o usuário clica no botão "Comprar", um alerta exibe o valor total da compra, ou uma mensagem caso nenhum assento tenha sido selecionado.

## 📂Estrutura do Código

### 1. Importações
```javascript
import React, { useState, useEffect } from "react";
import seatData from "/project/workspace/exemplo.json";
```
- **React**: Biblioteca principal para construção da interface.
- **useState e useEffect**: Hooks do React usados para gerenciar o estado do aplicativo e executar efeitos colaterais.
- **seatData**: Importação dos dados do filme, como título, horário e sinopse, de um arquivo JSON.

### 2. Estados
```javascript
const [seats, setSeats] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);
const seatPrice = 25; // Preço do assento
const totalSeats = 60; // Número total de assentos
```
- `seats`: Array que armazena os dados dos assentos, incluindo seu ID e status.
- `totalPrice`: Armazena o valor total da compra.
- `seatPrice`: Preço de cada assento (R$ 25,00).
- `totalSeats`: Número total de assentos disponíveis (60).

### 3. useEffect
Inicialização dos assentos:
```javascript
useEffect(() => {
  const initialSeats = Array.from({ length: totalSeats }, (_, index) => ({
    id: index + 1,
    status: "free", // Status inicial de todos os assentos
  }));
  setUnavailableSeats(initialSeats);
}, []);
```
- `useEffect`: Executa uma função para inicializar os assentos quando o componente é montado. Todos os assentos começam com o status "livre" (free).

### 4. setUnavailableSeats
Definindo assentos indisponíveis:
```javascript
const setUnavailableSeats = (seatsArray) => {
  let pairsCount = 0;
  while (pairsCount < 8) {
    const randomIndex = Math.floor(Math.random() * (totalSeats - 1));
    const seat1 = seatsArray[randomIndex];
    const seat2 = seatsArray[randomIndex + 1];

    if (seat1.status === "free" && seat2 && seat2.status === "free") {
      seat1.status = "unavailable";
      seat2.status = "unavailable";
      pairsCount++;
    }
  }
  setSeats(seatsArray);
};
```
- `setUnavailableSeats`: Marca 8 pares de assentos consecutivos como "indisponíveis". Esses pares são escolhidos aleatoriamente, desde que ambos os assentos estejam livres.

### 5. handleSeatClick
Gerenciamento de clique nos assentos:
```javascript
const handleSeatClick = (id) => {
  let updatedPrice = totalPrice;
  const updatedSeats = seats.map((seat) => {
    if (seat.id === id) {
      if (seat.status === "free") {
        updatedPrice += seatPrice;
        return { ...seat, status: "selected" };
      } else if (seat.status === "selected") {
        updatedPrice -= seatPrice;
        return { ...seat, status: "free" };
      }
    }
    return seat;
  });
  setSeats(updatedSeats);
  setTotalPrice(updatedPrice);
};
```
- `handleSeatClick`: Altera o status de um assento quando clicado. Se o assento estiver "livre" (free), ele se torna "selecionado" (selected) e o preço é atualizado. Se o assento estiver "selecionado", ele volta a ser "livre" e o preço é ajustado.

### 6. handlePurchase
Finalizando a compra:
```javascript
const handlePurchase = () => {
  if (totalPrice > 0) {
    alert(`Compra realizada com sucesso! Valor total: R$ ${totalPrice.toFixed(2).replace(".", ",")}`);
    window.location.reload();
  } else {
    alert("Nenhum assento selecionado. Por favor, selecione ao menos um assento para realizar a compra.");
  }
};
```
- `handlePurchase`: Verifica se algum assento foi selecionado. Se sim, exibe o valor da compra e recarrega a página. Se não, exibe um alerta pedindo para selecionar pelo menos um assento.

### 7. Informações do Filme
Exibindo dados do filme:
```javascript
<div className="synopsis">
  <h3>Sinopse do filme</h3>
  <p>{seatData.sinopse}</p>
</div>
<div className="details">
  <h3>Data de lançamento</h3>
  <p>{seatData.dataLancamento}</p>
  <h3>Direção</h3>
  <p>{seatData.direcao}</p>
</div>
```
Exibe informações sobre o filme, como sinopse, data de lançamento e direção, que são carregadas do arquivo exemplo.json.

## 🧰Ferramentas Utilizadas
- ⚛️**React**: Biblioteca JavaScript para construção de interfaces de usuário.
- 🚀**Next.js**: Framework React para aplicações web, com suporte a renderização do lado do servidor.
- 📄**JSON**: Formato de armazenamento de dados utilizado para armazenar informações sobre os filmes.

## Conclusão + Exemplo de funcionamento

![image](https://github.com/user-attachments/assets/7a8d91d6-7a8c-4ed5-950f-83a7df6fa250)

Este projeto POC6 demonstrou a viabilidade de um sistema de reserva de assentos para cinemas utilizando tecnologias modernas como React e Next.js. Através do uso de JSON para armazenamento de dados, conseguimos criar uma aplicação funcional que permite a seleção e compra de assentos, além de exibir informações detalhadas sobre os filmes. Essa implementação serve como uma base sólida para futuros desenvolvimentos e melhorias no sistema de reservas.
