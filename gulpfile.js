var gulp = require('gulp'),
connect = require('gulp-connect'),
historyApiFallback = require('connect-history-api-fallback');
// Servidor web de desarrollo
gulp.task('server', function() {
	connect.server({
	root: './app',
	hostname: 'proyectos.estres.local',
	port: 3000,
	livereload: true,
	middleware: function(connect, opt) {
		return [ historyApiFallback ];
	}
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
	return gulp.src('./app/scripts/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
	gulp.src('./app/**/*.html')
		.pipe(connect.reload());
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
	gulp.watch(['./app/**/*.html'], ['html']);
	gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint']);
});

gulp.task('default', ['server', 'watch']);