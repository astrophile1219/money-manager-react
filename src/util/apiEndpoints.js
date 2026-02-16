export const BASE_URL = "https://money-manager-v2-0-nt88.onrender.com/api/v2.0";
// export const BASE_URL = "https://money-manager-v2-0-3.onrender.com/api/v2.0";
// export const BASE_URL = "http://loc  alhost:9090/api/v2.0";
const CLOUDINARY_CLOUD_NAME = "dn4exhu3m";
export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO:"/profile",
  GET_ALL_CATEGORIES:"/categories",
  ADD_CATEGORY:"/categories",
  UPDATE_CATEGORY:(categoryId) => `/categories/${categoryId}`,

  // incomes api points
  GET_ALL_INCOMES:"/incomes",
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
  ADD_INCOME:"/incomes",
  DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  INCOME_EXCEL_DOWNLOAD : "/excel/download/income",
  EMAIL_INCOME : "/email/income-excel",

  // expense api points
  GET_ALL_EXPENSES:"/expenses",
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
  ADD_EXPENSE:"/expenses",
  DELETE_EXPENSE: (incomeId) => `/expenses/${incomeId}`,
  EXPENSE_EXCEL_DOWNLOAD : "/excel/download/expense",
  EMAIL_EXPENSE : "/email/expense-excel",



  APPLY_FILTERS : "/filter",
  DASHBOARD_DATA : "/dashboard",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
