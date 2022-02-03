const Plugins = [
	// jQuery
	{
		from: "node_modules/jquery/dist",
		to: "jquery",
	},
	// Popper
	{
		from: "node_modules/popper.js/dist",
		to: "popper",
	},
	// Bootstrap
	{
		from: "node_modules/bootstrap/dist/js",
		to: "bootstrap/js",
	},
	// Font Awesome
	{
		from: "node_modules/@fortawesome/fontawesome-free/css",
		to: "fontawesome-free/css",
	},
	{
		from: "node_modules/@fortawesome/fontawesome-free/webfonts",
		to: "fontawesome-free/webfonts",
	},
	// overlayScrollbars
	{
		from: "node_modules/overlayscrollbars/js",
		to: "overlayScrollbars/js",
	},
	{
		from: "node_modules/overlayscrollbars/css",
		to: "overlayScrollbars/css",
	},
	// Chart.js
	{
		from: "node_modules/chart.js/dist/",
		to: "chart.js",
	},
	// jQuery UI
	{
		from: "node_modules/jquery-ui-dist/",
		to: "jquery-ui",
	},
	// Flot
	{
		from: "node_modules/flot/dist/es5/",
		to: "flot",
	},
	// Summernote
	{
		from: "node_modules/summernote/dist/",
		to: "summernote",
	},
	// Bootstrap Slider
	{
		from: "node_modules/bootstrap-slider/dist/",
		to: "bootstrap-slider",
	},
	{
		from: "node_modules/bootstrap-slider/dist/css",
		to: "bootstrap-slider/css",
	},
	// Bootstrap Colorpicker
	{
		from: "node_modules/bootstrap-colorpicker/dist/js",
		to: "bootstrap-colorpicker/js",
	},
	{
		from: "node_modules/bootstrap-colorpicker/dist/css",
		to: "bootstrap-colorpicker/css",
	},
	// Tempusdominus Bootstrap 4
	{
		from: "node_modules/tempusdominus-bootstrap-4/build/js",
		to: "tempusdominus-bootstrap-4/js",
	},
	{
		from: "node_modules/tempusdominus-bootstrap-4/build/css",
		to: "tempusdominus-bootstrap-4/css",
	},
	// Moment
	{
		from: "node_modules/moment/min",
		to: "moment",
	},
	{
		from: "node_modules/moment/locale",
		to: "moment/locale",
	},
	// FastClick
	{
		from: "node_modules/fastclick/lib",
		to: "fastclick",
	},
	// Date Range Picker
	{
		from: "node_modules/daterangepicker/",
		to: "daterangepicker",
	},
	// DataTables
	{
		from: "node_modules/pdfmake/build",
		to: "pdfmake",
	},
	{
		from: "node_modules/jszip/dist",
		to: "jszip",
	},
	{
		from: "node_modules/datatables.net/js",
		to: "datatables",
	},
	{
		from: "node_modules/datatables.net-bs4/js",
		to: "datatables-bs4/js",
	},
	{
		from: "node_modules/datatables.net-bs4/css",
		to: "datatables-bs4/css",
	},
	{
		from: "node_modules/datatables.net-autofill/js",
		to: "datatables-autofill/js",
	},
	{
		from: "node_modules/datatables.net-autofill-bs4/js",
		to: "datatables-autofill/js",
	},
	{
		from: "node_modules/datatables.net-autofill-bs4/css",
		to: "datatables-autofill/css",
	},
	{
		from: "node_modules/datatables.net-buttons/js",
		to: "datatables-buttons/js",
	},
	{
		from: "node_modules/datatables.net-buttons-bs4/js",
		to: "datatables-buttons/js",
	},
	{
		from: "node_modules/datatables.net-buttons-bs4/css",
		to: "datatables-buttons/css",
	},
	{
		from: "node_modules/datatables.net-colreorder/js",
		to: "datatables-colreorder/js",
	},
	{
		from: "node_modules/datatables.net-colreorder-bs4/js",
		to: "datatables-colreorder/js",
	},
	{
		from: "node_modules/datatables.net-colreorder-bs4/css",
		to: "datatables-colreorder/css",
	},
	{
		from: "node_modules/datatables.net-fixedcolumns/js",
		to: "datatables-fixedcolumns/js",
	},
	{
		from: "node_modules/datatables.net-fixedcolumns-bs4/js",
		to: "datatables-fixedcolumns/js",
	},
	{
		from: "node_modules/datatables.net-fixedcolumns-bs4/css",
		to: "datatables-fixedcolumns/css",
	},
	{
		from: "node_modules/datatables.net-fixedheader/js",
		to: "datatables-fixedheader/js",
	},
	{
		from: "node_modules/datatables.net-fixedheader-bs4/js",
		to: "datatables-fixedheader/js",
	},
	{
		from: "node_modules/datatables.net-fixedheader-bs4/css",
		to: "datatables-fixedheader/css",
	},
	{
		from: "node_modules/datatables.net-keytable/js",
		to: "datatables-keytable/js",
	},
	{
		from: "node_modules/datatables.net-keytable-bs4/js",
		to: "datatables-keytable/js",
	},
	{
		from: "node_modules/datatables.net-keytable-bs4/css",
		to: "datatables-keytable/css",
	},
	{
		from: "node_modules/datatables.net-responsive/js",
		to: "datatables-responsive/js",
	},
	{
		from: "node_modules/datatables.net-responsive-bs4/js",
		to: "datatables-responsive/js",
	},
	{
		from: "node_modules/datatables.net-responsive-bs4/css",
		to: "datatables-responsive/css",
	},
	{
		from: "node_modules/datatables.net-rowgroup/js",
		to: "datatables-rowgroup/js",
	},
	{
		from: "node_modules/datatables.net-rowgroup-bs4/js",
		to: "datatables-rowgroup/js",
	},
	{
		from: "node_modules/datatables.net-rowgroup-bs4/css",
		to: "datatables-rowgroup/css",
	},
	{
		from: "node_modules/datatables.net-rowreorder/js",
		to: "datatables-rowreorder/js",
	},
	{
		from: "node_modules/datatables.net-rowreorder-bs4/js",
		to: "datatables-rowreorder/js",
	},
	{
		from: "node_modules/datatables.net-rowreorder-bs4/css",
		to: "datatables-rowreorder/css",
	},
	{
		from: "node_modules/datatables.net-scroller/js",
		to: "datatables-scroller/js",
	},
	{
		from: "node_modules/datatables.net-scroller-bs4/js",
		to: "datatables-scroller/js",
	},
	{
		from: "node_modules/datatables.net-scroller-bs4/css",
		to: "datatables-scroller/css",
	},
	{
		from: "node_modules/datatables.net-select/js",
		to: "datatables-select/js",
	},
	{
		from: "node_modules/datatables.net-select-bs4/js",
		to: "datatables-select/js",
	},
	{
		from: "node_modules/datatables.net-select-bs4/css",
		to: "datatables-select/css",
	},

	// Fullcalendar
	{
		from: "node_modules/@fullcalendar/core/",
		to: "fullcalendar",
	},
	{
		from: "node_modules/@fullcalendar/bootstrap/",
		to: "fullcalendar-bootstrap",
	},
	{
		from: "node_modules/@fullcalendar/daygrid/",
		to: "fullcalendar-daygrid",
	},
	{
		from: "node_modules/@fullcalendar/timegrid/",
		to: "fullcalendar-timegrid",
	},
	{
		from: "node_modules/@fullcalendar/interaction/",
		to: "fullcalendar-interaction",
	},
	// icheck bootstrap
	{
		from: "node_modules/icheck-bootstrap/",
		to: "icheck-bootstrap",
	},
	// inputmask
	{
		from: "node_modules/inputmask/dist/",
		to: "inputmask",
	},
	// ion-rangeslider
	{
		from: "node_modules/ion-rangeslider/",
		to: "ion-rangeslider",
	},
	// JQVMap (jqvmap-novulnerability)
	{
		from: "node_modules/jqvmap-novulnerability/dist/",
		to: "jqvmap",
	},
	// jQuery Mapael
	{
		from: "node_modules/jquery-mapael/js/",
		to: "jquery-mapael",
	},
	// Raphael
	{
		from: "node_modules/raphael/",
		to: "raphael",
	},
	// jQuery Mousewheel
	{
		from: "node_modules/jquery-mousewheel/",
		to: "jquery-mousewheel",
	},
	// jQuery Knob
	{
		from: "node_modules/jquery-knob-chif/dist/",
		to: "jquery-knob",
	},
	// pace-progress
	{
		from: "node_modules/@lgaitan/pace-progress/dist/",
		to: "pace-progress",
	},
	// Select2
	{
		from: "node_modules/select2/dist/",
		to: "select2",
	},
	{
		from: "node_modules/@ttskch/select2-bootstrap4-theme/dist/",
		to: "select2-bootstrap4-theme",
	},
	// Sparklines
	{
		from: "node_modules/sparklines/source/",
		to: "sparklines",
	},
	// SweetAlert2
	{
		from: "node_modules/sweetalert2/dist/",
		to: "sweetalert2",
	},
	{
		from: "node_modules/@sweetalert2/theme-bootstrap-4/",
		to: "sweetalert2-theme-bootstrap-4",
	},
	// Toastr
	{
		from: "node_modules/toastr/build/",
		to: "toastr",
	},
	// jsGrid
	{
		from: "node_modules/jsgrid/dist",
		to: "jsgrid",
	},
	{
		from: "node_modules/jsgrid/demos/",
		to: "jsgrid/demos",
	},
	// flag-icon-css
	{
		from: "node_modules/flag-icon-css/css",
		to: "flag-icon-css/css",
	},
	{
		from: "node_modules/flag-icon-css/flags",
		to: "flag-icon-css/flags",
	},
	// bootstrap4-duallistbox
	{
		from: "node_modules/bootstrap4-duallistbox/dist",
		to: "bootstrap4-duallistbox/",
	},
	// filterizr
	{
		from: "node_modules/filterizr/dist",
		to: "filterizr/",
	},
	// ekko-lightbox
	{
		from: "node_modules/ekko-lightbox/dist",
		to: "ekko-lightbox/",
	},

	// AdminLTE Dist
	{
		from: "dist/css",
		to: "src/public/css",
	},
	{
		from: "dist/js",
		to: "src/public/js",
	},
	// jQuery
	{
		from: "node_modules/jquery/dist",
		to: "jquery",
	},
	// Popper
	{
		from: "node_modules/popper.js/dist",
		to: "popper",
	},
	// Bootstrap
	{
		from: "node_modules/bootstrap/dist/js",
		to: "bootstrap/js",
	},
	// Font Awesome
	{
		from: "node_modules/@fortawesome/fontawesome-free/css",
		to: "fontawesome-free/css",
	},
	{
		from: "node_modules/@fortawesome/fontawesome-free/webfonts",
		to: "fontawesome-free/webfonts",
	},
	// overlayScrollbars
	{
		from: "node_modules/overlayscrollbars/js",
		to: "overlayScrollbars/js",
	},
	{
		from: "node_modules/overlayscrollbars/css",
		to: "overlayScrollbars/css",
	},
];

module.exports = Plugins;
