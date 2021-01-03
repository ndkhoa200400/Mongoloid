use shoppingWebsite

db.users.drop()
db.createCollection('users')
db.shops.drop()
db.createCollection('shops')
db.vouchers.drop()
db.createCollection('vouchers')
db.bills.drop()
db.createCollection('bills')
db.products.drop()
db.createCollection('products')
db.reviews.drop()
db.createCollection('reviews')
db.carts.drop()
db.createCollection('carts')
//insert
db.users.insertMany([
	{
		_id: ObjectId("5ff185d606540000b70006d2"),
		name: "Lý Duy Nam",
		username: "lyduynam",
		email: "lyduynam@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'seller',
    password: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordConfirm: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordChangedAt: new Date(2020, 10, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 10, 1),
    active:true,
		openDate: new Date(2020, 10, 1),
	},
	{
		_id: ObjectId("5ff185d606540000b70006d3"),
		name: "Nguyễn Đăng Khoa",
		username: "nguyendangkhoa",
		email: "nguyendangkhoa@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'seller',
    password: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordConfirm: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordChangedAt: new Date(2020, 11, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 11, 1),
    active:true,
		openDate: new Date(2020, 11, 1),
	},
	{
		_id: ObjectId("5ff185d606540000b70006d4"),
		name: "Lê Văn Thuận Mỹ",
		username: "levanthuanmy",
		email: "levanthuanmy@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'seller',
    password: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordConfirm: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordChangedAt: new Date(2020, 12, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 12, 1),
    active:true,
		openDate: new Date(2020, 12, 1),
	},
	{
		_id: ObjectId("5ff185d606540000b70006d5"),
		name: "Lê Trần Trúc Vân",
		username: "letrantrucvan",
		email: "letrantrucvan@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'custommer',
    password: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordConfirm: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordChangedAt: new Date(2020, 12, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 12, 1),
    active:true,
		openDate: new Date(2020, 12, 1),
	},
	{
		_id: ObjectId("5ff185d606540000b70006d6"),
		name: "Nguyễn Hoàng Minh",
		username: "nguyenhoangminh",
		email: "nguyenhoangminh@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'custommer',
    password: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordConfirm: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordChangedAt: new Date(2020, 12, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 12, 1),
    active:true,
		openDate: new Date(2020, 12, 1),
	},
	{
		_id: ObjectId("5ff185d606540000b70006d7"),
		name: "Admin",
		username: "admin",
		email: "admin@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'admin',
    password: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordConfirm: "$2b$12$pWlLNq797QIJvBDeEGfqRumNPZ/G0dmiSbwNDyAfGXqOvfnI1TK7K",
    passwordChangedAt: new Date(2020, 1, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 1, 1),
    active:true,
		openDate: new Date(2020, 8, 1),
	}
]
)
db.shops.insertMany([
	{
		_id: ObjectId("5ff19b7f06540000b7000706"),
		sellerID: ObjectId("5ff185d606540000b70006d2"),
		name: "Shop này vip nhất",
		logo: "",
		rating: 5.0,
		phoneContact: "123456789",
		email: "shop@gmail.com",
		description: "Shop này vip lắm",
		joinDate: new Date (2020, 1, 1)
		
	},
	{
		_id: ObjectId("5ff19b7f06540000b7000707"),
		sellerID: ObjectId("5ff185d606540000b70006d3"),
		name: "Shop cùi",
		logo: "",
		rating: 5.0,
		phoneContact: "123456789",
		email: "shop@gmail.com",
		description: "Shop này cùi bắp",
		joinDate: new Date (2020, 1, 1)
		
	},
	{
		_id: ObjectId("5ff19b7f06540000b7000708"),
		sellerID: ObjectId("5ff185d606540000b70006d4"),
		name: "Shop bán đồ lót",
		logo: "",
		rating: 5.0,
		phoneContact: "123456789",
		email: "shop@gmail.com",
		description: "Shop này bán nhiều đồ lót đầy màu sắc",
		joinDate: new Date (2020, 1, 1)
		
	}
])
db.vouchers.insertMany([
	{
		_id: ObjectId("5ff19b7f06540000b7000809"),
		code: "ABCXYZ",
    discount: 0.2,
    openDate: new Date (2020, 1, 1),
    closeDate:new Date (2020, 2, 2),
    shopID: ObjectId("5ff19b7f06540000b7000706"),
	}
])
db.products.insertMany([
	{
		_id: ObjectId("5ff1896f06540000b70006dc"),
		name: "Áo phông trắng xinh xắn",
		price: 500000,
		images: ["/public/imgs/anh1.jpg", "/public/imgs/anh3.jpg"],
		description: "Áo để mặc",
		amount: 10,
		rating: 3,
		shopID: ObjectId("5ff19b7f06540000b7000706"),
		category: "Áo", 
		createdAt: new Date (2020, 1, 1),
		slug: "ao-phong-xinh-xan",

	},
	{
		_id: ObjectId("5ff1896f06540000b70006dd"),
		name: "Nón pikachu",
		price: 200000,
		images: ["/public/imgs/nonvang.jpg"],
		description: "Nón bảo hiểm khi tham gia giao thông",
		amount: 4,
		rating: 5,
		shopID: ObjectId("5ff19b7f06540000b7000706"),
		category: "Nón", 
		createdAt: new Date (2020, 1, 1), 
		slug: "non0vang-pikachu"
	},
	{
		_id: ObjectId("5ff1896f06540000b70006de"),
		name: "Áo MC",
		price: 100000,
		images: ["/public/imgs/product8.jpg"],
		description: "Áo để mặc đi đá banh",
		amount: 0,
		rating: 3,
		shopID: ObjectId("5ff19b7f06540000b7000706"),
		category: "Áo",
		createdAt: new Date (2020, 1, 1),
		slug: "ao-da-banh",
	},
	{
		_id: ObjectId("5ff1896f06540000b70006df"),
		name: "Ba lô đen",
		price: 100000,
		images: ["/public/imgs/product5.jpg"],
		description: "Ba lô đi học",
		amount: 2,
		rating: 3,
		shopID:ObjectId("5ff19b7f06540000b7000707"),
		category: "Ba lô",
		createdAt: new Date (2020, 1, 1),
		slug: "ba-lo-den",
	},
	{
		_id: ObjectId("5ff1896f06540000b70006e0"),
		name: "Áo Mickey",
		price: 100000,
		images: ["/public/imgs/product3.jpg"],
		description: "Áo để mặc",
		amount: 2,
		rating: 3,
		shopID: ObjectId("5ff19b7f06540000b7000707"),
		category: "Áo",
		createdAt: new Date (2020, 1, 1),
		slug:"ao-mickey",
	},
	{
		_id: ObjectId("5ff1896f06540000b70006e1"),
		name: "Túi xách",
		price: 100000,
		images: ["/public/imgs/product9.jpg"],
		description: "Túi xách đi dự tiệc",
		amount: 2,
		rating: 3,
		shopID: ObjectId("5ff19b7f06540000b7000707"),
		category: "Áo",
		createdAt: new Date (2020, 1, 1),
		slug: "tui-xach-du-tiec"
	},
	
	{
		_id: ObjectId("5ff1896f06540000b70006e2"),
		name: "Quần vải",
		price: 50000,
		images: ["/public/imgs/anh2.jpg"],
		amount: 4,
		rating: 4,
		shopID: ObjectId("5ff19b7f06540000b7000708"),
		category: "Quần",
		createdAt: new Date (2020, 1, 1),
		slug: "quan-vai",
	},
	{
		_id: ObjectId("5ff1896f06540000b70006e3"),
		name: "Áo đen nữ",
		price: 50000,
		images: ["/public/imgs/swe1.jpg"],
		amount: 4,
		rating: 4,
		shopID: ObjectId("5ff19b7f06540000b7000708"),
		category: "Áo",
		createdAt: new Date (2020, 1, 1),
		slug: "ao-den-nu",
	},
	{
		_id: ObjectId("5ff1896f06540000b70006e4"),
		name: "Áo trắng nữ",
		price: 50000,
		images: ["/public/imgs/swe2.jpg"],
		amount: 4,
		rating: 4,
		shopID: ObjectId("5ff19b7f06540000b7000708"),
		category: "Áo",
		createdAt: new Date (2020, 1, 1),
		slug: "ao-trang-nu"
	},
	{
		_id: ObjectId("5ff1896f06540000b70006e5"),
		name: "Áo đôi",
		price: 50000,
		images: ["/public/imgs/swe3.jpg"],
		amount: 4,
		rating: 4,
		shopID: ObjectId("5ff19b7f06540000b7000708"),
		category: "Áo",
		createdAt: new Date (2020, 1, 1),
		slug: "ao-doi"
	}
])
db.bills.insertMany([
	{
		listProduct: [{proID: ObjectId("5ff1896f06540000b70006dc"), amount: 1},{proID: ObjectId("5ff1896f06540000b70006dd"), amount: 2}, {proID: ObjectId("5ff1896f06540000b70006e1"), amount: 2}],
		time: new Date(2020, 1, 1),
		customer: ObjectId("5ff185d606540000b70006d2")
	},
	{
		listProduct: [{proID: ObjectId("5ff1896f06540000b70006dc"), amount: 1}],
		time: new Date(2020, 1, 1),
		customer: ObjectId("5ff185d606540000b70006d5")
	},
	{
		listProduct: [{proID: ObjectId("5ff1896f06540000b70006dd"), amount: 1},{proID: ObjectId("5ff1896f06540000b70006e4"), amount: 2}],
		time: new Date(2020, 1, 1),
		customer: ObjectId("5ff185d606540000b70006d6")
	},
	{
		listProduct: [{proID: ObjectId("5ff1896f06540000b70006de"), amount: 2},{proID: ObjectId("5ff1896f06540000b70006e4"), amount: 2}],
		time: new Date(2020, 1, 1),
		customer: ObjectId("5ff185d606540000b70006d6")
	}
]);

db.reviews.insertMany([
	{
		review: "Sản phẩm này quá tốt",
		rating: 5,
		creatAt: new Date(2020, 1, 1),
		product: ObjectId("5ff1896f06540000b70006dc"),
		user: ObjectId("5ff185d606540000b70006d6")
	},
	{
		review: "Sản phẩm xấu quá",
		rating: 1,
		creatAt: new Date(2020, 1, 1),
		product: ObjectId("5ff1896f06540000b70006dc"),
		user: ObjectId("5ff185d606540000b70006d5")
	},
	{
		review: "Đẹp",
		rating: 5,
		creatAt: new Date(2020, 1, 1),
		product: ObjectId("5ff1896f06540000b70006e4"),
		user: ObjectId("5ff185d606540000b70006d6")
	},
	{
		review: "Sản phẩm này quá tốt",
		rating: 5,
		creatAt: new Date(2020, 1, 1),
		product: ObjectId("5ff1896f06540000b70006df"),
		user: ObjectId("5ff185d606540000b70006d2")
	},
	{
		review: "Đẹp",
		rating: 5,
		creatAt: new Date(2020, 1, 1),
		product: ObjectId("5ff1896f06540000b70006dc"),
		user: ObjectId("5ff185d606540000b70006d3")
	},
])
