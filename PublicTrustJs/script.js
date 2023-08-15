async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getProductData(productType) {
  try {
    // Here its considered that upon retrieving I might have to deal with race conditions.
    const [productsResponse, productTypesResponse] = await Promise.all([
      fetchData('products.json'),
      fetchData('producttypes.json')
    ]);

    // Convert productTypesResponse to an array of type names
    const productTypes = productTypesResponse.map(type => type.name);
    
    // If productType is not valid, return an empty array []
    if (productType == 'all') {
      return productsResponse
    } else if (productTypes.includes(productType)) {
      const filteredProducts = productsResponse.filter(product => product.type === productType);

      return filteredProducts;
    }

    return [];

  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

async function displayFilteredProducts(productType) {
  try {
    const filteredProducts = await getProductData(productType ? productType : "all");
    const productsContainer = document.getElementById('products-container');

    // Clear any previous content
    productsContainer.innerHTML = '';

    if (filteredProducts.length > 0) {
      // Display filtered products in HTML
      filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>Type: ${product.type}</p>
          <p>Price: $${product.price}</p>
        `;
        productsContainer.appendChild(productElement);
      });
    } else {
      const messageElement = document.createElement('div');
      messageElement.textContent = "There are no products with that category";
      productsContainer.appendChild(messageElement);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const filterButton = document.getElementById('filterButton');
filterButton.addEventListener('click', () => {
  const productTypeInput = document.getElementById('productType');
  const productType = productTypeInput.value;
  displayFilteredProducts(productType);
});

// Call the function initially to display all products
displayFilteredProducts('');