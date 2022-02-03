// Path Home
exports.homePath = {
	// Home
	root: "",
	Root: function () {
		return this.root;
	},
	auth: "/auth",
	Auth: function () {
		return this.auth;
	},
};
// Template Home
exports.homeTemplate = {
	// Home
	root: "",
	Root: function () {
		return this.root;
	},
	auth: "auth",
	Auth: function () {
		return this.auth;
	},
};

// Path Customer
exports.customerPath = {
	// Customer
	root: "",
	Root: function () {
		return this.root;
	},
	dashboard: "/dashboard",
	Dashboard: function () {
		return this.Root() + this.dashboard;
	},
	employer: "/employer",
	Employer: function () {
		return this.Dashboard() + this.employer;
	},
	frelanser: "/frelanser",
	Frelanser: function () {
		return this.Dashboard() + this.frelanser;
	},
};

// Template Customer
exports.customerTemplate = {
	// Customer
	root: "customer",
	Root: function () {
		return this.root;
	},
	dashboard: "/dashboard",
	Dashboard: function () {
		return this.Root() + this.dashboard;
	},
	employer: "/employer",
	Employer: function () {
		return this.Dashboard() + this.employer;
	},
	frelanser: "/frelanser",
	Frelanser: function () {
		return this.Dashboard() + this.frelanser;
	},
};

// Path Admin
exports.adminPath = {
	// Admin
	root: "admin",
	Root: function () {
		return this.root;
	},
	auth: "/auth",
	Auth: function () {
		return this.Root() + this.auth;
	},
	dashboard: "/dashboard",
	Dashboard: function () {
		return this.Root() + this.dashboard;
	},
};

// Template Admin
exports.adminTemplate = {
	// Admin
	root: "admin",
	Root: function () {
		return this.root;
	},
	auth: "auth",
	Auth: function () {
		return this.Root() + this.auth;
	},
	dashboard: "/dashboard",
	Dashboard: function () {
		return this.Root() + this.dashboard;
	},
};

// Template Home
exports.errorTemplate = {
	// Home
	root: "error",
	Root: function () {
		return this.root;
	},
};
