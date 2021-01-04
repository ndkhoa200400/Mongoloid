use shoppingWebsite

db.user.drop()
db.createCollection('user')
db.shop.drop()
db.createCollection('shop')
db.voucher.drop()
db.createCollection('voucher')
db.bill.drop()
db.createCollection('bill')
db.product.drop()
db.createCollection('product')
db.review.drop()
db.createCollection('review')
db.cart.drop()
db.createCollection('cart')
//insert
db.user.insertMany([
	{
		_id: 1,
		name: "Lý Duy Nam",
		username: "lyduynam",
		email: "lyduynam@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'seller',
    password: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordConfirm: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordChangedAt: new Date(2020, 1, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 1, 1),
    active:true
	},
	{
		_id: 2,
		name: "Nguyễn Đăng Khoa",
		username: "nguyendangkhoa",
		email: "nguyendangkhoa@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'seller',
    password: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordConfirm: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordChangedAt: new Date(2020, 1, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 1, 1),
    active:true
	},
	{
		_id: 3,
		name: "Lê Văn Thuận Mỹ",
		username: "levanthuanmy",
		email: "levanthuanmy@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'seller',
    password: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordConfirm: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordChangedAt: new Date(2020, 1, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 1, 1),
    active:true
	},
	{
		_id: 4,
		name: "Lê Trần Trúc Vân",
		username: "letrantrucvan",
		email: "letrantrucvan@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'custommer',
    password: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordConfirm: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordChangedAt: new Date(2020, 1, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 1, 1),
    active:true
	},
	{
		_id: 5,
		name: "Nguyễn Hoàng Minh",
		username: "nguyenhoangminh",
		email: "nguyenhoangminh@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'custommer',
    password: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordConfirm: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordChangedAt: new Date(2020, 1, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 1, 1),
    active:true
	},
	{
		_id: 6,
		name: "Admin",
		username: "admin",
		email: "admin@gmail.com",
    phone: "123456789",
    address: "HCM",
		role: 'admin',
    password: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordConfirm: "$10$cfmhlg7mycT8bKPgbjk5EetFP3pPpS.Wooh9tZ1IQgrlZscTMqkGO",
    passwordChangedAt: new Date(2020, 1, 1),
    passwordResetToken: "abc",
    passwordResetExpires: new Date(2020, 1, 1),
    active:true
	}
]
)
db.shop.insertMany([
	{
		_id: 1,
		sellerID: 1,
		name: "Shop này vip nhất",
		logo: "",
		rating: 5.0,
		phoneContact: "123456789",
		email: "shop@gmail.com",
		description: "Shop này vip lắm",
		joinDate: new Date (2020, 1, 1)
		
	},
	{
		_id: 2,
		sellerID: 2,
		name: "Shop cùi",
		logo: "",
		rating: 5.0,
		phoneContact: "123456789",
		email: "shop@gmail.com",
		description: "Shop này cùi bắp",
		joinDate: new Date (2020, 1, 1)
		
	},
	{
		_id: 3,
		sellerID: 3,
		name: "Shop bán đồ lót",
		logo: "",
		rating: 5.0,
		phoneContact: "123456789",
		email: "shop@gmail.com",
		description: "Shop này bán nhiều đồ lót đầy màu sắc",
		joinDate: new Date (2020, 1, 1)
		
	}
])
db.voucher.insertMany([
	{
		_id: 1,
		code: "ABCXYZ",
    discount: 0.2,
    openDate: new Date (2020, 1, 1),
    closeDate:new Date (2020, 2, 2),
    shopID: 1,
	}
])
db.product.insertMany([
	{
		_id: 1,
		name: "Áo phông trắng xinh xắn",
		price: 500000,
		images: ["/public/imgs/anh1.jpg", "/public/imgs/anh3.jpg"],
		description: "Áo để mặc",
		amount: 10,
		rating: 3,
		shopID: 1,
		category: "Áo", 
		createdAt: new Date (2020, 1, 1),
	},
	{
		_id: 2,
		name: "Nón pikachu",
		price: 200000,
		images: ["/public/imgs/product8.jpg"],
		description: "Nón bảo hiểm khi tham gia giao thông",
		amount: 4,
		rating: 5,
		shopID: 1,
		category: "Nón", 
		createdAt: new Date (2020, 1, 1), 
	},
	{
		_id: 3,
		name: "Áo MC",
		price: 100000,
		images: ["/public/imgs/product8.jpg"],
		description: "Áo để mặc đi đá banh",
		amount: 0,
		rating: 3,
		shopID: 1,
		category: "Áo",
		createdAt: new Date (2020, 1, 1)
	},
	{
		_id: 4,
		name: "Ba lô đen",
		price: 100000,
		images: ["/public/imgs/product5.jpg"],
		description: "Ba lô đi học",
		amount: 2,
		rating: 3,
		shopID: 2,
		category: "Ba lô",
		createdAt: new Date (2020, 1, 1)
	},
	{
		_id: 5,
		name: "Áo Mickey",
		price: 100000,
		images: ["/public/imgs/product3.jpg"],
		description: "Áo để mặc",
		amount: 2,
		rating: 3,
		shopID: 2,
		category: "Áo",
		createdAt: new Date (2020, 1, 1)
	},
	{
		_id: 6,
		name: "Túi xách",
		price: 100000,
		images: ["/public/imgs/product3.jpg"],
		description: "Túi xách đi dự tiệc",
		amount: 2,
		rating: 3,
		shopID: 2,
		category: "Áo",
		createdAt: new Date (2020, 1, 1)
	},
	{
		_id: 7,
		name: "Túi xách",
		price: 100000,
		images: ["/public/imgs/product3.jpg"],
		description: "Túi xách đi dự tiệc",
		amount: 2,
		rating: 3,
		shopID: 2,
		category: "Áo",
		createdAt: new Date (2020, 1, 1)
	},
	{
		_id: 8,
		name: "Quần vải",
		price: 50000,
		images: ["/public/imgs/anh2.jpg"],
		amount: 4,
		rating: 4,
		shopID: 3,
		category: "Quần",
		createdAt: new Date (2020, 1, 1)
	},
	{
		_id: 9,
		name: "Áo đen nữ",
		price: 50000,
		images: ["/public/imgs/swe1.jpg"],
		amount: 4,
		rating: 4,
		shopID: 3,
		category: "Áo",
		createdAt: new Date (2020, 1, 1)
	},
	{
		_id: 10,
		name: "Áo trắng nữ",
		price: 50000,
		images: ["/public/imgs/swe2.jpg"],
		amount: 4,
		rating: 4,
		shopID: 3,
		category: "Áo",
		createdAt: new Date (2020, 1, 1)
	},
	{
		_id: 11,
		name: "Áo đôi",
		price: 50000,
		images: ["/public/imgs/swe3.jpg"],
		amount: 4,
		rating: 4,
		shopID: 3,
		category: "Áo",
		createdAt: new Date (2020, 1, 1)
	}
])
db.bill.insertMany([
	{
		_id: 1,
		listProduct: [{proID: 1, amout: 1},{proID: 2, amout: 2}, {proID: 7, amout: 2}],
		time: new Date(2020, 1, 1),
		customer: 1
	},
	{
		_id: 2,
		listProduct: [{proID: 1, amout: 1}],
		time: new Date(2020, 1, 1),
		customer: 3
	},
	{
		_id: 3,
		listProduct: [{proID: 2, amout: 1},{proID: 10, amout: 2}],
		time: new Date(2020, 1, 1),
		customer: 5
	}
]);
db.cart.insertMany([
	{
		_id: 1,
		listProduct: [{proID: 1, amout: 1},{proID: 2, amout: 2}],
		time: new Date(2020, 1, 1),
		customer: 1
	},
	{
		_id: 2,
		listProduct: [{proID: 5, amout: 1},{proID: 6, amout: 2}],
		time: new Date(2020, 1, 1),
		customer: 3
	},
	{
		_id: 3,
		listProduct: [{proID: 2, amout: 1},{proID: 10, amout: 2}],
		time: new Date(2020, 1, 1),
		customer: 5
	}
])
db.review.insertMany([
	{
		_id: 1,
		review: "Sản phẩm này quá tốt",
		rating: 5,
		creatAt: new Date(2020, 1, 1),
		product: 1,
		user: 5
	},
	{
		_id: 2,
		review: "Sản phẩm xấu quá",
		rating: 1,
		creatAt: new Date(2020, 1, 1),
		product: 1,
		user: 4
	},
	{
		_id: 3,
		review: "Đẹp",
		rating: 5,
		creatAt: new Date(2020, 1, 1),
		product: 10,
		user: 5
	},
	{
		_id: 4,
		review: "Sản phẩm này quá tốt",
		rating: 5,
		creatAt: new Date(2020, 1, 1),
		product: 4,
		user: 5
	},
	{
		_id: 5,
		review: "Đẹp",
		rating: 5,
		creatAt: new Date(2020, 1, 1),
		product: 1,
		user: 1
	},
])
