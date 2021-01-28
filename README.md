# QStarter
Lighweight gulp-task runner  for small and medium project

# Get Starterd
Main folder 
>App

For start project 

	gulp 
For build project

	gulp build
# Style
Nothing unusal
- Scss
- Autoprefixer
- Compressed
- Stylint

# Scripts
Also Nothing unusual
- Babel
- Terser(for compressed)
 
# Image
**Img**: All image to minify
**Webp**:   All image convertet to webp format

As result, we have 2 folder white minify and to webp

If you need convert use command

	gulp webp

## One block for everything
**Gulp-include** for include file
>@@include('your.html')

You have one block, but content in them diffrent?
No problem

*What we write*
```
 <html>
    <body>
		@@include('your.html', {
			"app": "Hello world"
		})
	</body>
```

*What we have*
```
  <html>
    <body>
       <p>@@app</p>
     </body>
```
What we get
```
<html>
    <body>
       <p>"Hello World"</p>
   </body>
```

More option [here](https://github.com/wiledal/gulp-include)