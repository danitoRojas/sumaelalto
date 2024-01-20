from bd import obtener_conexion

############################################### Tabla de pacientes ################################################
def ver():
    conexion = obtener_conexion()
    resultadosp = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM public.paciente")
        resultadosp = cursor.fetchall()
    conexion.close()
    return resultadosp
  
def eliminar(id):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM public.paciente WHERE id_paciente = %s", (id,))
    conexion.commit()
    conexion.close()
    
def insertar(nombre, apellidos, ci, fecha_nacimiento, genero, celular, direccion, correo, id_rol, img_paciente, password):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO public.paciente (nombre, apellidos, ci, fecha_nacimiento, genero, celular, direccion, correo, id_rol, img_paciente, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, (pgp_sym_encrypt(%s, 'longsecretencryptionkey')))",(nombre, apellidos, ci, fecha_nacimiento, genero, celular, direccion, correo, id_rol, img_paciente, password))
    conexion.commit()
    conexion.close()
    
def obtener_paciente_por_id(id):
    conexion = obtener_conexion()
    datap = None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM public.paciente WHERE id_paciente = %s", (id,))
        datap = cursor.fetchone()
    conexion.close()
    return datap  
  
def actualizar(id, nombre, apellidos, ci, fecha_nacimiento, genero, celular, direccion, correo, id_rol, img_paciente, password):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE public.paciente SET nombre = %s, apellidos = %s, ci = %s, fecha_nacimiento = %s, genero = %s, celular = %s, direccion = %s, correo = %s, id_rol = %s , img_paciente = %s, password = %s WHERE id_paciente = %s",
                (nombre, apellidos, ci, fecha_nacimiento, genero, celular, direccion, correo, id_rol, img_paciente, password,id))
    conexion.commit()
    conexion.close()

############################################# Tabla de especialidades #############################################
def ver_especialidad():
    conexion = obtener_conexion()
    resultadosp = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM public.especialidad")
        resultadosp = cursor.fetchall()
    conexion.close()
    return resultadosp

    
############################################### Tabla de hospital  ################################################
def ver_hospitales():
    conexion = obtener_conexion()
    resultados_hospitales = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM hospital")
        resultados_hospitales = cursor.fetchall()
    conexion.close()
    return resultados_hospitales

def eliminar_hospital(id):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM hospital WHERE gid = %s", (id,))
    conexion.commit()
    conexion.close()

def insertar_hospital(nombre, direccion, celular, nivel, atencion, nombre_director, geom):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO hospital (nombre, direccion, celular, nivel, atencion, nombre_director, geom) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                      (nombre, direccion, celular, nivel, atencion, nombre_director, geom))
    conexion.commit()
    conexion.close()

def obtener_hospital_por_id(id):
    conexion = obtener_conexion()
    data_hospital = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM hospital WHERE gid = %s", (id,))
        data_hospital = cursor.fetchone()
    conexion.close()
    return data_hospital

def actualizar_hospital(id, nombre, direccion, celular, nivel, atencion, nombre_director, geom):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE hospital SET nombre = %s, direccion = %s, celular = %s, nivel = %s, atencion = %s, nombre_director = %s, geom =%s WHERE id_hospital = %s",
                      (nombre, direccion, celular, nivel, atencion, nombre_director, geom, id))
    conexion.commit()
    conexion.close()
    
 
def obtener_especialidades_por_id(id):
    conexion = obtener_conexion()
    especialidades = None
    with conexion.cursor() as cursor:
        cursor.execute("""
            SELECT h.gid, h.nombre AS nombre_hospital, e.nombre AS especialidad, e.descripcion AS descripcion_especialidad,h.ubicacion
            FROM public.hospital_especialidad he
            INNER JOIN public.hospital h ON he.id_hospital = h.gid
            INNER JOIN public.especialidad e ON he.id_especialidad = e.id_especialidad
            WHERE he.id_hospital = %s
        """, (id,))
        especialidades = cursor.fetchall()  # Usar fetchall() en lugar de fetchone()
    conexion.close()
    return especialidades
  
  
  
############################################### Medicos  ################################################
def ver_medico1():
    conexion = obtener_conexion()
    resultados_medicos1 = []
    with conexion.cursor() as cursor:
        cursor.execute(""" SELECT m.nombre,m.apellidos,m.fecha_nacimiento,m.celular,m.correo,m.genero,m.img_medico, h.nombre
        FROM public.medico m
        INNER JOIN public.hospital h ON m.id_hospital = h.gid""")
        resultados_medicos1 = cursor.fetchall()
    conexion.close()
    return resultados_medicos1
  
def ver_medico():
    conexion = obtener_conexion()
    resultados_medicos = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM medico")
        resultados_medicos = cursor.fetchall()
    conexion.close()
    return resultados_medicos

def eliminar_medico(id):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM medico WHERE id_medico = %s", (id,))
    conexion.commit()
    conexion.close()

def insertar_medico(nombre, apellidos, ci, fecha_nacimiento, celular, direccion, correo, num_colegiatura, id_usuario, genero, img_medico, id_hospital):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO medico (nombre, apellidos, ci, fecha_nacimiento, celular, direccion, correo, num_colegiatura, id_usuario, genero, img_medico, id_hospital) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (nombre, apellidos, ci, fecha_nacimiento, celular, direccion, correo, num_colegiatura, id_usuario, genero, img_medico, id_hospital))
    conexion.commit()
    conexion.close()

