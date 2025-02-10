import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Visibility, Search } from "@mui/icons-material";

const Customers = () => {
  const [customers, setCustomers] = useState(() => {
    const storedCustomers = localStorage.getItem("customers");
    return storedCustomers
      ? JSON.parse(storedCustomers)
      : [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "1234567890",
            status: "Active",
            date: "2025-01-15",
            orders: [], // Default empty array
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "9876543210",
            status: "Inactive",
            date: "2025-01-10",
            orders: [], // Default empty array
          },
        ];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false); // Renamed from `editOpen`
  const [editedCustomer, setEditedCustomer] = useState(null); // Holds the customer being edited
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add Customer functionality
  const handleAddCustomer = () => {
    let validationErrors = {};

    if (!newCustomer.name) validationErrors.name = "Name is required";
    if (!newCustomer.email) validationErrors.email = "Email is required";
    if (!newCustomer.phone) validationErrors.phone = "Phone number is required";
    if (!newCustomer.status) validationErrors.status = "Status is required";

    if (Object.keys(validationErrors).length === 0) {
      setCustomers((prev) => [
        ...prev,
        { ...newCustomer, id: Date.now(), date: new Date().toLocaleDateString() },
      ]);
      setNewCustomer({ name: "", email: "", phone: "", status: "" });
      setErrors({});
      setAddOpen(false);
    } else {
      setErrors(validationErrors);
    }
  };

  // Open details modal
  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setDetailsOpen(true);
  };

  // Close details modal
  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedCustomer(null);
  };

  // Open edit modal
  const handleOpenEdit = (customer) => {
    setEditedCustomer(customer);
    setEditOpen(true);
  };

  // Close edit modal
  const handleCLoseEdit = () => {
    setEditOpen(false);
    setEditedCustomer(null);
  };

  // Handle edit form submission
  const handleEditCustomer = () => {
    if (editedCustomer) {
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === editedCustomer.id ? editedCustomer : customer
        )
      );
      handleCLoseEdit();
    }
  };

  // Delete functionality
  const handleDeleteCustomer = () => {
    setCustomers((prev) =>
      prev.filter((customer) => customer.id !== selectedCustomer.id)
    );
    setDeleteOpen(false);
    setSnackbarOpen(true);
  };
     
  return (
    <Box p={3}>
      {/* Summary Section */}
      <Box display="flex" gap={2} mb={3} justifyContent="space-between">
        <Paper elevation={3} sx={{ p: 1, textAlign: "center" ,width: 200, height: 50, bgcolor:"primary.main",color: "white"}}>
          <Typography variant="subtitle1">Total Customers</Typography>
          <Typography variant="h6">{customers.length}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 1, textAlign: "center", width: 200, height: 50, bgcolor:"green", color:"white" }}>
          <Typography variant="subtitle1">Active Customer </Typography>
          <Typography variant="h6">
            {customers.filter((customer) => customer.status === "Active").length}
          </Typography>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddOpen(true)}
          sx={{ width: 200, height: 65 }}
        >
          Add Customer
        </Button>
      </Box>

      {/* Search Bar */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        {searchBarVisible && (
          <TextField
            variant="outlined"
            label="Search Customers"
            value={searchTerm}
            onChange={handleSearch}
            size="small"
            sx={{ mr: 2 }}
          />
        )}
        <IconButton onClick={() => setSearchBarVisible(!searchBarVisible)}>
          <Search />
        </IconButton>
      </Box>

      {/* Customers Table */}
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell><h4 style={{ fontWeight: 'bold' }}>S.N.</h4></TableCell>
            <TableCell><h4 style={{ fontWeight: 'bold' }}>Name</h4></TableCell>
          <TableCell><h4 style={{ fontWeight: 'bold' }}>Email</h4></TableCell>
          <TableCell><h4 style={{ fontWeight: 'bold' }}>Phone</h4></TableCell>
           <TableCell><h4 style={{ fontWeight: 'bold' }}>Status</h4></TableCell>
           <TableCell><h4 style={{ fontWeight: 'bold' }}>Registration Date</h4></TableCell>
             <TableCell><h4 style={{ fontWeight: 'bold' }}>Actions</h4></TableCell>
            </TableRow>
             </TableHead>
          <TableBody>
            {filteredCustomers.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                <Typography 
                variant="body2" 
                sx={{ 
                 color: customer.status === "Active" ? "green" : "red", 
                  fontWeight: "bold" 
                   }}
                    >
                  {customer.status}
                 </Typography>
                 </TableCell>

               
                <TableCell>{customer.date}</TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(customer)}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenEdit(customer)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setDeleteOpen(true);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Customer Modal */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Phone"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              label="Status"
              value={newCustomer.status}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, status: e.target.value })
              }
              fullWidth
              error={!!errors.status}
              helperText={errors.status}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCustomer} color="primary">
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Customer Modal */}
      <Dialog open={editOpen} onClose={handleCLoseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          {editedCustomer && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Name"
                value={editedCustomer.name}
                onChange={(e) =>
                  setEditedCustomer({ ...editedCustomer, name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Email"
                value={editedCustomer.email}
                onChange={(e) =>
                  setEditedCustomer({ ...editedCustomer, email: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Phone"
                value={editedCustomer.phone}
                onChange={(e) =>
                  setEditedCustomer({ ...editedCustomer, phone: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Status"
                value={editedCustomer.status}
                onChange={(e) =>
                  setEditedCustomer({ ...editedCustomer, status: e.target.value })
                }
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCLoseEdit} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditCustomer} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Customer Details Modal */}
<Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
  <DialogTitle>Customer Details</DialogTitle>
  <DialogContent>
    {selectedCustomer && (
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography><strong>Name:</strong> {selectedCustomer.name}</Typography>
        <Typography><strong>Email:</strong> {selectedCustomer.email}</Typography>
        <Typography><strong>Phone:</strong> {selectedCustomer.phone}</Typography>
        <Typography><strong>Status:</strong> {selectedCustomer.status}</Typography>
        <Typography><strong>Registration Date:</strong> {selectedCustomer.date}</Typography>
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDetails} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>
      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
  <DialogTitle>Confirm Deletion</DialogTitle>
  <DialogContent>
    <Alert severity="warning">
      Are you sure you want to delete this item? This action cannot be undone.
    </Alert>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
    <Button
      onClick={handleDeleteCustomer}
      variant="contained"
      style={{ backgroundColor: 'red', color: 'white' }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>


      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Customer deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Customers;

