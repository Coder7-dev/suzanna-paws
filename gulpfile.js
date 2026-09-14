let project_folder = "dist"; // You can rename this line if you want the dist folder to match your project folder name / Вы можете переименовать эту строку, если хотите, чтобы папка dist называлась так же, как называется папка проекта: let project_folder = require("path").basename(__dirname);
let source_folder = "#src";

let fs = require('fs');

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!"+source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html-nosvg'),
    webpcss = require('gulp-webpcss'),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    through2 = require('through2'),
    fonter = require('gulp-fonter-fix'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    changed = require('gulp-changed');

 
function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000, 
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(plumber(notify.onError({ 
            title: "HTML",
            message: "Error: <%= error.message %>"
        })))
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(plumber(notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })))
        .pipe(scss({ outputStyle: "expanded" }))
        .pipe(
            group_media()
        )
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(webpcss({
            webpClass: ".webp",     
            noWebpClass: ".no-webp" 
        }))
        .pipe(dest(path.build.css))
        .pipe(
            clean_css()
        )
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(plumber(notify.onError({ 
            title: "JavaScript",
            message: "Error: <%= error.message %>"
        })))
        .pipe(fileinclude())
        .pipe(babel({ 
            presets: ['@babel/preset-env'] 
        }))
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    src(path.src.img, { encoding: false })
        .pipe(changed(path.build.img, { extension: '.webp' })) 
        .pipe(webp({ quality: 70 }))
        .pipe(dest(path.build.img));

    return src(path.src.img, { encoding: false })
        .pipe(changed(path.build.img)) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

gulp.task('svgSprite', function() {
    return gulp.src([source_folder + '/iconssprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../icons/icons.svg", 
                    example: true
                }
            },
        }))
        .pipe(dest(path.build.img))
})

function fonts(done) {
    const pass = () => through2.obj(function(chunk, enc, cb) { 
        this.push(chunk);
        cb();
    });

    return gulp.parallel(
        () => src(path.src.fonts, { encoding: false }).pipe(pass()).pipe(ttf2woff()).pipe(dest(path.build.fonts)),
        () => src(path.src.fonts, { encoding: false }).pipe(pass()).pipe(ttf2woff2()).pipe(dest(path.build.fonts))
    )(done); 
}

function otf() {
    return src(source_folder + '/fonts/*.otf', { encoding: false })
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'));
}

function fontsStyle(done) { 
    let fontsFile = source_folder + '/scss/fonts.scss';
    
    if (!fs.existsSync(fontsFile)) {
        fs.writeFileSync(fontsFile, '');
    }

    let file_content = fs.readFileSync(fontsFile, 'utf-8');
    
    if (file_content.trim() === '') {
        fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFileSync(fontsFile, '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n');
                    }
                    c_fontname = fontname;
                }
            }
            done(); 
        });
    } else {
        done(); 
    }
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    
    gulp.watch([source_folder + '/iconssprite/*.svg'], gulp.series('svgSprite', function (done) {
        browsersync.reload();
        done();
    }));

    const imageWatcher = gulp.watch([path.watch.img], images);
    
    imageWatcher.on('unlink', function (filePath) {
        let distPath = filePath.replace(source_folder, project_folder);
        
        del.sync(distPath); 
        
        let webpDistPath = distPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
        del.sync(webpDistPath);
    });
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);
let fontsBuild = gulp.series(fonts, fontsStyle);

exports.fontsStyle = fontsStyle;
exports.otf = otf;
exports.fonts = fontsBuild;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;