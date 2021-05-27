# Virtual Optical Spectrum Analyzer

## Live demo

https://virtual-osa.vercel.app/
  
    
      
## To run this project locally 

1> Fork/Clone this repo  
  
2> Run the server-side FastAPI app in one terminal window  
  
In the root project directory, run:
```bash
$ cd backend                            # navigate to subfolder containing backend code 
$ python3 -m venv env                   # create new virtual environment
$ source env/bin/activate               # activate created environment
(env)$ pip install -r requirements.txt  # install required packages 
(env)$ uvicorn main:app --reload        # start an ASGI server
```

3> For Frontend  
```bash
$ cd frontend               # navigate to subfolder containing front end code
$ npm install               # install required dependencies 
$ npm start or yarn start   # runs the app in the development mode
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


