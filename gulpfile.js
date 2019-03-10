const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');


const tsProject = ts.createProject('tsconfig.json');

gulp.task('script', ['static'] ,() => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));

});

gulp.task('clean', () => {
    return gulp
        .src('dist')
        .pipe(clean());
});

gulp.task('build',['script']);


gulp.task('static', () => {
    return gulp
        .src(['src/**/*.json'])
        .pipe(gulp.dest('dist/'));
})

gulp.task('wacth',['build'], () => {
    return gulp.watch(['src/**/*.ts','src/**/*.json'], ['build']);
});

gulp.task('default',['wacth','static']);