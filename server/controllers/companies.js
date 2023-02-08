const CompaniesDB = require("../models").Companies;

const controller = {
  getAllCompanies: async (req, res) => {
    try {
      CompaniesDB.get().then((snapshot) => {
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
  getCompanyById: async (req, res) => {
    const { id } = req.params;
    const company = CompaniesDB.doc(id);

    company
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ message: "Company not found!" });
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
  addCompany: async (req, res) => {
    const { name, address, phoneContact } = req.body;
    CompaniesDB.add({
      name,
      address,
      phoneContact,
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
  updateCompany: async (req, res) => {
    const { ...updatedFiels } = req.body;
    const { id } = req.params;
    const company = CompaniesDB.doc(`${id}`);
    company
      .update({
        ...updatedFiels,
      })
      .then(() => {
        return res
          .status(200)
          .json({ message: `Company updated successfully!` });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
  deleteCompany: async (req, res) => {
    const { id } = req.params;
    const company = CompaniesDB.doc(`${id}`);
    company
      .delete()
      .then(() => {
        return res
          .status(200)
          .json({ message: `Company deleted successfully!` });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
};

module.exports = controller;
