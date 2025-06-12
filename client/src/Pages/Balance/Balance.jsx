import React, { useState } from 'react';
import './Balance.css';
import { useSelector } from 'react-redux';

const Balance = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const user = useSelector(state => state.user.userInfo)
console.log(user);


  const userId = user._id;

  
  const packages = [
    { points: 100, price: 50 },
    { points: 500, price: 300 },
    { points: 1000, price: 500 },
  ];

  const handlePurchase = async (pkg) => {
    setSelectedPackage(pkg);

    try {
      const res = await fetch('https://edventuralearn.ru/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: pkg.price,
          userId: userId,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Ошибка при получении ссылки на оплату');
        setSelectedPackage(null);
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании платежа');
      setSelectedPackage(null);
    }
  };

  return (
    <div className="balance-container">
      <h2 className="balance-title">Пополнение баланса</h2>

      <div className="packages">
        {packages.map((pkg, index) => (
          <div key={index} className="package">
            <h3>{pkg.points} баллов</h3>
            <p className="price">{pkg.price}₽</p>
            <button onClick={() => handlePurchase(pkg)}>Купить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balance;
