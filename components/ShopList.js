import React, { useState, useEffect } from 'react';
import '../scss/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { Container, Button } from 'react-bootstrap';
import db from './firebase';
import firebase from 'firebase/compat';

const ShopList = () => {
  const [items, setItems] = useState([
    { itemName: 'produkt', quantity: 0, isSelected: false },
  ]);

  // const response=db.collection('items');
  // const data=await response.get();
  // data.docs.forEach(item=>{
  //  setItems([...blogs,item.data()])
  // })

  // useEffect(() => {
  //   db.collection('items')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot((snapshot) => {
  //       setItems(snapshot.docs.map((doc) => doc.data().item));
  //     });
  // }, []);

  const [imputValue, setInputValue] = useState('');
  const [totalItemCount, setTotalItemCount] = useState(0);

  const handelAddButonClick = (event) => {
    event.preventDefault();
    const newItem = {
      itemName: imputValue,
      quantity: 1,
      isSelected: false,
    };
    db.collection('items').add({
      item: imputValue,
      quantity: 1,
      isSelected: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue('');
  };
  const removeItem = (index) => {
    const newItems = [...items];
    newItems[index] = newItems.splice(index, 1);
    // newItems[index] = newItems.filter((index) => index !== newItems.length - 1);
    setItems(newItems);
  };
  const editItem = (props) => {
    // removeItem = (props) => {
    //   const { Items } = this.state;
    //   Items.removeItem(props.itemName);
    //   splice(props, 1);
    //   this.setState({
    //     Items: [...items, removeItem],
    //   });
    //   console.log(this.state.shopList);
    // };
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity--;
    setItems(newItems);
    calculateTotal();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };
  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItemCount(totalItemCount);
  };
  return (
    <>
      <div className="landingpage">
        <Navbar className="navbar" />
        <Container className="app-background">
          <div className="main-container">
            <div className="add-item-box">
              <form>
                <input
                  value={imputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  ClassName="add-item-imput"
                  placeholder="wpisz produkt"
                />
                <Button
                  disabled={!imputValue}
                  type="submit"
                  onClick={handelAddButonClick}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </form>
            </div>
            <div className="item-list">
              {items.map((item, index) => (
                <div className="item-container">
                  <div
                    className="item-name"
                    onClick={() => toggleComplete(index)}
                  >
                    {}
                    {item.isSelected ? (
                      <>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <span className="completed">{item.itemName}</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCircle} />
                        <span>{item.itemName}</span>
                      </>
                    )}
                  </div>
                  <Button
                    className="remove-button"
                    onClick={() => removeItem(index)}
                    // onClick={(event) =>
                    //   db.collection('items').doc(item.id).delete()
                    // }
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                  <Button className="edit">
                    <FontAwesomeIcon icon={faEdit} onClick={() => editItem()} />
                  </Button>
                  <div className="quantity">
                    <button>
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={() => handleQuantityDecrease(index)}
                      />
                    </button>
                    <span>{item.quantity}</span>
                    <button>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={() => handleQuantityIncrease(index)}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="total">Suma produktów: {totalItemCount}</div>
          </div>
        </Container>
      </div>
    </>
  );
};
export default ShopList;
