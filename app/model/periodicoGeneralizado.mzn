%Lectura de datos:
int: n;
array[1..n] of int: minPag;
array[1..n] of int: maxPag;
array[1..n] of int: pr;
int: P;

%Variables:
array[1..n] of var bool: y; %  array[1..n] of var 0..1: x; 
array[1..n] of var int: pagTema;

%Restricciones
constraint forall(i in 1..n) (pagTema[i] >= minPag[i] /\ pagTema[i] <= maxPag[i]);
constraint sum(j in 1..n)( pagTema[j]* y[j] ) = P;

%Función objetivo
var int: lectores;
constraint lectores = sum(j in 1..n)( y[j]* pagTema[j]* pr[j]);
solve maximize lectores;

