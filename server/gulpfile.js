/* eslint-disable no-unused-vars */
import gulp from 'gulp'
import removeCode from 'gulp-remove-code'

function stripSolutions() {
  return gulp
    .src([
      './**/*.js',
      './**/*.html',
      './**/*.css',
      '!node_modules/**',
      '!gulp-dist/**',
      '!.parcel-cache/**',
      '!dist/**',
      '!gulpfile.js',
    ])
    .pipe(removeCode({ exercise: true }))
    .pipe(gulp.dest('./gulp-dist'))
}

function exportRestFiles() {
  return gulp
    .src(
      [
        './**/*',
        '!.github/workflows/publish-solution.yml',
        '!.git/**/*',
        '!./**/*.js',
        '!./**/*.html',
        '!./**/*.css',
        '!node_modules/**',
        '!gulp-dist/**',
        '!.parcel-cache/**',
        '!dist/**',
        '!gulpfile.js',
      ],
      { dot: true }
    )
    .pipe(gulp.dest('./gulp-dist'))
}

function filterFiles() {
  return gulp
    .src(['.github/workflows/build.yml', 'README.md'], { dot: true, base: '.' })
    .pipe(gulp.dest('./gulp-dist'))
}

export default gulp.series(stripSolutions, exportRestFiles)
