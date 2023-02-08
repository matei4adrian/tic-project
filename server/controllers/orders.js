const CompaniesDB = require("../models").Companies;

const controller = {
  getAllOrders: async (req, res) => {
    try {
      const { companyId } = req.params;
      const orders = CompaniesDB.doc(`${companyId}`).collection("Orders");
      orders.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        return res.status(200).json(data);
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getOrderById: async (req, res) => {
    const { companyId, orderId } = req.params;
    const order = CompaniesDB.doc(`${companyId}`)
      .collection("Orders")
      .doc(`${orderId}`);
    order
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ message: "Order not found!" });
        }
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        console.log("Document data:", data);
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
  addOrder: async (req, res) => {
    const { customerName, address, phoneContact, products } = req.body;
    const { companyId } = req.params;
    const orders = CompaniesDB.doc(`${companyId}`).collection("Orders");
    orders
      .add({
        customerName,
        address,
        phoneContact,
        products,
      })
      .then((ref) => {
        console.log("Added doc with ID: ", ref.id);
        return res
          .status(200)
          .json({ message: `Added doc with ID: ${ref.id}` });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
  updateOrder: async (req, res) => {
    const { ...updatedFiels } = req.body;
    const { companyId, orderId } = req.params;
    const order = CompaniesDB.doc(`${companyId}`)
      .collection("Orders")
      .doc(`${orderId}`);
    order
      .update({
        ...updatedFiels,
      })
      .then(() => {
        return res.status(200).json({ message: `Order updated successfully!` });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
  deleteOrder: async (req, res) => {
    const { companyId, orderId } = req.params;
    const order = CompaniesDB.doc(`${companyId}`)
      .collection("Orders")
      .doc(`${orderId}`);
    order
      .delete()
      .then(() => {
        return res.status(200).json({ message: `Order deleted successfully!` });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
};

module.exports = controller;
