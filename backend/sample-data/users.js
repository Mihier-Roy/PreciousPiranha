import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin",
        email: "admin@mordor.org",
        password: bcrypt.hashSync("FilthyHobbitses", 10),
        isAdmin: true
    },
    {
        name: "Smeagol",
        email: "smeagz@mordor.org",
        password: bcrypt.hashSync("FilthyHobbitses", 10)
    },
    {
        name: "Bilbo Baggins",
        email: "bbaggins@mordor.org",
        password: bcrypt.hashSync("FilthyHobbitses", 10)
    }
];

export default users;
