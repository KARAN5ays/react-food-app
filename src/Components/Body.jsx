import body1 from '../assets/body1.png';
const Body=()=>{
    return(
        <div className="container  mt-4 p-4 rounded shadow h-100">
        <div className="body d-flex justify-content-between w-70">
            <div className="text-container">
            <h1 className="fs-2 ms-5 mt-4">Fast and Ready Food Delivery</h1>
            <p className="fs-4 ms-5 mt-2" >Get Your Food Delivered Fast and Fresh </p>
            <p className="fs-6 ms-5 mt-2">Order from your favorite restaurants and enjoy delicious meals delivered to your doorstep.</p>
            <button className="btn btn-danger text-light ms-5 mt-4">Order Now</button>
            </div>
  <img
    src={body1}
    alt="Food Delivery"
    className="img-fluid scooter"
  />
</div>

</div>


    )
}
export default Body;