"use client";
import React, { useState, useEffect } from "react";
import seatData from "/project/workspace/exemplo.json";

export default function MovieReservation() {
  const [seats, setSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const seatPrice = 25; // Preço do assento
  const totalSeats = 60; // Número total de assentos

  useEffect(() => {
    const initialSeats = Array.from({ length: totalSeats }, (_, index) => ({
      id: index + 1,
      status: "free", // status pode ser "free", "selected" ou "unavailable"
    }));
    setUnavailableSeats(initialSeats);
  }, []);

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

  const handlePurchase = () => {
    if (totalPrice > 0) {
      alert(
        `Compra realizada com sucesso! Valor total: R$ ${totalPrice
          .toFixed(2)
          .replace(".", ",")}`
      );
      window.location.reload();
    } else {
      alert(
        "Nenhum assento selecionado. Por favor, selecione ao menos um assento para realizar a compra."
      );
    }
  };

  // Obtendo os IDs dos últimos 4 assentos
  const getLastFourSeats = (seatsArray) => {
    return seatsArray.slice(-4); // Pega os últimos 4 assentos
  };

  const lastFourSeats = getLastFourSeats(seats);

  return (
    <article>
      <div className="container">
        <div className="left-section">
          <div className="title">{seatData.titulo}</div>
          <div className="time">{seatData.horario}</div>
          <div
            className="seats"
            style={{
              display: "flex",
              justifyContent: "center", // Centraliza os últimos assentos
              flexWrap: "wrap", // Permite que os assentos se ajustem
            }}
          >
            {seats.map((seat) => (
              <div
                key={seat.id}
                className={`seat ${seat.status} ${
                  lastFourSeats.includes(seat) ? "last-four" : ""
                }`}
                onClick={() =>
                  seat.status !== "unavailable" && handleSeatClick(seat.id)
                }
              />
            ))}
          </div>
          <div className="screen"></div>
          <div className="screen-label">tela</div>
          <div className="legend">
            <div className="legend-item">
              <span className="seat free"></span> livre
            </div>
            <div className="legend-item">
              <span className="seat selected"></span> selecionado
            </div>
            <div className="legend-item">
              <span className="seat unavailable"></span> indisponível
            </div>
          </div>
          <button
            id="buyButton"
            className="buy-button"
            onClick={handlePurchase}
          >
            Comprar
            <br />
            R${" "}
            <span id="total-price">
              {totalPrice.toFixed(2).replace(".", ",")}
            </span>
          </button>
        </div>
        <div className="right-section">
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
        </div>
      </div>
    </article>
  );
}
