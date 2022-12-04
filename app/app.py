from flask import Flask, render_template, request, json
from minizinc import Instance, Model, Solver, Driver

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

        print(instance)
        result = solver(instance)
        # Crear archivo
        #write_file_dzn(instance)


        if result:  
            return json.dumps({"data":result['lectores'] })
        else:
            return json.dumps({'message': 'Insatisfactible'})


    

def format_data(data):
    """
    Parametros de entrada del modelo
    """
    params = dict()

    """ params['n'] = int(data.get('n'))
    params['P'] = int(data.get('P'))
    params['minPag'] = data.get('minPag')
    params['maxPag'] = data.get('maxPag')
    params['pr'] = data.get('pr') """

    params['n'] = 5
    params['P'] = 10
    params['minPag'] = [5,4,2,2,1]
    params['maxPag'] = [9,7,5,4,3]
    params['pr'] = [1500,2000,1000,1500,750]

    return params

def solver(params):

    """
    Se ejecuta el modelo Minizinc
    """
    # Se configura el modelo y el solver
    periodico = Model()

    periodico.add_file("/periodicoGeneralizado.mzn")
    


    gecode = Solver.lookup("gecode")
    instance = Instance(gecode, periodico)
    # Se configura los parametros

    # El resultado del modelo


    # Create an Instance of the n-Queens model for Gecode
    # Assign 4 to n
    instance["n"] = 5
    instance["minPag"]=[5,4,2,2,1];
    instance["maxPag"]=[9,7,5,4,3];
    instance["pr"]=[1500,2000,1000,1500,750];
    instance["P"]=10;

    result = instance.solve()

    print("Resultado MiniZinc:", result)
    return result 
    


if __name__=='__main__':
    app.run(debug=True, port=5000)