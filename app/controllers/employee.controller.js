const Employee = require('../models/employee.model');
const Company = require('../models/company.model');
const CompanyController = require("./company.controller");
const { updateCompany } = require('./company.controller');


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


const getAllEmployees = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.json(employee);
  } catch (err) {
    res.json({ message: err });
  }
}


const getSingleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.userId);
    res.json(employee)
  } catch (err) {
    res.json({ message: err });
  }
}


//insert employee
const insertEmployee = async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    bankaccount: req.body.bankaccount,
    company: req.body.company,
    companyName: req.body.companyName,


  });
  try {
    const savedEmployee = await employee.save()

    const companyFindById = await Company.findById(req.body.company);
    if (!companyFindById) {
      res.json({ message: "Company not found" });
    }
    companyFindById.users.push(savedEmployee._id);

    try {
      const updateCompany = await Company.updateOne(
        { _id: req.body.company },
        {
          $set: {
            users: companyFindById.users
          }
        }
      );
    }
    catch (err) {
      res.json({ message: err });
    }

    const employeeList = await Employee.find();
    res.json(employeeList);
  } catch (err) {
    res.json({ message: err });
  }
}


//update employee
const updateEmployee = async (req, res) => {

  //first delete from company the user who is going to update
  /*
    remove user form actuall company
  */
  try {
    const employeeBeforeUpdate = await Employee.findById(req.body._id);
    // console.log("------ ", employeeBeforeUpdate);
    CompanyController.removeEmployee(employeeBeforeUpdate.company, employeeBeforeUpdate._id);

  } catch (err) {
    res.json({ message: err });

  }


  try {
    const updateEmployee = await Employee.updateOne(
      { _id: req.body._id },
      {
        $set: {
          name: req.body.name,
          bankaccount: req.body.bankaccount,
          company: req.body.company
        }
      }
    );
  }
  catch (err) {
    res.json({ message: err });
  }


  //add user to the new company after updateing
  try {
    const companyObject = await Company.findById(req.body.company);
    let listOfUsers = companyObject.users;
    listOfUsers.push(req.body._id)
    try {
      const updateCompany = await Company.updateOne(
        { _id:  req.body.company },
        {
          $set: {
            users: listOfUsers
          }
        }
      );
    } catch (err) {
      res.json({ message: err });

    }

  } catch (err) {
    res.json({ message: err });

  }

  try {
    const employeeList = await Employee.find();
    res.json(employeeList)
  } catch (err) {
    res.json({ message: err });
  }
}

//Associate user with a company
const associateEmployee = async (req, res) => {
  try {
    const updateEmployee = await Employee.updateOne(
      { _id: req.params.employeeId },
      {
        $set: {
          company: req.params.companyId
        }
      }
    );
  }
  catch (err) {
    res.json({ message: err });
  }
  const companyFindById = await Company.findById(req.params.companyId);

  companyFindById.users.push(req.params.employeeId)

  try {
    const updateCompany = await Company.updateOne(
      { _id: req.params.companyId },
      {
        $set: {
          users: companyFindById.users
        }
      }
    );
  }
  catch (err) {
    res.json({ message: err });
  }
  try {
    const company = await Company.findById(req.params.companyId);
    res.json(company)
  } catch (err) {
    res.json({ message: err });
  }
}





const deleteEmployee = async (req, res) => {

  //first delete from company the user who is going to update
  /*
    remove user form actuall company
  */
    try {
      const employeeBeforeUpdate = await Employee.findById(req.params.employeeId);
      CompanyController.removeEmployee(employeeBeforeUpdate.company, employeeBeforeUpdate._id);
  
    } catch (err) {
      res.json({ message: err });
  
    }

  try {
    const removeEmployee = await Employee.remove({ _id: req.params.employeeId });
    const employee = await Employee.find();
    res.json(employee)
  } catch (err) {
    res.json({ message: err });
  }
}
module.exports = { getAllEmployees, getSingleEmployee, associateEmployee, insertEmployee, deleteEmployee, updateEmployee };
