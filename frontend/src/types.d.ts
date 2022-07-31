type ProductItem = {
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
    user: string;
    orderItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentResult: PaymentResult;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt: Date | null;
    isDelivered: boolean;
    deliveredAt: Date | null;
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
