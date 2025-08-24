const Offer=()=>{
    return (
        <div className="container mt-5">
  <h2 className="mb-4 text-center">🔥 Special Offers</h2>
  <div className="row">
    
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm">
        <img src="https://foodmandu.com/Images/Vendor/539/Product/70980//ComboOffer_RedMud-min_130618074043.jpg" className="card-img-top" alt="offer"/>
        <div className="card-body text-center">
          <h5 className="card-title">Flat 30% OFF</h5>
          <p className="card-text">On your first order above Rs. 300</p>
          <button className="btn btn-danger">Order Now</button>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="card shadow-sm">
        <img src="https://portlandpizzadelivery.com/wp-content/uploads/2016/10/Pizza-Nostra-Portland-Pizza-Delivery-in-NE-and-North-Portland-2-med-pizza-breadsticks-special-1.jpg" className="card-img-top" alt="combo"/>
        <div className="card-body text-center">
          <h5 className="card-title">Family Pizza Combo</h5>
          <p className="card-text">2 Large Pizzas + Garlic Bread @ Rs. 899</p>
          <button className="btn btn-danger">Grab Deal</button>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="card shadow-sm">
        <img src="https://earthandoven.com/wp-content/uploads/2025/05/Healthy-salad-recipes-featured-image.jpg" className="card-img-top" alt="healthy"/>
        <div className="card-body text-center">
          <h5 className="card-title">Healthy Offer</h5>
          <p className="card-text">Buy 1 Salad & Get 50% OFF on Smoothie</p>
          <button className="btn btn-danger">Claim Now</button>
        </div>
      </div>
    </div>

  </div>
</div>


    )
}
export default Offer;
