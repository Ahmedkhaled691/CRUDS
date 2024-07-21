let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let Discount = document.getElementById('discount');
let total = document.getElementById('total');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let Count = document.getElementById('count');


let pageMood = 'create';
let temp;


//*Get Total
function getTotal(){
    if (price.value != '') {
        let Result = (+price.value + +taxes.value) - +Discount.value; 
        total.innerHTML = Result;
        total.style.background = '#157347'
    }else{
        total.innerHTML = '';
        total.style.background = '#c23636';
    }
}


//create Product
let DataPro;
if (localStorage.product != null) {
    DataPro = JSON.parse(localStorage.product)
}else{
    DataPro =[];
}

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        Discount:Discount.value,
        total:total.innerHTML,
        Count:Count.value,
        category:category.value.toLowerCase(),
    }
    if (pageMood === 'create') {
       if (newPro.Count > 1) {
        for (let i = 0; i < newPro.Count; i++) {
            DataPro.push(newPro);
            
        }
        
    }else{
       DataPro.push(newPro); 
    } 
    }else{
        DataPro[temp] = newPro;
        pageMood= 'create';
        submit.innerHTML = `Create`;
        Count.style.display = 'block';
    }
    
    
    localStorage.setItem('product', JSON.stringify(DataPro))
    ClearData()
    showData()
}
//clear Data
function ClearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    Discount.value = '';
    total.innerHTML = '';
    Count.value = '';
    category.value = '';
}

function showData(){
    getTotal();
    let table = '';
    for (let i = 0; i < DataPro.length; i++) {
        table +=`<tr>
        <td>${[i+1]}</td>
        <td>${DataPro[i].title}</td>
        <td>${DataPro[i].price}</td>
        <td>${DataPro[i].taxes}</td>
        <td>${DataPro[i].Discount}</td>
        <td>${DataPro[i].total}</td>
        <td>${DataPro[i].category}</td>
        <td><button class="btn btn-warning py-1 " onclick = "updateData(${i})" type="button" id="update">Update</button></td>
        <td><button class="btn btn-danger py-1 " onclick="deleteData(${i})" type="button" id="delete">Delete</button></td>
    </tr>`
        
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('DeleteData');
    if (DataPro.length > 0) {
        btnDelete.innerHTML = `<i onclick="deleteAll()" class="fa-solid fa-trash-can text-danger fs-4" ></i>`
    }else{
        btnDelete.innerHTML = ``
    }

}
//Delete Data
function deleteData(i){
     DataPro.splice(i,1);
     localStorage.product = JSON.stringify(DataPro);
     showData();
    
}
function deleteAll(){
    localStorage.clear();
    DataPro.splice(0);
    showData();
    
}
 
//Update Data

function updateData(i){
    title.value =DataPro[i].title;
    price.value =DataPro[i].price;
    taxes.value =DataPro[i].taxes;
    Discount.value =DataPro[i].Discount;
    getTotal();
    Count.style.display = 'none';
    category.value = DataPro[i].category;
    submit.innerHTML = `Update`;
    pageMood= 'Update';
    temp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

//Search
 let searchMood;
function getSSearchMood(id){
    let Search = document.getElementById('Search');

    if (id == 'searchByTitle') {
        searchMood = 'title';
       
    }else{
        searchMood = 'category';
        
    }
    Search.placeholder = 'Search By ' + searchMood + '...';
    Search.focus();
    Search.value = '';
    showData();
    
    
}
function searchfield(value){
    let table = '';
   for (let i = 0; i < DataPro.length; i++) {
    if (searchMood == 'title') {

            if (DataPro[i].title.includes(value.toLowerCase())) {
                table +=`<tr>
        <td>${[i+1]}</td>
        <td>${DataPro[i].title}</td>
        <td>${DataPro[i].price}</td>
        <td>${DataPro[i].taxes}</td>
        <td>${DataPro[i].Discount}</td>
        <td>${DataPro[i].total}</td>
        <td>${DataPro[i].category}</td>
        <td><button class="btn btn-warning py-1 " onclick = "updateData(${i})" type="button" id="update">Update</button></td>
        <td><button class="btn btn-danger py-1 " onclick="deleteData(${i})" type="button" id="delete">Delete</button></td>
    </tr>`
                
            }
    
    }else{

            if (DataPro[i].category.includes(value.toLowerCase())) {
                table +=`<tr>
        <td>${[i+1]}</td>
        <td>${DataPro[i].title}</td>
        <td>${DataPro[i].price}</td>
        <td>${DataPro[i].taxes}</td>
        <td>${DataPro[i].Discount}</td>
        <td>${DataPro[i].total}</td>
        <td>${DataPro[i].category}</td>
        <td><button class="btn btn-warning py-1 " onclick = "updateData(${i})" type="button" id="update">Update</button></td>
        <td><button class="btn btn-danger py-1 " onclick="deleteData(${i})" type="button" id="delete">Delete</button></td>
    </tr>`
                
            }
            
        
     }
    }
    document.getElementById('tbody').innerHTML = table;
}

function sortitems(val) {
    let temp;
    if (val == 'sortByPrice') {
        for (let i = 0; i < DataPro.length; i++) {
            DataPro.sort(compare);

        function compare(a, b) {
        if (a.price < b.price)
        return -1;
        if (a.price > b.price)
        return 1;
        return 0;
        }
            // console.log(DataPro[i].price);
            showData();
        }
        
    }else if (val == 'sortByDisc') {
        for (let i = 0; i < DataPro.length; i++) {
            DataPro.sort(compare);

        function compare(a, b) {
        if (a.Discount < b.Discount)
        return -1;
        if (a.Discount > b.Discount)
        return 1;
        return 0;
        }
            console.log(DataPro[i].Discount);
            showData();
        }
        }else{
            for (let i = 0; i < DataPro.length; i++) {
                DataPro.sort(compare);
    
            function compare(a, b) {
            if (a.total < b.total)
            return -1;
            if (a.total > b.total)
            return 1;
            return 0;
            }
                console.log(DataPro[i].total);
                showData();
        }
        }
    
    
}
showData();