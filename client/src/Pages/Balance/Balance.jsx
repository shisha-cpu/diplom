import React, { useState } from "react";
import qrCode from "./qrcode.jpg"; // Добавь сюда фото QR-кода
import './Balance.css'
const Balance = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    { points: 100, price: 50 },
    { points: 500, price: 300 },
    { points: 1000, price: 500 },
  ];

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg);
  };

  return (
    <div className="balance-container">
      <h2 className="balance-title">Пополнение баланса</h2>
      <p className="balance-info">

      </p>

      <div className="packages">
        {packages.map((pkg, index) => (
          <div key={index} className="package">
            <h3>{pkg.points} баллов</h3>
            <p className="price">{pkg.price}₽</p>
            <button onClick={() => handlePurchase(pkg)}>Купить</button>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <div className="qr-modal">
          <div className="qr-content">
            <h3>Оплатите {selectedPackage.price}₽</h3>
            <p>Баллы поступая в течении 5 минут после оплаты </p>
            <img src={qrCode} alt="QR-код для оплаты" className="qr-image" />
            <button className="close-btn" onClick={() => setSelectedPackage(null)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Balance;
