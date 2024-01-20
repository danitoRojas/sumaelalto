import psycopg2

def obtener_conexion():
    # Conexión a la base de datos
    return psycopg2.connect(
        host="localhost",
        database="SALUD",
        user="postgres",
        password="root",
        port= 5432
    )
