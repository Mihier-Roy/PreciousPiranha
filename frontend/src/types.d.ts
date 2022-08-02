type ProductItem = {
    _id?: string;
    user: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    reviews: Reviews[];
};

type Reviews = {
    name: string;
    rating: number;
    comment: string;
};

type CartItem = {
    name: string;
    quantity: number;
    image: string;
    price: number;
    productID: number;
    countInStock: number;
};

type ShippingAddress = {
    address: string;
    city: string;
    postalCode: string;
    country: string;
};

type PaymentResult = {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
};

type OrderDetails = {
    _id?: string;
    user: User;
    orderItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentResult: PaymentResult;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt: string;
    isDelivered: boolean;
    deliveredAt: string;
    createdAt: string;
};

type UserAuthData = {
    name: string;
    token: string;
    isAdmin: boolean;
};

type LoginData = {
    email: string;
    password: string;
};

type RegisterData = {
    name: string;
    email: string;
    password: string;
};

type UserProfile = {
    _id?: string;
    token?: string;
    name: string;
    email: string;
    password?: string;
};

type User = {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
};