def obtener_medico_por_id(id):
    conexion = obtener_conexion()
    data_medico = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM medico WHERE id_medico = %s", (id,))
        data_medico = cursor.fetchone()
    conexion.close()
    return data_medico

def actualizar_medico(id, nombre, apellidos, ci, fecha_nacimiento, celular, direccion, correo, num_colegiatura, id_usuario, genero, img_medico, id_hospital):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE medico SET nombre = %s, apellidos = %s, ci = %s, fecha_nacimiento = %s, celular = %s, direccion = %s, correo = %s, num_colegiatura = %s, id_usuario = %s, genero = %s, img_medico = %s, id_hospital = %s WHERE id_medico = %s",
              (nombre, apellidos, ci, fecha_nacimiento, celular, direccion, correo, num_colegiatura, id_usuario, genero, img_medico, id_hospital, id))
    conexion.commit()
    conexion.close()



############################################### Fichas  ################################################
def ver_fichas():  
    conexion = obtener_conexion()
    resultados_ficha = []
    with conexion.cursor() as cursor:
        cursor.execute("""SELECT f.fecha_atencion, f.fecha_registro, h.nombre AS nombre_hospital, 
      e.nombre AS especialidad, p.nombre AS nombre_paciente, ho.inicio_atencion, ho.activo
FROM public.ficha f
INNER JOIN public.hospital_especialidad he ON f.id_hos_esp = he.id_hos_esp
INNER JOIN public.hospital h ON he.id_hospital = h.gid
INNER JOIN public.especialidad e ON he.id_especialidad = e.id_especialidad
INNER JOIN public.paciente p ON f.id_paciente = p.id_paciente
INNER JOIN public.horario ho ON f.id_horario = ho.id_horario;""")
        resultados_ficha = cursor.fetchall()
    conexion.close()
    return resultados_ficha

def ver_h():
    conexion = obtener_conexion()
    resultados_fichah = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT nombre FROM hospital")
        resultados_fichah = cursor.fetchall()
    conexion.close()
    return resultados_fichah
###################################################33
def ver_hos_esp():
    conexion = obtener_conexion()
    resultados_ficha_esp = []
    with conexion.cursor() as cursor:
        cursor.execute("""SELECT he.id_hos_esp, h.nombre AS nombre_hospital, e.nombre AS especialidad
            FROM public.hospital_especialidad he
            INNER JOIN public.hospital h ON he.id_hospital = h.gid
            INNER JOIN public.especialidad e ON he.id_especialidad = e.id_especialidad
            WHERE he.id_hospital=3""")
        resultados_ficha_esp = cursor.fetchall()
    conexion.close()
    return resultados_ficha_esp

def ver_horario():
    conexion = obtener_conexion()
    resultados_horario = []
    with conexion.cursor() as cursor:
        cursor.execute("select* from horario where activo = 'T';")
        resultados_horario = cursor.fetchall()
    conexion.close()
    return resultados_horario


############################################################3
def eliminar_ficha(id):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM public.ficha WHERE id_ficha = %s", (id,))
    conexion.commit()
    conexion.close()
    
def insertar_ficha(fecha_atencion, fecha_registro, id_hos_esp, id_paciente, id_horario):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO public.ficha (fecha_atencion, fecha_registro, id_hos_esp, id_paciente, id_horario) VALUES (%s, %s, %s, %s, %s)", (fecha_atencion, fecha_registro, id_hos_esp, id_paciente, id_horario))
        
        
        
        cursor.execute("UPDATE public.horario SET activo = 'F' WHERE id_horario=%s" %id_horario)
    conexion.commit()
    conexion.close()
    
def obtener_ficha_por_id(id):
    conexion = obtener_conexion()
    data_ficha = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM public.ficha WHERE id_ficha = %s", (id,))
        data_ficha = cursor.fetchone()
    conexion.close()
    return data_ficha
  
def actualizar_ficha(id, fecha_atencion, fecha_registro, id_hos_esp, id_paciente, id_horario):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE public.ficha SET fecha_atencion = %s, fecha_registro = %s, id_hos_esp = %s, id_paciente = %s, id_horario = %s WHERE id_ficha = %s", (fecha_atencion, fecha_registro, id_hos_esp, id_paciente, id_horario, id))
    conexion.commit()
    conexion.close()

######################### Usuario ###################3
def ver_usuario():
    conexion = obtener_conexion()
    resultados_usuarios = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM usuario")
        resultados_usuarios = cursor.fetchall()
    conexion.close()
    return resultados_usuarios

def eliminar_usuario(id):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM usuario WHERE id_usuario = %s", (id,))
    conexion.commit()
    conexion.close()

def insertar_usuario(password, id_rol, correo):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO usuario (password, id_rol, correo) VALUES (%s, %s, %s)",
        (password, id_rol, correo))
    conexion.commit()
    conexion.close()

def obtener_usuario_por_id(id):
    conexion = obtener_conexion()
    data_usuario = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM usuario WHERE id_usuario = %s", (id,))
        data_usuario = cursor.fetchone()
    conexion.close()
    return data_usuario

def actualizar_usuario(id, password, id_rol, correo):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE usuario SET password = %s, id_rol = %s, correo = %s WHERE id_usuario = %s",
              (password, id_rol, correo, id))
    conexion.commit()
    conexion.close()
############################ Fichas 