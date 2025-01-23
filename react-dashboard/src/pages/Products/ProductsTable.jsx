import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ProductsTable = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [
      { id: 1, name: 'Current Noodles', price: 100, quantity: 2 },
      { id: 2, name: '2PM noodles', price: 200, quantity: 4 },
    ];
  });
  
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false); // New state for delete confirmation
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });

  // Save products to localStorage
  const saveProductsToLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Add product 
  const handleAddProduct = () => {
    const newProductWithId = {
      id: products.length + 1,
      ...newProduct,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
    };
    const updatedProducts = [...products, newProductWithId];
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
    setNewProduct({ name: '', price: '', quantity: '' });
    setOpenAdd(false);
  };

  // Edit product 
  const handleEditProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === currentProduct.id ? { ...currentProduct } : product
    );
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
    setOpenEdit(false);
    setCurrentProduct(null);
  };

  // Delete product handler
  const handleDeleteProduct = () => {
    const updatedProducts = products.filter((product) => product.id !== currentProduct.id);
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
    setOpenDelete(false); // Close the delete confirmation dialog
    setCurrentProduct(null); // Reset currentProduct
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '20px', float: 'right' }}
        onClick={() => setOpenAdd(true)}
      >
        Add Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.N.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setCurrentProduct(product);
                      setOpenEdit(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setCurrentProduct(product);
                      setOpenDelete(true); // Open the delete confirmation message
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Product */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            margin="normal"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAddProduct} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product  */}
      {currentProduct && (
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={currentProduct.name}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, name: e.target.value })
              }
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              value={currentProduct.price}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, price: e.target.value })
              }
            />
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              margin="normal"
              value={currentProduct.quantity}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, quantity: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button onClick={handleEditProduct} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation  */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Are you sure you want to delete this product? This action cannot be undone.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDeleteProduct} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsTable;
