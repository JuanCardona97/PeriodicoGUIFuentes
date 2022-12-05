% LECTURA DE DATOS:
int: n; % Cantidad de temas
array[1..n] of int: minPag; % Número mínimo de páginas de cada tema
array[1..n] of int: maxPag; % Número máximo de páginas de cada tema
array[1..n] of int: pr; % Número de lectores potenciales por página de cada tema
int: P; % Número de páginas que tendrá el periodico

% VARIABLES:
array[1..n] of var bool: y; %  array[1..n] of var 0..1: y; 
array[1..n] of var int: pagTema;

% RESTRICCIONES
% Restricción de número de páginas que tendrá cada tema, teniendo en cuenta el mínimo y máximo de páginas de cada tema
constraint forall(j in 1..n) (pagTema[j] >= minPag[j] /\ pagTema[j] <= maxPag[j]);
% Restricción de número de páginas que tendrá el periodico
constraint sum(j in 1..n)( pagTema[j]* y[j] ) = P;

% FUNCIÓN OBJETIVO
% Maximizar el número de lectores del periodico 
var int: lectores;
constraint lectores = sum(j in 1..n)( y[j]* pagTema[j]* pr[j]);
solve maximize lectores;