import { useCart } from "../Context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart,addToCart } = useCart();

  return (
    <div className="container mt-4 pt-5 " >
      <h2 className="mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="">Your cart is empty.</p>
      ) : (
        <div className="row">
          {cart.map((item, index) => (
            <div key={index} className="card mb-3" style={{ width: "18rem" }}>
              <img src={item.Image} alt={item.Name} className="card-img-top" style={{height:"200px", objectFit:"cover"}} />
              <div className="card-body">
                <h5 className="card-title">{item.Name}({item.quantity})</h5>
                <p className="card-text">{item.Description}</p>

                <div className="d-flex">
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
                <button className="btn btn-success mx-4 " onClick={()=> addToCart(item)}>Increase</button>
                </div>
                   
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
