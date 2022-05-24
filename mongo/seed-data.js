// Create a new database
db = new Mongo().getDB("piranha");

// Create a collection to hold the applications users and products
db.createCollection('users', { capped: false });
db.createCollection('products', { capped: false });

// Insert records into the users collection
db.users.insertMany([
    {
        name: "Admin",
        email: "admin@mordor.org",
        password: "FilthyHobbitses",
        isAdmin: true
    },
    {
        name: "Smeagol",
        email: "smeagz@mordor.org",
        password: "FilthyHobbitses"
    },
    {
        name: "Bilbo Baggins",
        email: "bbaggins@mordor.org",
        password: "FilthyHobbitses"
    }
]);

// Insert records into the products collection
db.products.insertMany([
    {
        name: "Bag Of Devouring",
        image: "/images/bagOfDevouring.jpg",
        description:
            "Any plants or meat placed in the bag is immediately devoured by an otherworldly creature attached to the pocket dimension inside the bag. If anyone reaches inside, they must try with all their strength to not get pulled in. If they do, they are eaten and effectively killed. In addition, any nonfood items placed in the bag are consumed at the end of each day and spat out onto a random plane of existence.",
        brand: "Charon",
        category: "Special Item",
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12
    },
    {
        name: "Cloak of the Bat",
        image: "/images/cloakOfTheBat.jpg",
        description: "Want to be Batman? I'M BATMANNNN! (Boosts stealth skills)",
        brand: "Megara",
        category: "Clothing",
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8
    },
    {
        name: "Dust Of Sneezing",
        image: "/images/dustOfSneezing.jpg",
        description:
            "The dust resembles and magically identifies as dust of disappearance, an item that grants invisibility. However, instead of turning invisible, you and everyone with 30 feet start coughing and sneezing uncontrollably while you begin to suffocate to death.",
        brand: "Charon",
        category: "Trick Item",
        price: 399.99,
        countInStock: 11,
        rating: 5,
        numReviews: 12
    },
    {
        name: "Tome of Health",
        image: "/images/statIncreasingManuals.jpg",
        description:
            "Boost your stats through reading books! The three manuals are bodily health, gainful exercise, and quickness of action and they boost the reader’s Constitution, Strength, and Dexterity, respectively",
        brand: "Achilles",
        category: "Special Item",
        price: 49.99,
        countInStock: 7,
        rating: 3.5,
        numReviews: 10
    },
    {
        name: "Nolzur’s Marvelous Pigments",
        image: "/images/nolzursMagnificientPigments.jpg",
        description:
            "All you have to do if think of any inanimate object as you paint with the brush and it will go from two dimensions to three, thus making the object real!",
        brand: "Hypnos",
        category: "Mystic Item",
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReviews: 12
    },
    {
        name: "Wand Of Wonder",
        image: "/images/wandOfWonder.jpg",
        description:
            "This wand is much like a gun, if you don’t intend to kill something with it, don’t point and use it. Several of the effects of the wand will be placed on you if the target is not a creature. When using one of the wand’s seven charges, roll a d100 and use the chart in the Dungeon Master’s Guide. There are random spells, random animals materializing into extinct, environmental effects, and other effects that could be helpful or hurtful. Every morning it can regain charges and when it runs out, there is a chance the wand will destroy itself and turn to dust.",
        brand: "Hades",
        category: "Weapon",
        price: 29.99,
        countInStock: 1,
        rating: 3,
        numReviews: 6
    }
]);