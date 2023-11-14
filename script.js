// for product gallery


function function1(){
    ProductImg.src=`images/gallery-1.jpg`;
}

function function2(){
    ProductImg.src=`images/gallery-2.jpg`;
}

function function3(){

    ProductImg.src=`images/gallery-3.jpg`;
}

function function4(){

    ProductImg.src=`images/gallery-4.jpg`;
}






// add to cart functionality

let carts=document.querySelectorAll('#cart');
let products=[
    {
        id:'abc101',
        name:'Red Printed T-Shirt',
        tag:'redtshirt',
        price:35,
        inCart:0
    },
    {
        id:'abc102',
        name:'Runner Shoes',
        tag:'runnershoes',
        price:45,
        inCart:0
    },
    {
        id:'abc103',
        name:'Track Pants',
        tag:'trackpants',
        price:30,
        inCart:0
    },
    {
        id:'abc104',
        name:'Blue Printed T-Shirt',
        tag:'bluetshirt',
        price:35,
        inCart:0
    },
    {
        id:'abc105',
        name:'Outdoor Shoes',
        tag:'outdoorshoes',
        price:60,
        inCart:0
    },
    {
        id:'abc106',
        name:'Black Printed T-Shirt',
        tag:'blacktshirt',
        price:35,
        inCart:0
    },
    {
        id:'abc107',
        name:'Combo of Socks',
        tag:'socks',
        price:15,
        inCart:0
    },
    {
        id:'abc108',
        name:'Fossil Watch',
        tag:'fossilwatch',
        price:45,
        inCart:0
    },
    {
        id:'abc109',
        name:'Roasdster Watch',
        tag:'roadsterwatch',
        price:20,
        inCart:0
    },
    {
        id:'abc110',
        name:'X Shoes',
        tag:'xshoes',
        price:80,
        inCart:0
    },
    {
        id:'abc111',
        name:'Walking Shoes',
        tag:'walkingshoes',
        price:30,
        inCart:0
    },
    {
        id:'abc112',
        name:'Jogger Pants',
        tag:'joggerpants',
        price:40,
        inCart:0
    }
]

for(let i=0;i< carts.length;i++){
    carts[i].addEventListener("click",()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCardNumbers(){
    let productNumbers=localStorage.getItem("cartNumbers");
    if(productNumbers){
        document.querySelector('.cart-value span').textContent=productNumbers;

    }
}

function cartNumbers(product){
    let productNumbers=localStorage.getItem("cartNumbers");
    
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart-value span').textContent=productNumbers+1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart-value span').textContent=1;
    }

    setItems(product);
    
}

function setItems(product){
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    
    if(cartItems!=null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart+=1;
    }
    else{
        product.inCart=1;
        cartItems={
            [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

onLoadCardNumbers();

function totalCost(product){
    // console.log("THr price",product.price);
    let cartCost=localStorage.getItem("totalCost");
    
    // console.log("carcst",cartCost);
    // console.log(typeof cartCost);

    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+product.price);
    }

    else{
        localStorage.setItem("totalCost",product.price);
    }
}


function extractValue(arr, prop) {

    // extract value from property
    let extractedValue = arr.map(item => item[prop]);

    return extractedValue;

}




function displayCart() {
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    // console.log(cartItems);

    let productContainer=document.querySelector(".products"); 
    let cartCost=localStorage.getItem("totalCost");

    if(cartItems && productContainer){
        productContainer.innerHTML='';
        

        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline" onclick="removeItem(${item.id})"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
                <ion-icon class="decrease" onclick="decrement(${item.id}),location.reload()" name="arrow-back-circle-outline"></ion-icon>
                <span id="${item.id}">${item.inCart}</span>
                <ion-icon class="increase" onclick="increment(${item.id}),location.reload()" name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart*item.price}.00
            </div>
            `;
        });

        productContainer.innerHTML+=`
        <div class ="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total:
            </h4>
        </div>
        `;
    }
}





let increment=(id)=>{
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let selectedItem=id;
    Object.values(cartItems).map(item =>{
        let search=(item.id===selectedItem.id);
        if(search){
            item.inCart+=1;
            update(selectedItem.id);
            displayCart();
            TotalAmount();
        }

        console.log(item.inCart);
    });
    
    update(selectedItem.id);
    displayCart();
    TotalAmount();
    // console.log(basket);
    
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));



};

let decrement=(id)=>{
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let selectedItem=id;
    Object.values(cartItems).map(item =>{
        let search=(item.id===selectedItem.id);
        if(search){
            if(item.inCart!==0){
            item.inCart-=1;
            update(selectedItem.id);
            displayCart();
            TotalAmount();
        }
        }

    });
    
    
    update(selectedItem.id);
    // console.log(basket);
    displayCart();
    TotalAmount();
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));



};





let update=(id)=>{
    // console.log(search.item);
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let selectedItem=id;
    Object.values(cartItems).map(item =>{
        if(item.id===id){
        document.getElementById(id).innerHTML=item.inCart;}
        calculation();

    });
    
};



let calculation=()=>{
    let cartIcon=document.querySelector('.cart-value span');
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    cartIcon.innerHTML=Object.values(cartItems).map((x)=>x.inCart).reduce((x,y)=>x+y,0);

};




displayCart();
calculation();





function removeItem(id) {
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let selectedItem=id;
    cartItems=Object.values(cartItems).filter((x)=>x.id!==selectedItem.id);
    // console.log(x);
    displayCart();
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
    
}

let cartItemsString = localStorage.getItem("productsInCart");
let cartItemsObject = JSON.parse(cartItemsString);

// Convert the object values to an array
let basket = Object.values(cartItemsObject);

// console.log(cartItemsArray);
let TotalAmount=()=>{
    let cartItemsString = localStorage.getItem("productsInCart");
    if(cartItemsString!==0){
        let amount=basket.map((x)=>{
            let{inCart,id}=x;
            let search=products.find((y)=>y.id===id) || [];
            return inCart*search.price;
        }).reduce((x,y)=>x+y,0);
        // console.log(amount);
        let cost=document.querySelector(".basketTotalContainer");
        cost.innerHTML+=`
        <h4 class="basketTotal">
                $${amount}.00
        </h4>
        `;
    }else return;
    // window.location.reload(true);
};
TotalAmount();
