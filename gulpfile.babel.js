'use strict';
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import esformatter from 'gulp-esformatter';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('babel', () => {
  return gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    })).pipe(esformatter())
    .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest('./dist'));
});

gulp.task('lint', () => {
  return gulp.src(['./src/**/*.js', '!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format());
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    // .pipe(eslint.failAfterError());

});

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['babel']);
});

gulp.task('default', ['watch', 'lint', 'babel']);

gulp.task('linter', ['lint']);

