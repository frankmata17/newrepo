// accountsController.js

const utilities = require('../utilities');
const accountModel = require('../models/account-model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("account/login", {
      title: "Login",
      nav,
    });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to the error handling middleware
  }
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("account/register", {
      title: "Register",
      nav,
    });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to the error handling middleware
  }
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res, next) {
  try {
    let nav = await utilities.getNav();
    const { account_firstname, account_lastname, account_email, account_password } = req.body;

    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      account_password
    );

    if (regResult.rowCount > 0) {
      req.flash(
        "notice",
        `Congratulations, you're registered ${account_firstname}. Please log in.`
      );
      res.status(201).render("account/login", {
        title: "Login",
        nav,
      });
    } else {
      req.flash("notice", "Sorry, the registration failed.");
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
      });
    }
  } catch (error) {
    console.error(error);
    req.flash("notice", "An error occurred during registration.");
    res.status(500).render("account/register", {
      title: "Registration",
      nav: await utilities.getNav(),
    });
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res, next) {
  try {
    let nav = await utilities.getNav();
    const { account_email, account_password } = req.body;
    const accountData = await accountModel.getAccountByEmail(account_email);

    if (!accountData) {
      req.flash("notice", "Please check your credentials and try again.");
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(account_password, accountData.account_password);

    if (passwordMatch) {
      delete accountData.account_password;
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
      const cookieOptions = {
        httpOnly: true,
        maxAge: 3600 * 1000, // 1 hour
      };

      if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true; // Enable secure cookie in production
      }

      res.cookie("jwt", accessToken, cookieOptions);
      return res.redirect("/account/");
    } else {
      req.flash("notice", "Please check your credentials and try again.");
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      });
    }
  } catch (error) {
    console.error(error);
    req.flash("notice", "An error occurred during login.");
    res.status(500).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    });
  }
}

/* ****************************************
 *  Get Manage Account
 * ************************************ */
exports.getManageAccount = async (req, res, next) => {
  try {
    const { firstName, accountType, clientId } = req.session.user; // Example: Assuming user details are stored in session

    if (accountType === "Client") {
      res.render('account/manage', { firstName });
    } else if (accountType === "Employee" || accountType === "Admin") {
      // Fetch additional data for employees and admins
      const inventoryLink = '/inventory/manage'; // Example link to manage inventory
      const inventoryManagementInfo = "Inventory Management"; // Example text for inventory management info

      res.render('account/manage', {
        firstName,
        accountType,
        inventoryLink,
        inventoryManagementInfo
      });
    }
  } catch (error) {
    console.error(error);
    next(error); // Pass error to the error handling middleware
  }
};

module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  accountLogin,
};
