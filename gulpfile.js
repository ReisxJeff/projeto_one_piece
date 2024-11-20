const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

function scripts(){
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}

// Tarefa para compilar os arquivos .scss em CSS e minificar
function styles() {
    return gulp.src('./src/styles/*.scss')  // Origem dos arquivos .scss
        .pipe(sass({ outputStyle: 'compressed' }))  // Compilação para CSS minificado
        .pipe(gulp.dest('./dist/css'));  // Destino do CSS compilado
}

// Tarefa para otimizar as imagens e movê-las para a pasta de distribuição
function images() {
    return gulp.src('./src/images/**/*')  // Origem de todas as imagens
        .pipe(imagemin())  // Otimização das imagens
        .pipe(gulp.dest('./dist/images'));  // Destino das imagens otimizadas
}

// Tarefa build: compila CSS e otimiza imagens
// A tarefa build é a padrão e será executada quando rodar `gulp` sem argumentos
exports.build = gulp.parallel(styles, images, scripts);  // Compila os estilos e otimiza as imagens em paralelo

// Tarefa watch: monitora alterações nos arquivos .scss e nas imagens
// Quando houver alterações, as respectivas tarefas serão executadas novamente
exports.watch = function() {
    // Monitora os arquivos .scss e executa a tarefa 'styles' quando houver alteração
    gulp.watch('./src/styles/*.scss', gulp.series(styles));

    // Monitora todas as imagens e executa a tarefa 'images' quando houver alteração
    gulp.watch('./src/images/**/*', gulp.series(images));
    gulp.watch('./src/scripts/*.js', gulp.series(scripts));
};

// A tarefa default será o build, portanto, executada quando rodar `gulp` sem argumentos
exports.default = exports.build;  // Define a tarefa padrão como 'build'
