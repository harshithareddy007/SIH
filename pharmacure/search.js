function searchProducts() {
    const input = document.getElementById('searchBox').value.toLowerCase();
    const products = document.getElementsByClassName('product-card');
    for (let i = 0; i < products.length; i++) {
        let name = products[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        products[i].style.display = name.includes(input) ? '' : 'none';
    }
}