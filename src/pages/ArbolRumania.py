# ==========================================
# 1. Representación del Mapa de Rumania
# ==========================================
# Utilizamos un diccionario donde la clave es la ciudad 
# y el valor es una lista de las ciudades con las que se conecta.
mapa_rumania = {
    'Oradea': ['Zerind', 'Sibiu'],
    'Zerind': ['Oradea', 'Arad'],
    'Arad': ['Zerind', 'Sibiu', 'Timisoara'],
    'Timisoara': ['Arad', 'Lugoj'],
    'Lugoj': ['Timisoara', 'Mehadia'],
    'Mehadia': ['Lugoj', 'Drobeta'],
    'Drobeta': ['Mehadia', 'Craiova'],
    'Craiova': ['Drobeta', 'Rimnicu Vilcea', 'Pitesti'],
    'Sibiu': ['Oradea', 'Arad', 'Fagaras', 'Rimnicu Vilcea'],
    'Rimnicu Vilcea': ['Sibiu', 'Craiova', 'Pitesti'],
    'Fagaras': ['Sibiu', 'Bucharest'],
    'Pitesti': ['Rimnicu Vilcea', 'Craiova', 'Bucharest'],
    'Bucharest': ['Fagaras', 'Pitesti', 'Giurgiu', 'Urziceni'],
    'Giurgiu': ['Bucharest'],
    'Urziceni': ['Bucharest', 'Hirsova', 'Vaslui'],
    'Hirsova': ['Urziceni', 'Eforie'],
    'Eforie': ['Hirsova'],
    'Vaslui': ['Urziceni', 'Iasi'],
    'Iasi': ['Vaslui', 'Neamt'],
    'Neamt': ['Iasi']
}

# ==========================================
# 2 y 3. Función para recorrer el árbol (Búsqueda simple)
# ==========================================
def buscar_ruta(mapa, inicio, final, ruta=None, visitados=None):
    """
    Recorre el diccionario buscando un camino de 'inicio' a 'final'.
    Usa un conjunto 'visitados' para no quedarse en un bucle infinito.
    """
    if ruta is None:
        ruta = []
    if visitados is None:
        visitados = set()

    # Agregamos la ciudad actual a nuestra ruta y a las visitadas
    ruta.append(inicio)
    visitados.add(inicio)

    # Condición de éxito: ¡Llegamos al destino!
    if inicio == final:
        return ruta

    # Recorremos los "hijos" (ciudades conectadas) en nuestro árbol
    for ciudad_vecina in mapa.get(inicio, []):
        if ciudad_vecina not in visitados:
            # Llamada recursiva pasando una copia de la ruta actual
            resultado = buscar_ruta(mapa, ciudad_vecina, final, list(ruta), visitados)
            if resultado is not None:
                return resultado # Si encontró una ruta, la retorna

    # Si exploró todas las ramas y no encontró el destino
    return None

# ==========================================
# 4. Interacción con el usuario
# ==========================================
def main():
    print("--- Buscador de Rutas: Mapa de Rumania ---")
    
    # Solicitar datos al usuario
    ciudad_inicio = input("Ingresa la ciudad inicial: ").strip().capitalize()
    ciudad_final = input("Ingresa la ciudad final: ").strip().capitalize()

    # Validar que las ciudades existan en el mapa
    if ciudad_inicio not in mapa_rumania or ciudad_final not in mapa_rumania:
        print("\nError: Una o ambas ciudades no existen en el mapa.")
        print("Por favor, revisa la ortografía (ej. 'Arad', 'Bucharest').")
        return

    # Ejecutar la búsqueda
    print(f"\nBuscando ruta desde {ciudad_inicio} hasta {ciudad_final}...")
    ruta_encontrada = buscar_ruta(mapa_rumania, ciudad_inicio, ciudad_final)

    # Mostrar resultados
    if ruta_encontrada:
        print("\n¡Ruta encontrada!")
        print(" -> ".join(ruta_encontrada))
        print(f"Total de ciudades visitadas en esta ruta: {len(ruta_encontrada)}")
    else:
        print("\nNo se encontró una ruta entre esas ciudades.")

# Ejecutar el programa
if __name__ == "__main__":
    main()