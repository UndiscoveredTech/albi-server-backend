const Company = require('../models/company.model');
const Employee = require('../models/employee.model');
const StaticMonth = require('../models/staticMonth.model');
const MonthlyController = require('../controllers/monthly.controller');
const getCompaniesList = async (req, res) => {
    try {
        const company = await Company.find();
        res.json(company);
    } catch (err) {
        res.json({ message: err });
    }
}

//Get single 
const getSingleCompany = async (req, res) => {
    
    try {
      const staticMonthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let usersList = [];
      const d = new Date();
      let month = staticMonthList[d.getMonth()];
      let year = d.getFullYear(); 
      let monthYearId;
      const company = await Company.findOne({_id: req.params.companyId}).populate("users");
        let companyObj = {
            _id: company._id,
            name: company.name,
            address: company.address,
            bonus: company.bonus,
            nipt: company.nipt,
            users: []
        };
      try {
        const monthYear = await StaticMonth.findOne({month: month, year: year});
        monthYearId = monthYear._id;
      } catch (err) {
        res.json({ message: err });
      }

        for (const item of company.users) {
            let userObj = {
                _id: item._id,
                name: item.name,
                bankaccount: item.bankaccount,
                calculation: {}

            };
            await MonthlyController.getCalculationForUserAndYearMonthService(monthYearId,item._id).then(result => {
                userObj.calculation = result;
                usersList.push(userObj);
            });

        }

    companyObj.users = usersList;
    res.json(companyObj)
    } catch (err) {
      res.json({ message: err });
    }
  }


  //Get single company data users for compnayId and selectedmonthId
const getSingleCompanyByMonthId = async (req, res) => {
    
    try {
      const staticMonthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let usersList = [];
      const d = new Date();
      let month = staticMonthList[d.getMonth()];
      let year = d.getFullYear(); 
      let monthYearId;
      const company = await Company.findOne({_id: req.params.companyId}).populate("users");
        let companyObj = {
            _id: company._id,
            name: company.name,
            address: company.address,
            bonus: company.bonus,
            nipt: company.nipt,
            users: []
        };
      try {
        // const monthYear = await StaticMonth.findOne({month: month, year: year});
        monthYearId = req.params.selectedMonthId;
      } catch (err) {
        res.json({ message: err });
      }

        for (const item of company.users) {
            
            await MonthlyController.getCalculationForUserAndYearMonthService(monthYearId,item._id).then(result => {
                let userObj = {
                    _id: item._id,
                    name: item.name,
                    bankaccount: item.bankaccount,
                    calculation: {}
    
                };
                if(result){
                    userObj.calculation = result;
                    usersList.push(userObj);
                }
                
            });

        }

    companyObj.users = usersList;
    res.json(companyObj)
    } catch (err) {
      res.json({ message: err });
    }
  }



const insertCompany = async (req, res) => {
    const company = new Company({
        name: req.body.name,
        address: req.body.address,
        nipt: req.body.nipt,
        bonus: req.body.bonus,
        
    });
    try {
        const savedCompany = await company.save()
        const companyList = await Company.find();
        res.json(companyList);
    } catch (err) {
        res.json({ message: err });
    }
}



const updateCompany = async (req, res) => {
    try {
        const updateCompany = await Company.updateOne(
            { _id: req.params.companyId },
            {
                $set: {
                    name: req.body.name,
                    address: req.body.address,
                    nipt: req.body.nipt,
                    bonus: req.body.bonus,
                    
                }
            }
        );
        const companyList = await Company.find();
        res.json(companyList);
    } catch (err) {
        res.json({ message: err });
    }
}
const deleteCompany = async (req, res) => {
    try {
        const removeCompany = await Company.remove({ _id: req.params.companyId });
        const company = await Company.find();
        res.json(company)
    } catch (err) {
        res.json({ message: err });
    }
}
const removeEmployee = async (companyId,employeeId) => {
    try {
        const companyObject = await Company.findById(companyId);
        let listOfUsers = companyObject.users;
        if(listOfUsers.includes(employeeId))
            listOfUsers = listOfUsers.filter(item => item != employeeId.toString());
        try {
            const updateCompany = await Company.updateOne(
                { _id: companyId },
                {
                    $set: {
                        users: listOfUsers
                    }
                }
            );
        } catch (err) {
            console.log("---: ", err);      
  
        }
    } catch (err) {
        console.log("--: ",err);

    }
}


module.exports = { getCompaniesList, deleteCompany, insertCompany, updateCompany,getSingleCompany,getSingleCompanyByMonthId,removeEmployee};