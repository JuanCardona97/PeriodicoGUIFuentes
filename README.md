# PeriodicoGUI MiniZinc
UI of the modeling project of the Complexity and Optimization course

### Execution by virtualenv

1. Install Python 3.9.0 or >

2.  Install virtualenv (Windows)

  ```
  $ pip install virtualenv
  ```

or (Ubuntu)

  ```
  $ sudo pip install virtualenv
  ```
  
3. Create virtual environment

  ```
  $ virtualenv env --python=python3
  ```
  
4. Activate virtual environment

  ```
  $ source env/scripts/activate
  ```
  
5. Enter the app folder and execute 
  ```
  $ cd app
  $ pip install -r requirements.txt
  $ python app.py
  ```
 
6. and go to 

  http://localhost:5000/