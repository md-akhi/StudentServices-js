// path Home
exports.pathHome = {
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
// template Home
exports.templateHome = {
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

// path customer
exports.pathCustomer = {
	// customer
	root: "",
	Root: function () {
		return this.root;
	},
	auth: "/auth",
	Auth: function () {
		return this.auth;
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

// template Customer
exports.templateCustomer = {
	// customer
	root: "customer",
	Root: function () {
		return this.root;
	},
	auth: "auth",
	Auth: function () {
		return this.auth;
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

// path admin
exports.pathAdmin = {
	// admin
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

// template admin
exports.templateAdmin = {
	// admin
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
