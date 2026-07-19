import mock from "./mock.js/mock";

// ** Utils
import { paginateArray } from "./paginateArray";

// Avatars Imports
import avatar1 from "@src/assets/images/avatars/1.png";
import avatar2 from "@src/assets/images/avatars/2.png";
import avatar3 from "@src/assets/images/avatars/3.png";
import avatar4 from "@src/assets/images/avatars/4.png";
import avatar5 from "@src/assets/images/avatars/5.png";
import avatar6 from "@src/assets/images/avatars/6.png";
import avatar7 from "@src/assets/images/avatars/7.png";
import avatar8 from "@src/assets/images/avatars/8.png";
import avatar9 from "@src/assets/images/avatars/9.png";
import avatar10 from "@src/assets/images/avatars/10.png";

const data = {
  users: [
    {
      id: 1,
      billing: "Manual - Credit Card",
      fullName: "Galen Slixby",
      company: "Yotz PVT LTD",
      role: "editor",
      username: "gslixby0",
      country: "El Salvador",
      contact: "(479) 232-9151",
      email: "gslixby0@abc.net.au",
      currentPlan: "enterprise",
      status: "inactive",
      avatar: "",
      avatarColor: "light-primary",
    },
    {
      id: 2,
      billing: "Manual - Paypal",
      fullName: "Halsey Redmore",
      company: "Skinder PVT LTD",
      role: "author",
      username: "hredmore1",
      country: "Albania",
      contact: "(472) 607-9137",
      email: "hredmore1@imgur.com",
      currentPlan: "team",
      status: "pending",
      avatar: avatar10,
    },
    {
      id: 3,
      billing: "Auto Debit",
      fullName: "Marjory Sicely",
      company: "Oozz PVT LTD",
      role: "maintainer",
      username: "msicely2",
      country: "Russia",
      contact: "(321) 264-4599",
      email: "msicely2@who.int",
      currentPlan: "enterprise",
      status: "active",
      avatar: avatar1,
    },
    {
      id: 4,
      billing: "Manual - Credit Card",
      fullName: "Cyrill Risby",
      company: "Oozz PVT LTD",
      role: "maintainer",
      username: "crisby3",
      country: "China",
      contact: "(923) 690-6806",
      email: "crisby3@wordpress.com",
      currentPlan: "team",
      status: "inactive",
      avatar: avatar9,
    },
    {
      id: 5,
      billing: "Auto Debit",
      fullName: "Maggy Hurran",
      company: "Aimbo PVT LTD",
      role: "subscriber",
      username: "mhurran4",
      country: "Pakistan",
      contact: "(669) 914-1078",
      email: "mhurran4@yahoo.co.jp",
      currentPlan: "enterprise",
      status: "pending",
      avatar: avatar10,
    },
    {
      id: 6,
      billing: "Auto Debit",
      fullName: "Silvain Halstead",
      company: "Jaxbean PVT LTD",
      role: "author",
      username: "shalstead5",
      country: "China",
      contact: "(958) 973-3093",
      email: "shalstead5@shinystat.com",
      currentPlan: "company",
      status: "active",
      avatar: "",
      avatarColor: "light-success",
    },
    {
      id: 7,
      billing: "Manual - Paypal",
      fullName: "Breena Gallemore",
      company: "Jazzy PVT LTD",
      role: "subscriber",
      username: "bgallemore6",
      country: "Canada",
      contact: "(825) 977-8152",
      email: "bgallemore6@boston.com",
      currentPlan: "company",
      status: "pending",
      avatar: "",
      avatarColor: "light-danger",
    },
    {
      id: 8,
      billing: "Manual - Cash",
      fullName: "Kathryne Liger",
      company: "Pixoboo PVT LTD",
      role: "author",
      username: "kliger7",
      country: "France",
      contact: "(187) 440-0934",
      email: "kliger7@vinaora.com",
      currentPlan: "enterprise",
      status: "pending",
      avatar: avatar9,
    },
  ],
};

// GET ALL DATA
mock.onGet("/api/users/list/all-data").reply(200, data.users);

// POST: Add new user
mock.onPost("/apps/users/add-user").reply((config) => {
  // Get event from post data
  const user = JSON.parse(config.data);
  const highestValue = data.users.reduce((a, b) => (a.id > b.id ? a : b)).id;

  user.id = highestValue + 1;

  data.users.push(user);

  return [201, { user }];
});

// GET Updated DATA
mock.onGet("/api/users/list/data").reply((config) => {
  const {
    q = "",
    page = 1,
    role = null,
    perPage = 10,
    sort = "asc",
    status = null,
    currentPlan = null,
    sortColumn = "fullName",
  } = config;

  /* eslint-disable  */
  const queryLowered = q.toLowerCase();

  const dataAsc = data.users.sort((a, b) =>
    a[sortColumn] < b[sortColumn] ? -1 : 1,
  );

  const dataToFilter = sort === "asc" ? dataAsc : dataAsc.reverse();

  const filteredData = dataToFilter.filter(
    (user) =>
      (user.email.toLowerCase().includes(queryLowered) ||
        user.fullName.toLowerCase().includes(queryLowered) ||
        user.billing.toLowerCase().includes(queryLowered)) &&
      user.role === (role || user.role) &&
      user.currentPlan === (currentPlan || user.currentPlan) &&
      user.status === (status || user.status),
  );
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      users: paginateArray(filteredData, perPage, page),
    },
  ];
});

// GET USER
mock.onGet("/api/users/user").reply((config) => {
  const { id } = config;
  const user = data.users.find((i) => i.id === id);
  return [200, { user }];
});

// DELETE: Deletes User
mock.onDelete("/apps/users/delete").reply((config) => {
  // Get user id from URL
  let userId = config.id;

  // Convert Id to number
  userId = Number(userId);

  const userIndex = data.users.findIndex((t) => t.id === userId);
  data.users.splice(userIndex, 1);

  return [200];
});
