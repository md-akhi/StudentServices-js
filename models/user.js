import Mongoose from "mongoose";

var UserSchema = Mongoose.Schema(
	{
		name: {
			first: {
				type: String,
				trim: true,
			},
			last: {
				type: String,
				trim: true,
			},
		},
		username: {
			now: {
				type: String,
				unique: true,
			},
			before: {},
		},
		email: {
			now: {
				type: String,
				unique: true,
				required: true,
			},
			new: {
				type: String,
			},
			before: {},
			isActive: {
				type: String,
				default: false,
			},
		},
		password: {
			now: {
				type: String,
				index: true,
			},
			new: {
				type: String,
			},
			before: {},
			rest: {
				token: { type: String },
				expires: { type: Date },
			},
		},
		company: {
			name: {
				type: String,
			},
			address: {
				type: String,
			},
			phone: { type: String },
			email: {
				type: String,
			},
			website: {
				type: String,
			},
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		avatar: {
			type: String,
			default: "default",
		},
		role: {
			//permissionLevel
			type: String,
			default: "ROLE_MEMBER",
			enum: ["ROLE_MEMBER", "ROLE_ADMIN"],
		},
		updatedAt: Date,
		createdAt: {
			type: Date,
			default: Date.now,
		},
		born: { type: Date },
	},
	{ timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

// Virtual for author "full" name.
UserSchema.virtual("gFullName").get(function () {
	return this.name.first + " " + this.name.last;
});
// Virtual for author "email".
UserSchema.virtual("gEmail").get(function () {
	return this.email.now;
});
// Virtual for author "password".
UserSchema.virtual("gPassword").get(function () {
	return this.password.now;
});

UserSchema.statics.findByLogin = async function (login) {
	let user = await this.findOne({
		username: { now: login },
	});

	if (!user) {
		user = await this.findOne({ email: { now: login } });
	}

	return user;
};

UserSchema.static.findById = async function (id, callback) {
	let user = await this.findById(id, callback);
	return user;
};

UserSchema.static.getAllUsers = async function (arg) {
	let users = await this.find(arg);
	return users;
};

let User = Mongoose.model("InfoUsers", UserSchema);

// createUser: function (newUser, callback) {
// 	bcrypt.genSalt(10, function (err, salt) {
// 		bcrypt.hash(newUser.password, salt, function (err, hash) {
// 			newUser.password = hash;
// 			newUser.save(callback);
// 		});
// 	});
// },

// comparePassword: function (givenPassword, hash, callback) {
// 	bcrypt.compare(givenPassword, hash, function (err, isMatch) {
// 		if (err) throw err;
// 		callback(null, isMatch);
// 	});
// },

var HistoryUserSchema = Mongoose.Schema(
	{
		ipAddress: {
			type: String,
		},
		infoSystem: { type: String },
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

let HistoryUser = Mongoose.model("historyUser", HistoryUserSchema);

//user: { type: Mongoose.ObjectId, ref: 'User' },

var PermissionUserSchema = Mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now,
		},
		frelanser: {
			type: String,
		},
		employer: {
			type: String,
		},
		admin: {
			type: String,
		},
	},
	{ timestamps: true }
);

let PermissionUser = Mongoose.model("permissionUser", PermissionUserSchema);

export { User, HistoryUser, PermissionUser };
