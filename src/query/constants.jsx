export const API_URL = 'http://m2local.local/graphql/';

export const CREATE_CUSTOMER_MUTATION = `mutation CreateCustomer($firstname: String, $lastname: String, $email: String, $password: String) {
    createCustomer(input: {
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    }) {
      customer {
        firstname
        lastname
        email
      }
    }
  }`;

export const GENERATE_CUSTOMER_TOKEN = `mutation GenerateCustomerToken($email: String!, $password: String!) {
  generateCustomerToken(email: $email, password: $password) {
    token
  }
}
`;

export const CUSTOMER_QUERY = `{
    customer {
      firstname
      lastname
    }
  }
`;

export const CATEGORIES_QUERY = `{
  categories(filters: {}, pageSize: 5, currentPage: 2) {
      items {
        name
        id
      }
    }
  }
`;

export const PRODUCT_LIST_QUERY = `query ($id: String!){
  products(
    filter: {category_id: {eq: $id}}
    pageSize: 150
    currentPage: 1
    sort: {}
  ) {
    items{
      name
      sku
      __typename
      price{
        regularPrice{
          amount{
            value
            currency
            }
          }
        }
        image{
          url
        }
      }
    }
}
`;

export const CATEGORY_QUERY = `query ($id: String!){
  categoryList(filters: {ids: {eq: $id}}) {
    name
  }
}
`;

export const PRODUCT_SEARCH_QUERY = `query ($searchTerm: String!){
  products(
    search: $searchTerm
    pageSize: 15
    currentPage: 1
    sort: {}
  ) {
    items{
      name
      sku
      __typename
      price{
        regularPrice{
          amount{
            value
            currency
            }
          }
        }
        image{
          url
        }
      }
    }
}
`;

export const GUEST_CREATE_CART_MUTATION = `
mutation {
  createEmptyCart
}
`;

export const CUSTOMER_CREATE_CART_QUERY = `
{
  customerCart{
    id
  }
}
`;

export const ADD_TO_CART_QUERY = `
mutation addProductsToCart($cartId: String!, $quantity: Float!) {
  addProductsToCart(
    cartId: $cartId
    cartItems: [
      {
        quantity: $quantity
        sku: "24-MB04"
      }
    ]
  ) {
    cart {
      items {
        product {
          name
          sku
        }
        quantity
      }
    }
    user_errors {
      code
      message
    }
  }
}
`;