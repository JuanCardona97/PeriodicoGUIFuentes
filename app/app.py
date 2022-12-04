from flask import Flask, render_template, request, json, send_from_directory
from minizinc import Instance, Model, Solver, Driver
from pathlib import Path

import pathlib

pathLocal = Path().absolute()


app=Flask(__name__)

@app.route('/')
def index():
    #return "!Hola mndo"
    return render_template('index.html')

@app.route('/solve', methods=['POST', 'GET'])
def solve():
    if request.method == 'POST':

        data = request.get_json()
        instance = format_data(data)
        result = solver(instance)
        # Crear archivo
        write_file_dzn(instance)


        if result:  
            return json.dumps({
                "lectores":result['lectores'],
                "paginas": result['pagTema'],
                "temas":result['y']
                })
        else:
            return json.dumps({'message': 'Insatisfactible'})

    if request.method == 'GET':
        return send_from_directory('./static/files', 'datos.dzn', as_attachment=True)


    

def format_data(data):
    """
    Parametros de entrada para el modelo
    """
    params = dict()
    params['n'] = int(data.get('n'))
    params['P'] = int(data.get('P'))
    params['minPag'] = list(map(int,data.get('minPag')))
    params['maxPag'] = list(map(int,data.get('maxPag')))
    params['pr'] = list(map(int,data.get('pr')))

    return params

def solver(params):
    """
    Se ejecuta el modelo Minizinc
    """
    # Se configura el modelo y el solver
    periodico = Model(str(pathLocal)+"/app/model/periodico.mzn")
    gecode = Solver.lookup("gecode")
    instance = Instance(gecode, periodico)

    # Se configura los parametros
    instance["n"] = params['n']
    instance["minPag"]=params['minPag']
    instance["maxPag"]=params['maxPag']
    instance["pr"]=params['pr']
    instance["P"]=params['P']

    # Datos quemados para los parametros del modelo
    """  
    instance["n"] = 5
    instance["minPag"]=[5,4,2,2,1];
    instance["maxPag"]=[9,7,5,4,3];
    instance["pr"]=[1500,2000,1000,1500,750];
    instance["P"]=10; """

    # El resultado del modelo 
    result = instance.solve()
    print("Resultado MiniZinc:", result)
    return result 


def write_file_dzn(data):
    
    with open(str(pathLocal)+'/app/static/files/datos.dzn', 'w',) as file:
        file.write("%  Formato de entrada de datos para el problema del Periodico \n")
        file.write("%  Numero de temas \n")
        file.write("n={}; \n".format(data['n']))
        file.write("%  Numero de paginas \n")
        file.write("P={}; \n".format(data['P']))
        file.write("%  Numero Min. de paginas \n")
        file.write("minPag={}; \n".format(data['minPag']))
        file.write("%  Numero Max. de paginas \n")
        file.write("maxpag={}; \n".format(data['maxPag']))
        file.write("%  Numero de lectores \n")
        file.write("pr={}; \n".format((data['pr'])))
    

if __name__=='__main__':
    app.run(debug=True, port=5000)